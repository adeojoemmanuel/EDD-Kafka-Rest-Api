// auth-service/src/index.ts

import express from "express";
import mongoose from "mongoose";
import session from "express-session";
import passport from "passport";
import authRoutes from "./route/auth";
import "./config/passport";

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI!, {});

// Middleware
app.use(express.json());
app.use(session({ secret: "secret", resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/auth", authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Auth Service running on port ${PORT}`);
});


// investigate Connect to MongoDB witn object argument 
// mongoose.connect(process.env.MONGO_URI!, { useNewUrlParser: true, useUnifiedTopology: true });

// app.use(session({ secret: "secret", resave: false, saveUninitialized: false }));
