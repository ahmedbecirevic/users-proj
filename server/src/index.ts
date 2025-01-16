import express, { Express, Request, Response } from 'express';

import userRouter from './users/userRouter';
import { feedUserData } from './data/usersRepository';
import cors from 'cors';

const app: Express = express();
const port = 3000;

app.use(
  cors({
    origin: 'http://localhost:5173',
  }),
  express.urlencoded({ extended: true }),
  express.json({ limit: '50mb' })
);

app.use('/users', userRouter);

app.use('/', (req: Request, res: Response) => {
  res.send('Healthy :)');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
  feedUserData();
});
