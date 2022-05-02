import {Request, Response} from 'express';
import { Authenticator } from '../services/Authenticator';
import { UserDatabase } from '../data/UserDatabase';

export async function getProfileInfo(req: Request, res: Response) {
    try {
        const token = req.headers.authorization as string;
        const authenticator = new Authenticator();
        const authenticationData = authenticator.getData(token);
        
        const userDatabase = new UserDatabase();
        const user = await userDatabase.getUserById(authenticationData.id);

        res.status(200).send({
            name: user.getName(),
            email: user.getEmail(),
        });

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