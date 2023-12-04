export interface Recipe {
  id: number;
  title: string;
}

export type CreateRecipe = Omit<Recipe, 'id'>;
