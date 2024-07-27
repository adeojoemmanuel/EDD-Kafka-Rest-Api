import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  googleId?: string;
  email: string;
  password?: string;
  name: string;
  role: string;
}

const userSchema = new Schema<IUser>({
  googleId: { type: String, unique: true, sparse: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  name: { type: String, required: true },
  role: { type: String, default: 'user' },
});

const Users = mongoose.model<IUser>('User', userSchema);

export default Users;
