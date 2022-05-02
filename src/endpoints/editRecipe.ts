import {Request, Response} from 'express';
import { Authenticator } from '../services/Authenticator';
import { UserDatabase } from '../data/UserDatabase';
import { RecipeDatabase } from '../data/RecipeDatabase';
import { Recipe } from '../types/Recipe';

export async function editRecipe (req: Request, res: Response) {
    try {
        const token = req.headers.authorization as string;
        const {title, ingredients, description, image_url} = req.body;

        // não há validação dos campos, pois é possível editar só um campo

        const authenticator = new Authenticator();
        const authenticationData = authenticator.getData(token);

        const userDatabase = new UserDatabase();
        const user = await userDatabase.getUserById(authenticationData.id);

        const recipeDatabase = new RecipeDatabase();
        const newRecipe = new Recipe(req.params.id, title, ingredients, description, image_url, user.getId());
        const uneditedRecipe = await recipeDatabase.getRecipeById(req.params.id);
        const uneditedRecipeUserId = uneditedRecipe.getUser_id();
        
        if(uneditedRecipeUserId !== user.getId()) {
            throw new Error("You can't edit a recipe that is not yours");
        }
        
        await recipeDatabase.editRecipe(newRecipe);

        res.status(200).send({
            message: "Recipe edited successfully",
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