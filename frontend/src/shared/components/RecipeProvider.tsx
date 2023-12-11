import { createContext, useState } from 'react';
import { Recipe } from '../types/Recipe';

type ReceipeContextType = [
  Recipe[],
  React.Dispatch<React.SetStateAction<Recipe[]>>
];

export const recipeContext = createContext<ReceipeContextType>([[], () => {}]);

type Props = {
  children: React.ReactNode;
};

export const RecipeProvider: React.FC<Props> = ({ children }) => {
  const state = useState<Recipe[]>([]);
  return (
    <recipeContext.Provider value={state}>{children}</recipeContext.Provider>
  );
};
