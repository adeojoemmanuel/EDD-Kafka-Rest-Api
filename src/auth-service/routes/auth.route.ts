import { Router, Request, Response, NextFunction } from "express";
import passport from "passport";
import { validateToken, generateToken, handleGoogleAuth, handleGoogleCallback } from './../src/service/auth.service';

const router = Router();

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req: Request, res: Response) => {
    res.redirect("/dashboard");
  }
);

// Google OAuth Routes
router.get('/google', handleGoogleAuth);
router.get('/google/callback', handleGoogleCallback);

// Logout Route
router.get('/logout', (req: Request, res: Response, next: NextFunction) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

router.get('/login/:address', generateToken);
router.get('/vaalidate/:address', validateToken);




export default router;

