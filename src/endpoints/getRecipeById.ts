import {Request, Response} from 'express';
import { Authenticator } from '../services/Authenticator';
import { RecipeDatabase } from '../data/RecipeDatabase';

export async function getRecipeById (req: Request, res: Response) {
    try {

        const token = req.headers.authorization as string;
        const authenticator = new Authenticator();
        const authenticationData = authenticator.getData(token);

        const recipeId = req.params.id;

        const recipeDatabase = new RecipeDatabase();
        const recipe = await recipeDatabase.getRecipeById(recipeId);

        res.status(200).send({
            id: recipe.getId(),
            title: recipe.getTitle(),
            ingredients: recipe.getIngredients(),
            description: recipe.getDescription(),
            image_url: recipe.getImage_url(),
            user_id: recipe.getUser_id(),
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