import { Request, Response } from 'express';
import { getUser, createUser,getProfile, updateProfile } from './../service/user.service';
import { errors } from 'web3';
import { UserModel } from '../../../database';

export const getUserCall = async (req: Request, res: Response) => {
  try {
    const user = await getUser(req.params.id, );
    if (!user) return res.sendStatus(404);
    res.json(user);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createUserCall = async (req: Request, res: Response) => {
  try {
    const newUser = await createUser(req.body);
    res.status(201).json(newUser);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};


export async function getProfileCall(req: Request, res: Response) {
  try {
    const user = await UserModel.findById(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving user profile" });
  }
}

export async function updateProfileCall(req: Request, res: Response) {
  try {
    const userId = req.params.id as string;
    const updatedUser = await UserModel.findByIdAndUpdate(userId, req.body, { new: true });
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: "Error updating user profile" });
  }
}


