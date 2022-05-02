import {Request, Response} from 'express';
import { User } from '../types/User';
import {UserDatabase} from '../data/UserDatabase';
import { IdGenerator } from '../services/generateId';
import { HashManager } from '../services/HashManager';
import { Authenticator } from '../services/Authenticator';

export async function signUp(req: Request, res: Response) {
    try {
        const {name, email, password, role} = req.body;

        if (!name || !email || !password || !role) {
            throw new Error("Missing input, name, email, password or role");
        }

        if (role !== "normal" && role !== "admin") {
            throw new Error("Invalid role, must be 'normal' or 'admin'");
        }

        if (password.length < 6) {
            throw new Error("Password must have at least 6 characters");
        }

        const idGenerator = new IdGenerator();
        const id = idGenerator.generate();


        const userDatabase = new UserDatabase();
        const user = await userDatabase.findUserByEmail(email);

        const hashPassword = await new HashManager().hash(password);

        if (user) {
            throw new Error("User email is already registered");
        }
        
        const createdUser = new User (id, name, email, hashPassword, role);
        await userDatabase.createUser(createdUser);

        const authenticator = new Authenticator();
        const token = authenticator.generate({id, role});

        res.status(200).send({token});
    } catch (err) {
        if (err instanceof Error) {
          res.status(400).send({
              message: err.message,
            });
        } else {
            res.status(500).send("Internal server error");
        }
    }
  }