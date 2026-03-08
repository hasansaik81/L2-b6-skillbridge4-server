import express, { Application, Request, Response } from 'express';
import cors from 'cors';

// import router from './routes';
import { AuthRoutes } from './modules/Auth/auth.route';
import { errorHandler } from './middlewares/globalErrorHandler';
import { notFound } from './middlewares/notFound';
// import { TutorRoutes } from './modules/Tutor/tutor.route';

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// application routes
// app.use('/api/v1',router);
// console.log(TutorRoutes.stack); 
app.use('/api/v1/auth',AuthRoutes);
// app.use("/api/v1/tutors", TutorRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from Apollo Gears World!');
});

app.use(errorHandler);
app.use(notFound)

export default app;
