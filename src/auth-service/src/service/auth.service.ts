"use strict";

import jwt from 'jsonwebtoken';
import Web3 from 'web3';
import { Request, Response, NextFunction } from 'express';
import passport from 'passport';

const web3 = new Web3(process.env.PORT);
const SECRET_KEY = process.env.PORT || 'your_secret_key';

export function handleGoogleAuthc() {
  return passport.authenticate('google', { scope: ['profile', 'email'] });
}

export function handleGoogleCallbackc() {
  return passport.authenticate('google', { failureRedirect: '/login' });
}

export function handleGoogleRedirectc(req: Request, res: Response) {
  res.redirect('/dashboard');
}

export function handleLogoutc() {
  return (req: Request, res: Response, next: NextFunction) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      res.redirect('/');
    });
  };
}

export function handleRegisterc() {
  return (req: Request, res: Response) => {
    const address = req.params.address;
    res.send(`Register user with address: ${address}`);
  };
}

export function handleLoginc() {
  return (req: Request, res: Response) => {
    const address = req.params.address;
    res.send(`Login user with address: ${address}`);
  };
}

export function handleValidateTokenc() {
  return (req: Request, res: Response) => {
    const address = req.params.address;
    res.send(`Validate token for address: ${address}`);
  };
}

export const generateTokenc = (username: string) => {
  return jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
};

export const validateTokenc = (token: string) => {
  try {
      jwt.verify(token, SECRET_KEY);
      return true;
  } catch {
      return false;
  }
};