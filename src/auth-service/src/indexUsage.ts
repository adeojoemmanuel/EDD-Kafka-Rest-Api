// auth-service/src/index.ts

import express from "express";
import mongoose from "mongoose";
import session from "express-session";
import passport from "passport";
import authRoutes from "./route/auth";
import "./config/passport";

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI!,{});

// Middleware
app.use(express.json());
app.use(session({ secret: "secret", resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/auth", authRoutes);

