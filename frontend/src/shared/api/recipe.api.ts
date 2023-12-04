import { CreateRecipe, Recipe } from '../types/Recipe';

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

export async function fetchRecipeById(
  id: string,
  token: string
): Promise<Recipe> {
  const response = await fetch(`/api/recipes/${id}`, {
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

export async function save(
  newRecipe: CreateRecipe,
  token: string
): Promise<Recipe> {
  let url = '/api/recipes';
  let method = 'POST';

  if (newRecipe.id !== undefined) {
    url += `/${newRecipe.id}`;
    method = 'PUT';
  }

  const response = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newRecipe),
  });
  if (!response.ok) {
    if (response.status === 409) {
      throw new Error('Recipe already exists');
    }
    throw new Error('Could not create the new recipe');
  }

  const data = await response.json();

  return data;
}
