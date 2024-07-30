import { Schema, model, Document } from 'mongoose';
import { Router } from "express";
import { UserModel } from "./../../database";
import { getUserCall, createUserCall, getProfileCall, updateProfileCall } from './../src/controllers/user.controller';

const router = Router();

router.post('/create/profile', createUserCall);
router.get('/user:id', getUserCall);
router.get('/profile:id', getProfileCall);
router.put('/profile:id', updateProfileCall);

export default router;