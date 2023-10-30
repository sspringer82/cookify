import { data } from '../data';
import { Request, Response } from 'express';
import getIndexOfElement from './util';
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
    response.json(newData);
  },

  update(request: Request, response: Response) {
    const changedData = request.body;
    const index = getIndexOfElement(request, data);
    data[index] = changedData;
    response.json(changedData);
  },

  remove(request: Request, response: Response) {
    const index = getIndexOfElement(request, data);
    data.splice(index, 1);
    response.send();
  },
};

export default controller;
