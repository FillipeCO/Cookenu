import {Request, Response} from 'express';
import {UserDatabase} from '../data/UserDatabase';
import { Authenticator } from '../services/Authenticator';

export async function deleteUser(req: Request, res: Response) {
    try {
        const id = req.params.id;

        if (!id) {
            throw new Error("Missing id");
        }
        const token = req.headers.authorization as string;
        const authenticator = new Authenticator();
        const authenticationData = authenticator.getData(token);

        const userDatabase = new UserDatabase();
        const user = await userDatabase.getUserById(authenticationData.id);

        if(user.getRole() !== "admin") {
            throw new Error("You can't delete an user if you are not an admin");
        }

        await userDatabase.deleteUserAndRelations(id);

        res.status(200).send({message: "User deleted"});
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