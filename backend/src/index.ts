import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import patientRouter from './routes/patients';
import visitRouter from './routes/visits';
import vaccinationRouter from './routes/vaccinations';
import ancRecordRouter from './routes/ancRecords';

dotenv.config();

const app = express();
const port = Number(process.env.PORT ?? 5000);
const mongoUrl = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/project-whisper-dev';

app.use(cors({ origin: true }));
app.use(express.json());

app.use('/api/patients', patientRouter);
app.use('/api/visits', visitRouter);
app.use('/api/vaccinations', vaccinationRouter);
app.use('/api/anc-records', ancRecordRouter);

app.get('/api', (_req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'Backend is running.' });
});

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(500).json({ error: err.message ?? 'Internal server error' });
});

const start = async () => {
  await mongoose.connect(mongoUrl, {
    serverSelectionTimeoutMS: 5000,
  });

  app.listen(port, () => {
    console.log(`Backend server is running on http://localhost:${port}`);
  });
};

start().catch((error) => {
  console.error('Unable to start backend:', error);
  process.exit(1);
});
