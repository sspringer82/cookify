import express from 'express';
import recipeRouter from './recipes/index';

const app = express();
app.use(express.json());

app.use('/recipes', recipeRouter);

app.listen(3001, () => console.log('Cookify Backend is ready for operations'));
