import { Router, Request, Response, NextFunction } from "express";
import passport from "passport";
import { authenticateToken, generateUserToken, loginUser, registerUser } from "../src/controllers/auth.controller";
import googleAuthCallback from "./../middleWare/authMiddleware"; 
const router = Router();

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Google Authentication Routes
router.get(
  "/google/callback",
  googleAuthCallback("/login", "/dashboard")
);

// User Routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Token Validation Route
router.get('/validate-token', authenticateToken);

// Token Generation Route
router.post('/generate-token', generateUserToken);


export default router;

