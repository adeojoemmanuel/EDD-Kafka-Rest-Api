import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import authRoutes from '../src/auth-service/routes/auth.route';
import blockchainRoute from './blockchain-service/routes/blockchain-router';
import userService from './user-service/routes/user.route';
import commmonSharedFile from './common/routes/common.route';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3033;

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/blockchain', blockchainRoute);
app.use('/api/user', userService);
app.use('/api/google', commmonSharedFile);


app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the Auth System!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
