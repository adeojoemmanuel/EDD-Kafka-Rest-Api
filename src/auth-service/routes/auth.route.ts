import { Router, Request, Response, NextFunction } from "express";
import passport from "passport";
import { validateToken, generateToken, handleGoogleAuth, handleGoogleCallback, handleLogout, googleAuthCallback} from './../../user-service/src/service/auth.service';

const router = Router();

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Google OAuth Routes
router.get('/google', handleGoogleAuth);
router.get('/google/callback', handleGoogleCallback);
router.get('/google/callback', handleGoogleAuth, googleAuthCallback);

// Logout Route
router.get('/logout', handleLogout);
router.get('/login/:address', generateToken);
router.get('/vaalidate/:address', validateToken);


export default router;
