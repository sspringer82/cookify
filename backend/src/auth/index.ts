import express from 'express';
import { Credentials } from '../types/Credentials';

import { sign } from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const app = express.Router();

const prisma = new PrismaClient();

app.post('/', async (request, response) => {
  const credentials = request.body as Credentials;
  const user = await prisma.user.findUnique({ where: credentials });

  if (user) {
    delete (user as any).password;
    const token = sign(user, 'topSecret');

    response.json({ token });
  } else {
    response.statusCode = 401;
    response.send();
  }
});

export default app;
