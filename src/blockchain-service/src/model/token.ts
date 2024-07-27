import { Document, Schema, model } from 'mongoose';
  
  export interface IToken extends Document {
    accessToken: string;
    accessTokenExpiresAt: Date;
    refreshToken: string;
    refreshTokenExpiresAt: Date;
    client: { type: Schema.Types.ObjectId, ref: 'Client' },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    authorizationCode?: string;
    expiresAt?: Date;
    redirectUri?: string;
  }
  
  const TokenSchema = new Schema<IToken>({
    accessToken: String,
    accessTokenExpiresAt: Date,
    refreshToken: String,
    refreshTokenExpiresAt: Date,
    client: { type: Schema.Types.ObjectId, ref: 'Client' },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    authorizationCode: String,
    expiresAt: Date,
    redirectUri: String,
  });
  
  export const TokenModel = model<IToken>('Token', TokenSchema);
  