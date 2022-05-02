import {Request, Response} from 'express';
import {UserDatabase} from '../data/UserDatabase';
import { HashManager } from '../services/HashManager';
import { Authenticator } from '../services/Authenticator';

export async function login(req: Request, res: Response) {
    try {
        const {email, password} = req.body;

        if (!email || !password) {
            throw new Error("Missing input email or password");
        }

        if (password.length < 6) {
            throw new Error("Password must have at least 6 characters");
        }

        const userDatabase = new UserDatabase();
        const user = await userDatabase.findUserByEmail(email);

        const hashManager = new HashManager();
        const isPasswordCorrect = await hashManager.compare(password, user.getPassword());

        if (!user) {
            throw new Error("User email is not registered");
        }

        if (!isPasswordCorrect) {
            throw new Error("Invalid password or email");
        }

        const authenticator = new Authenticator();
        const token = authenticator.generate({id: user.getId(), role: user.getRole()});

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