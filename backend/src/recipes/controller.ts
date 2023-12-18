import { Request, Response } from 'express';
import service from './service';

import { validationResult } from 'express-validator';
import { sendCreatedRecipe } from '../websocket';

const controller = {
  async getAll(request: Request, response: Response) {
    const data = await service.getAll();
    response.json(data);
  },

  async getOne(request: Request, response: Response) {
    const parsedId = parseInt(request.params.id, 10);
    const recipe = await service.getOne(parsedId);
    response.json(recipe);
  },

  async create(request: Request, response: Response) {
    const result = validationResult(request);
    if (!result.isEmpty()) {
      response.status(400).send('you screwed it!');
      return;
    }
    try {
      const newData = await service.create(request.body);

      sendCreatedRecipe(newData);

      response.status(201).json(newData);
    } catch (error) {
      console.log(error);
      response.status(409).send('Recipe already exists');
    }
  },

  async update(request: Request, response: Response) {
    const changedData = request.body;

    const updateData = await service.update(changedData);

    response.json(updateData);
  },

  async remove(request: Request, response: Response) {
    const id = parseInt(request.params.id, 10);

    await service.remove(id);

    response.status(204).send();
  },
};

export default controller;
