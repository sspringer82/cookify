export interface Recipe {
  id: number;
  title: string;
  caloriesPerPortion: number;
  difficulty: string;
  preparationDuration: string;
}

export type CreateRecipe = Omit<Recipe, 'id'> & { id?: number };
