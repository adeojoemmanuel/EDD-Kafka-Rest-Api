import { Request, Response } from 'express';
import mongoose from 'mongoose';

  mongoose.connect('mongodb://localhost:27017/userdb', {});

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
});

const User = mongoose.model('User', UserSchema);

export const getUser = async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.sendStatus(404);
  res.json(user);
};

export const createUser = async (req: Request, res: Response) => {
  const newUser = new User(req.body);
  await newUser.save();
  res.status(201).json(newUser);
};
