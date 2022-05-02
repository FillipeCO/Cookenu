export class Recipe {
    constructor(
        private id: string,
        private title: string,
        private ingredients: string,
        private description: string,
        private image_url: string,
        private user_id: string,
    ) {}

    static toRecipeModel(data: any): Recipe {
        return new Recipe(
            data.id,
            data.title,
            data.ingredients,
            data.description,
            data.image_url,
            data.user_id,
        );
    }

    public getId(): string {
        return this.id;
    }

    public getTitle(): string {
        return this.title;
    }

    public getIngredients(): string {
        return this.ingredients;
    }

    public getDescription(): string {
        return this.description;
    }

    public getImage_url(): string {
        return this.image_url;
    }

    public getUser_id(): string {
        return this.user_id;
    }
}