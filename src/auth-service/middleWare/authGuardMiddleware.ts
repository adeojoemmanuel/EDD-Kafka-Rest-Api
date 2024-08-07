import { Request, Response, NextFunction } from "express";
import passport from "passport";

const googleAuthCallback = (
  failureRedirect: string = "/login",
  successRedirect: string = "/dashboard"
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("google", { failureRedirect }, (err, user, info) => {
      if (err || !user) {
        return res.redirect(failureRedirect);
      }
      req.logIn(user, (loginErr) => {
        if (loginErr) {
          return next(loginErr);
        }
        return res.redirect(successRedirect);
      });
    })(req, res, next);
  };
};

export default googleAuthCallback;
