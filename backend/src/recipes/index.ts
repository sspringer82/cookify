import express from 'express';
import controller from './controller';
import { body, checkSchema } from 'express-validator';

const app = express.Router();

app.get('', controller.getAll);

app.get('/:id', controller.getOne);

const schema = {
  title: { notEmpty: true, isLength: { options: { min: 4, max: 50 } } },
};

app.post('', checkSchema(schema), controller.create);

app.put('/:id', controller.update);

app.delete('/:id', controller.remove);

export default app;
