import { atom } from 'jotai';
import { Recipe } from '../types/Recipe';

export const recipesAtom = atom<Recipe[]>([]);
