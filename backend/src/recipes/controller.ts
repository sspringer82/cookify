import { Request, Response } from 'express';
import service from './service';

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
    const newData = await service.create(request.body);
    response.status(201).json(newData);
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
