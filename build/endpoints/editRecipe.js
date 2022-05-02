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
exports.editRecipe = void 0;
const Authenticator_1 = require("../services/Authenticator");
const UserDatabase_1 = require("../data/UserDatabase");
const RecipeDatabase_1 = require("../data/RecipeDatabase");
const Recipe_1 = require("../types/Recipe");
function editRecipe(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = req.headers.authorization;
            const { title, ingredients, description, image_url } = req.body;
            const authenticator = new Authenticator_1.Authenticator();
            const authenticationData = authenticator.getData(token);
            const userDatabase = new UserDatabase_1.UserDatabase();
            const user = yield userDatabase.getUserById(authenticationData.id);
            const recipeDatabase = new RecipeDatabase_1.RecipeDatabase();
            const newRecipe = new Recipe_1.Recipe(req.params.id, title, ingredients, description, image_url, user.getId());
            const uneditedRecipe = yield recipeDatabase.getRecipeById(req.params.id);
            const uneditedRecipeUserId = uneditedRecipe.getUser_id();
            if (uneditedRecipeUserId !== user.getId()) {
                throw new Error("You can't edit a recipe that is not yours");
            }
            yield recipeDatabase.editRecipe(newRecipe);
            res.status(200).send({
                message: "Recipe edited successfully",
            });
        }
        catch (err) {
            if (err instanceof Error) {
                res.status(400).send({
                    message: err.message,
                });
            }
            else {
                res.status(500).send("Internal server error");
            }
        }
    });
}
exports.editRecipe = editRecipe;
//# sourceMappingURL=editRecipe.js.map