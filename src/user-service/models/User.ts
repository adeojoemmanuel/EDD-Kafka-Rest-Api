import mongoose, { Document, Schema } from "mongoose";

interface IUser extends Document {
  id?: any
  username: string;
  email: string;
  password: string;
  role: string;
}

const UserSchema: Schema = new Schema({
  id: { type: String, required: false },
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
});

export default mongoose.model<IUser>("User", UserSchema);
