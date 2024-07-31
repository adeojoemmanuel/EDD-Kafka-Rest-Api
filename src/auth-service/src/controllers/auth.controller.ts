import { generateToken, validateToken } from '../service/auth.service';
import Web3 from 'web3';
import { Request, Response, NextFunction } from 'express';


const web3 = new Web3(process.env.RPC);
const SECRET_KEY = process.env.PORT || 'your_secret_key';

export function handleGoogleRedirect(req: Request, res: Response) {
  res.redirect('/dashboard');
}

export function handleLogout() {
  return (req: Request, res: Response, next: NextFunction) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      res.redirect('/');
    });
  };
}

export function handleRegister() {
  return (req: Request, res: Response) => {
    const address = req.params.address;
    res.send(`Register user with address: ${address}`);
  };
}

export function handleLogin() {
  return (req: Request, res: Response) => {
    const address = req.params.address;
    res.send(`Login user with address: ${address}`);
  };
}

export function handleValidateToken() {
  return (req: Request, res: Response) => {
    const address = req.params.address;
    res.send(`Validate token for address: ${address}`);
  };
}

