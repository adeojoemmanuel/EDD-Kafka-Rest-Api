import { Request, Response } from 'express';
import { generateToken, validateToken } from '../service/auth.service';

export const createToken = (req: Request, res: Response) => {
  const { username, password } = req.body;
  const token = generateToken(username);
  res.json({ token });
};

export const verifyToken = (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.sendStatus(401);

  const valid = validateToken(token);
  if (!valid) return res.sendStatus(403);

  res.json({ message: 'Token is valid' });
};

