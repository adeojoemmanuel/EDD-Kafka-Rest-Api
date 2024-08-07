import { Router, Request, Response, NextFunction } from "express";
import passport from "passport";
const router = Router();

// required policy by GCP

router.get(
  "/policies",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req: Request, res: Response) => {
    res.redirect("https://policies.google.com/privacy?hl=en-US");
  }
);


export default router;

