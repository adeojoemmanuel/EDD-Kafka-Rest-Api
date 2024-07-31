"use strict";

import jwt from 'jsonwebtoken';
import Web3 from 'web3';
import { Request, Response, NextFunction } from 'express';
import passport from 'passport';

const web3 = new Web3(process.env.PORT);
const SECRET_KEY = process.env.PORT || 'your_secret_key';

export function handleGoogleAuth() {
  return passport.authenticate('google', { scope: ['profile', 'email'] });
}

export function handleGoogleCallback() {
  return passport.authenticate('google', { failureRedirect: '/login' });
}

export const generateToken = (username: string) => {
  return jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
};

export const validateToken = (token: string) => {
  try {
      jwt.verify(token, SECRET_KEY);
      return true;
  } catch {
      return false;
  }
};