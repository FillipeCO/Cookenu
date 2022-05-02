import {Request, Response} from 'express';
import {UserDatabase} from '../data/UserDatabase';
import { HashManager } from '../services/HashManager';
import {run as sendMail} from '../services/Mailer';


export async function forgotPassword(req: Request, res: Response) {
    try {
        const {email, password} = req.body;

        if (!email || !password) {
            throw new Error("Missing input, email or password");
        }

        if (password.length < 6) {
            throw new Error("Password must have at least 6 characters");
        }

        const userDatabase = new UserDatabase();
        const user = await userDatabase.findUserByEmail(email);

        if (!user) {
            throw new Error("User not found");
        }

        const hashPassword = await new HashManager().hash(password);

        await userDatabase.changePassword(user.getId(), hashPassword);

        await sendMail(email, password);

        res.status(200).send({message: "Password changed"});
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