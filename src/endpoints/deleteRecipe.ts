import {Request, Response} from 'express';
import { Authenticator } from '../services/Authenticator';
import { UserDatabase } from '../data/UserDatabase';
import { RecipeDatabase } from '../data/RecipeDatabase';


export async function deleteRecipe (req: Request, res: Response) {
    try {
        const token = req.headers.authorization as string;
        const authenticator = new Authenticator();
        const authenticationData = authenticator.getData(token);

        const userDatabase = new UserDatabase();
        const user = await userDatabase.getUserById(authenticationData.id);

        const recipeDatabase = new RecipeDatabase();
        const recipe = await recipeDatabase.getRecipeById(req.params.id);
        const recipeUserId = recipe.getUser_id();


        if(user.getRole() !== "admin" && recipeUserId !== user.getId()) {
            throw new Error("You can't delete a recipe that is not yours");
        }

        await recipeDatabase.deleteRecipe(req.params.id);

        res.status(200).send({
            message: "Recipe deleted successfully",
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