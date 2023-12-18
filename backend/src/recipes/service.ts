import { Recipe, CreateRecipe } from '../types/Recipe';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const service = {
  async getAll(userId: number): Promise<Recipe[]> {
    return prisma.recipe.findMany({
      where: {
        OR: [{ private: 0 }, { private: 1, userId }],
      },
    }) as any;
  },
  async getOne(id: number): Promise<Recipe | undefined> {
    return prisma.recipe.findUnique({ where: { id } }) as any;
  },

  async create(recipe: any): Promise<any> {
    try {
      const createdRecipe = await prisma.recipe.create({ data: recipe });
      return createdRecipe;
    } catch (error) {
      console.error(error);
      throw new Error('Already exists');
    }
  },

  async update(recipe: Recipe): Promise<Recipe> {
    return prisma.recipe.update({
      where: { id: recipe.id },
      data: recipe as any,
    }) as any;
  },

  async remove(id: number): Promise<void> {
    await prisma.recipe.delete({
      where: { id },
    });
  },
};

export default service;
