import { Request, Response } from "express";
import { Authenticator } from "../services/Authenticator";
import { UserDatabase } from "../data/UserDatabase";

export async function followUser(req: Request, res: Response) {
  try {
    const token = req.headers.authorization as string;
    const authenticator = new Authenticator();
    const authenticationData = authenticator.getData(token);

    const userId = req.body.userId;

    const userDatabase = new UserDatabase();
    const user = await userDatabase.getUserById(authenticationData.id);

    await userDatabase.followUser(userId, user.getId());

    const isAlreadyFollowed = await userDatabase.checkIfAlredyFollowing(userId, user.getId());
    if (isAlreadyFollowed) {
      throw new Error("You are already following this user");
    }

    res.status(200).send({
      message: "User followed successfully",
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
