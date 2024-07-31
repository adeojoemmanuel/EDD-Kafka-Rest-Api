"use strict";

import jwt from 'jsonwebtoken';
import Web3 from 'web3';
import passport from 'passport';
import bcrypt from 'bcryptjs';
import { IUser, UserModel } from './../../../database';
import { config } from '../../../common/config';

const web3 = new Web3(process.env.PORT);
const SECRET_KEY = process.env.PORT || 'your_secret_key';

export function handleGoogleAuth() {
  return passport.authenticate('google', { scope: ['profile', 'email'] });
}

export function handleGoogleCallback() {
  return passport.authenticate('google', { failureRedirect: '/login' });
}

export const register = async (email: string, password: string, role: string): Promise<IUser> => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new UserModel({ email, password: hashedPassword, role });
  await user.save();
  return user;
};

export const login = async (email: string, password: string): Promise<string | null> => {
  const user = await UserModel.findOne({ email });
  if (!user) return null;

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return null;

  const token = jwt.sign({ id: user._id, role: user.roles }, config.jwtSecret, { expiresIn: '1h' });
  return token;
};

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