import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the Auth System!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
