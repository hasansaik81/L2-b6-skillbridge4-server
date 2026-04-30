import express, { Application, Request, Response } from 'express';
import cors from 'cors';

// import router from './routes';
import { AuthRoutes } from './modules/Auth/auth.route';
// import { errorHandler } from './middlewares/globalErrorHandler';
import { notFound } from './middlewares/notFound';
import router from './routes';
import errorHandler from './middlewares/globalErrorHandler';
// import { TutorRoutes } from './modules/Tutor/tutor.route';

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     credentials: true,
//   })
// );

// application routes
app.use('/api/v1',router);


app.get('/', (req: Request, res: Response) => {
  res.send('Hello from Apollo Gears World!');
});

app.use(errorHandler);
app.use(notFound)

export default app;
