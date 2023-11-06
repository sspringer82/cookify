import { Recipe, CreateRecipe } from '../types/Recipe';
import { data } from '../data';

const service = {
  async getAll(): Promise<Recipe[]> {
    return Promise.resolve(data);
  },
  async getOne(id: number): Promise<Recipe | undefined> {
    const recipe = data.find((r) => {
      return r.id === id;
    });
    return recipe;
  },

  async create(recipe: CreateRecipe): Promise<Recipe> {
    let nextId = 1;
    const ids = data.map((r) => r.id).sort();
    if (ids.length !== 0) {
      nextId = ids.pop()! + 1;
    }
    const newData = { id: nextId, ...recipe };
    data.push(newData);
    return newData;
  },

  async update(recipe: Recipe): Promise<Recipe> {
    const index = data.findIndex(
      (existingRecipe) => existingRecipe.id === recipe.id
    );
    data[index] = recipe;
    return recipe;
  },

  async remove(id: number): Promise<void> {
    const index = data.findIndex((existingRecipe) => existingRecipe.id === id);
    data.splice(index, 1);
  },
};

export default service;
