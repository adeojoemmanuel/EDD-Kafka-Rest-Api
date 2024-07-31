import { register, login, generateToken, validateToken } from './../service/auth.service';
import Web3 from 'web3';
import { Request, Response, NextFunction } from 'express';


const web3 = new Web3(process.env.RPC);
const SECRET_KEY = process.env.PORT || 'your_secret_key';

export function handleGoogleRedirect(req: Request, res: Response) {
  res.redirect('/dashboard');
}

export async function registerUser(req: Request, res: Response) {
  try {
    const { email, password, role } = req.body;
    const user = await register(email, password, role);
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(500).json({ error: 'Failed to register user' });
  }
}

export async function loginUser(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const token = await login(email, password);
    if (token) {
      res.json({ message: 'Login successful', token });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to login' });
  }
}

export function authenticateToken(req: Request, res: Response) {
  const token = req.headers['authorization']?.split(' ')[1];
  if (token && validateToken(token)) {
    res.status(200).json({ message: 'Token is valid' });
  } else {
    res.status(401).json({ error: 'Invalid token' });
  }
}

export function generateUserToken(req: Request, res: Response) {
  const { username } = req.body;
  const token = generateToken(username);
  res.json({ message: 'Token generated successfully', token });
}

