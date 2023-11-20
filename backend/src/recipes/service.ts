import { Recipe, CreateRecipe } from '../types/Recipe';
import { data } from '../data';
import { Database } from 'sqlite3';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const service = {
  async getAll(): Promise<Recipe[]> {
    return prisma.recipe.findMany() as any;
  },
  async getOne(id: number): Promise<Recipe | undefined> {
    return prisma.recipe.findUnique({ where: { id } }) as any;
  },

  async create(recipe: CreateRecipe): Promise<Recipe> {
    return prisma.recipe.create(recipe as any) as any;
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
