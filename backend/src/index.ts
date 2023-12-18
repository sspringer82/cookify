import express from 'express';
import recipeRouter from './recipes/index';
import authRouter from './auth/index';
import { expressjwt } from 'express-jwt';
import cors from 'cors';
import { initWebSocket } from './websocket';

const app = express();
app.use(cors());
app.use(express.json());

app.use(
  '/recipes',
  expressjwt({ secret: 'topSecret', algorithms: ['HS256'] }),
  recipeRouter
);
app.use('/auth', authRouter);

app.listen(3001, () => console.log('Cookify Backend is ready for operations'));

initWebSocket();
