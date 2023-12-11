import { Difficulty } from './Difficulty';
import { Ingredient } from './Ingredient';

export interface Recipe {
  id: number;
  title: string;
  caloriesPerPortion: number;
  difficulty: Difficulty;
  preparationDuration: string; // z.B. '20min' oder '1hr'
  rating: number; // 0-5
  ingredients: Ingredient[];
  preparationSteps: string[];
  toolsRequired: string[];
}

export type CreateRecipe = Omit<Recipe, 'id'>;
