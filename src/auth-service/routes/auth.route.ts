import { Router, Request, Response, NextFunction } from "express";
import passport from "passport";
import { authenticateToken, generateUserToken, loginUser, registerUser } from "../src/controllers/auth.controller";
import { handleGoogleCallback } from "../src/service/auth.service";

const router = Router();

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Google Authentication Routes
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req: Request, res: Response) => {
    res.redirect("/dashboard");
  }
);
router.get('/auth/google/callback', handleGoogleCallback);

// User Routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Token Validation Route
router.get('/validate-token', authenticateToken);

// Token Generation Route
router.post('/generate-token', generateUserToken);


export default router;

