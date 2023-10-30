import request from 'supertest';
import express, { Express } from 'express';
import { data } from './data'; // import your data file

const app: Express = express();
app.use(express.json());

// Your endpoints (the code you've provided) would go here

describe('Recipe API', () => {
  it('GET /recipes should return all recipes', async () => {
    const res = await request(app).get('/recipes');
    expect(res.status).toBe(200);
    expect(res.body).toEqual(data);
  });

  it('GET /recipes/:id should return a specific recipe', async () => {
    const res = await request(app).get('/recipes/1');
    expect(res.status).toBe(200);
    expect(res.body).toEqual(data[0]);
  });

  it('POST /recipes should create a new recipe', async () => {
    const newRecipe = {
      title: 'New Recipe',
      // other fields
    };
    const res = await request(app).post('/recipes').send(newRecipe);
    expect(res.status).toBe(200);
    expect(res.body.title).toEqual('New Recipe');
  });

  it('PUT /recipes/:id should update a recipe', async () => {
    const updatedRecipe = {
      id: 1,
      title: 'Updated Recipe',
      // other fields
    };
    const res = await request(app).put('/recipes/1').send(updatedRecipe);
    expect(res.status).toBe(200);
    expect(res.body.title).toEqual('Updated Recipe');
  });

  it('DELETE /recipes/:id should delete a recipe', async () => {
    const res = await request(app).delete('/recipes/1');
    expect(res.status).toBe(200);
  });
});
