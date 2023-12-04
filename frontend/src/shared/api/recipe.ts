import { Recipe } from '../types/Recipe';

export async function fetchData(token: string): Promise<Recipe[]> {
  const response = await fetch('/api/recipes', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error('could not load data');
  }

  const data = await response.json();

  return data;
}

export async function removeRecipe(id: number, token: string): Promise<void> {
  const response = await fetch('/api/recipes/' + id, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.ok === false) {
    throw new Error('Could not delete the Recipe');
  }
}
