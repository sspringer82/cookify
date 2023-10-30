import express from 'express';
import controller from './controller';

const app = express.Router();

app.get('', controller.getAll);

app.get('/:id', controller.getOne);

app.post('', controller.create);

app.put('/:id', controller.update);

app.delete('/:id', controller.remove);

export default app;
