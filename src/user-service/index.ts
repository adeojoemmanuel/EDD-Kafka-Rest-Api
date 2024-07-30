import express from 'express';
import { json } from 'body-parser';
import { getUser, createUser } from './src/service/user.service';
import { KafkaProducer, KafkaConsumer } from './kafka';
import userRoutes from "./routes/user.route";
import mongoose from 'mongoose';
import passport from 'passport';
import session from "express-session";

const app = express();
app.use(json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI!, {});

// Middleware
app.use(express.json());
app.use(session({ secret: "secret", resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use('/api/user', userRoutes);

const PORT = process.env.PORT || 3000;
mongoose.connect(process.env.MONGO_URI!, {})
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Auth Service running on port ${PORT}`);
    });
}).catch((err: any) => console.error(err));


// Initialize Kafka producer and consumer
KafkaProducer.init();
KafkaConsumer.init();

app.listen(3001, () => {
  console.log('User service running on port 3001');
});
