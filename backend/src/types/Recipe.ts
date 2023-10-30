import { Difficulty } from './Difficulty';
import { Ingredient } from './Ingredient';

export interface Recipe {
  id: number;
  title: string;
  ingredients: Ingredient[];
  preparationSteps: string[];
  caloriesPerPortion: number;
  toolsRequired: string[];
  difficulty: Difficulty;
  preparationDuration: string; // z.B. '20min' oder '1hr'
  rating: number; // 0-5
}

export type CreateRecipe = Omit<Recipe, 'id'>;
