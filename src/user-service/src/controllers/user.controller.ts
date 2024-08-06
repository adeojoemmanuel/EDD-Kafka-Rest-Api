import { Request, Response } from 'express';
import { UserModel } from "./../../../database";
import { getUserById, createUserAction as importedCreateUserAction } from './../service/user.service';

export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const user = await UserModel.findById(req.body?._id);
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving user profile" });
  }
};

export const updateUserProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.body._id as string;
    const updatedUser = await UserModel.findByIdAndUpdate(userId, req.body, { new: true });
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: "Error updating user profile" });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await getUserById(req.params.id);
    if (!user) return res.sendStatus(404);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const createUserc = async(req: Request, res: Response) => (
  topic: string,
  callback: (message: any) => Promise<any>
): (() => any) => {
  return async () => {
    const newUser = await importedCreateUserAction();
    console.log(`Topic: ${topic}, ${newUser}`);
    return callback({ someMessage: 'Sample message' });
  };
};