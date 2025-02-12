import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorHandler';

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// application routes
app.use('/api', router);

const testRoute = async (req: Request, res: Response) => {
  res.send('Server in running');
};

app.get('/', testRoute);

app.use(globalErrorHandler);

export default app;
