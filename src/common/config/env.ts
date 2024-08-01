import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGODB_URI || 'mongodb://localhost/auth-service',
  jwtSecret: process.env.JWT_SECRET || '',
  googleClientId: process.env.GOOGLE_CLIENT_ID || '',
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
  kafkaBroker: process.env.KAFKA_BROKER || 'localhost:9092',
  rpc: process.env.RPC || '',
  openai: process.env.OPENAI_API_KEY || '',
};
