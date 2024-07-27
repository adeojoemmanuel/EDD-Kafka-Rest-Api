import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IClient extends Document {
  _id: Types.ObjectId;
  clientId: string;
  clientSecret: string;
  grants: string[];
  redirectUris: string[];
}

const clientSchema = new Schema<IClient>({
  clientId: { type: String, required: true },
  clientSecret: { type: String, required: true },
  grants: [{ type: String }],
  redirectUris: [{ type: String }],
});

export interface IClient {
  clientId: string;
  clientSecret: string;
}

export const ClientModel = mongoose.model<IClient>('Client', clientSchema);
