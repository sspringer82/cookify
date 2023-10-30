import { Request } from 'express';
import { Recipe } from '../types/Recipe';

export default function getIndexOfElement(
  request: Request,
  data: Recipe[]
): number {
  const parsedId = parseInt(request.params.id, 10);
  return data.findIndex((r) => r.id === parsedId);
}
