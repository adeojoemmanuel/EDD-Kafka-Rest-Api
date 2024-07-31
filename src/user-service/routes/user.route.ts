import { Schema, model, Document } from 'mongoose';
import { Router } from "express";
import { UserModel } from "./../../database";
const router = Router();

router.get("/profile", async (req, res) => {
  try {
    const user = await UserModel.findById(req.body?._id);
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving user profile" });
  }
});

router.put("/profile", async (req, res) => {
  try {
    const userId = req.body._id as string;
    const updatedUser = await UserModel.findByIdAndUpdate(userId, req.body, { new: true });
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: "Error updating user profile" });
  }
});

export default router;