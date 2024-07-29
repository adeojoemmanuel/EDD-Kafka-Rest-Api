import { Schema, model, Document } from 'mongoose';
import { Router } from "express";
import User from "../models/User";
const router = Router();

router.get("/profile", async (req, res) => {
  try {
    const user = await User.findById(req.user?._id);
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving user profile" });
  }
});

router.put("/profile", async (req, res) => {
  try {
    const userId = req.user?._id as string;
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: "Error updating user profile" });
  }
});

export default router;