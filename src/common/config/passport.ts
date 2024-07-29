import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { UserModel } from './../../../database';

passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        callbackURL: "/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const email = profile.emails && profile.emails.length > 0 ? profile.emails[0].value : null;
          if (!email) {
            return done(new Error("No email found in Google profile"), '');
          }
  
          let user = await UserModel.findOne({ googleId: profile.id });
  
          if (!user) {
            user = await UserModel.create({
              googleId: profile.id,
              username: profile.displayName,
              email: email,
              role: "user",
            });
          }
          done(null, UserModel);
        } catch (err) {
          done(err, "unexpected error");
        }
      }
    )
  );
  

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  UserModel.findById(id, (err: any, user: boolean | Express.User | null | undefined) => {
    done(err, user);
  });
});


export default passport;