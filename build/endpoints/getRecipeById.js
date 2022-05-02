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
exports.getRecipeById = void 0;
const Authenticator_1 = require("../services/Authenticator");
const RecipeDatabase_1 = require("../data/RecipeDatabase");
function getRecipeById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = req.headers.authorization;
            const authenticator = new Authenticator_1.Authenticator();
            const authenticationData = authenticator.getData(token);
            const recipeId = req.params.id;
            const recipeDatabase = new RecipeDatabase_1.RecipeDatabase();
            const recipe = yield recipeDatabase.getRecipeById(recipeId);
            res.status(200).send({
                id: recipe.getId(),
                title: recipe.getTitle(),
                ingredients: recipe.getIngredients(),
                description: recipe.getDescription(),
                image_url: recipe.getImage_url(),
                user_id: recipe.getUser_id(),
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
exports.getRecipeById = getRecipeById;
//# sourceMappingURL=getRecipeById.js.map