import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { UserModel, IUser } from './../../../database';

export const getUserById = async (userId: string) => {
  const user = await UserModel.findById(userId);
  if (!user) 
    return {message: 'user not fouund'};
  return {message: 'user found', data: user};
};

export const createUser = async (data: {}) => {
  const newUser = new UserModel(data);
  await newUser.save();
  return newUser;
};
