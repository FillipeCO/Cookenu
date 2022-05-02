"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeDatabase = void 0;
const BaseDatabase_1 = require("./BaseDatabase");
const Recipe_1 = require("../types/Recipe");
class RecipeDatabase extends BaseDatabase_1.BaseDatabase {
    getRecipeById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const recipe = yield BaseDatabase_1.BaseDatabase.connection("receitas_cookenu")
                    .select("*")
                    .where({ id: id });
                return recipe[0] && Recipe_1.Recipe.toRecipeModel(recipe[0]);
            }
            catch (error) {
                throw new Error(error.sqlMessage || error.message);
            }
        });
    }
    createRecipe(recipe) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield BaseDatabase_1.BaseDatabase.connection("receitas_cookenu")
                    .insert({
                    id: recipe.getId(),
                    title: recipe.getTitle(),
                    ingredients: recipe.getIngredients(),
                    description: recipe.getDescription(),
                    image_url: recipe.getImage_url(),
                    user_id: recipe.getUser_id(),
                });
            }
            catch (error) {
                throw new Error(error.sqlMessage || error.message);
            }
        });
    }
    editRecipe(recipe) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield BaseDatabase_1.BaseDatabase.connection("receitas_cookenu")
                    .update({
                    title: recipe.getTitle(),
                    ingredients: recipe.getIngredients(),
                    description: recipe.getDescription(),
                    image_url: recipe.getImage_url(),
                })
                    .where({ id: recipe.getId() });
            }
            catch (error) {
                throw new Error(error.sqlMessage || error.message);
            }
        });
    }
    deleteRecipe(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield BaseDatabase_1.BaseDatabase.connection("receitas_cookenu")
                    .delete()
                    .where({ id: id });
            }
            catch (error) {
                throw new Error(error.sqlMessage || error.message);
            }
        });
    }
}
exports.RecipeDatabase = RecipeDatabase;
//# sourceMappingURL=RecipeDatabase.js.map