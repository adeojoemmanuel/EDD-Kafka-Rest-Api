import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { UserModel } from "./../../../database";

export const getUser = async (userId:string) => {
  const user = await UserModel.findById(userId);
  if (!user) return user;
};

export const createUser = async (body:any) => {
  const newUser = new UserModel(body);
  await newUser.save();
  return newUser;
};

export const getProfile = async(userId:string) => {
  try {
    const user = await UserModel.findById(userId);
    return user;
  } catch (err) {
   return { message: "Error retrieving user profile" };
  }
}

export const updateProfile = async(userIdi:string, body: any) => {
  try {
    const userId = userIdi as string;
    const updatedUser = await UserModel.findByIdAndUpdate(userId, body, { new: true });
   return updatedUser;
  } catch (err) {
    return { message: "Error updating user profile" };
  }
}