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
exports.createRecipe = void 0;
const Authenticator_1 = require("../services/Authenticator");
const UserDatabase_1 = require("../data/UserDatabase");
const RecipeDatabase_1 = require("../data/RecipeDatabase");
const Recipe_1 = require("../types/Recipe");
const generateId_1 = require("../services/generateId");
function createRecipe(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = req.headers.authorization;
            const { title, ingredients, description, image_url } = req.body;
            if (!title || !ingredients || !description || !image_url) {
                throw new Error("Missing input, title, ingredients, description or image_url");
            }
            const authenticator = new Authenticator_1.Authenticator();
            const authenticationData = authenticator.getData(token);
            const userDatabase = new UserDatabase_1.UserDatabase();
            const user = yield userDatabase.getUserById(authenticationData.id);
            const idGenerator = new generateId_1.IdGenerator();
            const id = idGenerator.generate();
            if (!user) {
                throw new Error("User not found");
            }
            const recipeDatabase = new RecipeDatabase_1.RecipeDatabase();
            const recipe = new Recipe_1.Recipe(id, title, ingredients, description, image_url, user.getId());
            yield recipeDatabase.createRecipe(recipe);
            res.status(200).send({
                message: "Recipe created successfully",
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
exports.createRecipe = createRecipe;
//# sourceMappingURL=createRecipe.js.map