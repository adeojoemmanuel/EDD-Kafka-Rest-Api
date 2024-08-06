import { Router } from "express";
import { getUserProfile, updateUserProfile, getUser, createUserc } from "./../src/controllers/user.controller";

const router = Router();

router.get("/profile", getUserProfile);
router.put("/profile", updateUserProfile);
router.get("/:id", getUser);
router.post("/", createUserc);

export default router;
