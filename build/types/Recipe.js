"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Recipe = void 0;
class Recipe {
    constructor(id, title, ingredients, description, image_url, user_id) {
        this.id = id;
        this.title = title;
        this.ingredients = ingredients;
        this.description = description;
        this.image_url = image_url;
        this.user_id = user_id;
    }
    static toRecipeModel(data) {
        return new Recipe(data.id, data.title, data.ingredients, data.description, data.image_url, data.user_id);
    }
    getId() {
        return this.id;
    }
    getTitle() {
        return this.title;
    }
    getIngredients() {
        return this.ingredients;
    }
    getDescription() {
        return this.description;
    }
    getImage_url() {
        return this.image_url;
    }
    getUser_id() {
        return this.user_id;
    }
}
exports.Recipe = Recipe;
//# sourceMappingURL=Recipe.js.map