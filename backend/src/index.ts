import express from 'express';
import { data } from './data';

const app = express();

app.get('/', (request, response) => {
  response.json(data);
});

app.listen(3001, () => console.log('Cookify Backend is ready for operations'));
