import { BaseDatabase } from "./BaseDatabase";
import { Recipe } from "../types/Recipe";
import { User } from "../types/User";

export class RecipeDatabase extends BaseDatabase {
  public async getRecipeById(id: string): Promise<Recipe> {
    try {
      const recipe = await BaseDatabase.connection("receitas_cookenu")
        .select("*")
        .where({ id: id });

      return recipe[0] && Recipe.toRecipeModel(recipe[0]);
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async createRecipe(recipe: Recipe): Promise<void> {
    try {
      await BaseDatabase.connection("receitas_cookenu")
        .insert({
          id: recipe.getId(),
          title: recipe.getTitle(),
          ingredients: recipe.getIngredients(),
          description: recipe.getDescription(),
          image_url: recipe.getImage_url(),
          user_id: recipe.getUser_id(),
        });
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async editRecipe(recipe: Recipe): Promise<void> {
    try {
      await BaseDatabase.connection("receitas_cookenu")
        .update({
          title: recipe.getTitle(),
          ingredients: recipe.getIngredients(),
          description: recipe.getDescription(),
          image_url: recipe.getImage_url(),
        })
        .where({ id: recipe.getId() });
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async deleteRecipe(id: string): Promise<void> {
    try {
      await BaseDatabase.connection("receitas_cookenu")
        .delete()
        .where({ id: id });
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

}