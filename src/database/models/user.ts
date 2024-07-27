import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IUser extends Document {
  _id?: Types.ObjectId;
  googleId?: string;
  username: string;
  password: string;
  email: string;
  roles: string[];
}

export interface IUser {
  username: string;
  password: string;
}

const userSchema = new Schema<IUser>({
  _id: { type: String, required: false, unique: true },
  googleId: { type: String, required: false, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  roles: [{ type: String, enum: ['user', 'admin'], default: 'user' }],
});

export const UserModel = mongoose.model<IUser>('User', userSchema);
