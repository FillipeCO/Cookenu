import {Request, Response} from 'express';
import { Authenticator } from '../services/Authenticator';
import { UserDatabase } from '../data/UserDatabase';
import { RecipeDatabase } from '../data/RecipeDatabase';
import { Recipe } from '../types/Recipe';
import { IdGenerator } from '../services/generateId';

export async function createRecipe(req: Request, res: Response) {
    try {
        const token = req.headers.authorization as string;
        const {title, ingredients, description, image_url} = req.body;

        if (!title || !ingredients || !description || !image_url) {
            throw new Error("Missing input, title, ingredients, description or image_url");
        }

        const authenticator = new Authenticator();
        const authenticationData = authenticator.getData(token);

        const userDatabase = new UserDatabase();
        const user = await userDatabase.getUserById(authenticationData.id);

        const idGenerator = new IdGenerator();
        const id = idGenerator.generate();

        if (!user) {
            throw new Error("User not found");
        }


        const recipeDatabase = new RecipeDatabase();
        const recipe = new Recipe(id, title, ingredients, description, image_url, user.getId());
        await recipeDatabase.createRecipe(recipe);

        res.status(200).send({
            message: "Recipe created successfully",
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