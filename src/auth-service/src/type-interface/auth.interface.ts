import { Callback as MongooseCallback } from 'mongoose';

import { 
  AuthorizationCodeModel, 
  AuthorizationCode,  
  Client, 
  Falsey, 
  User, 
  Token 
} from "oauth2-server";

import { IBlockchainTransaction } from "../../../database";

export type CallbackError = Error | null;
export type CustomCallback<T = any> = (error: CallbackError, result: T) => void;

export interface IProduct {
  id: string;
  name: string;
  price: number;
}

export type Callback<T> = (error: Error | null, result?: T) => void;

export interface ExtendedOAuth2Model {
  getAccessToken: (accessToken: string) => Promise<Token | Falsey>;
  getClient: (clientId: string, clientSecret: string) => Promise<Client | Falsey>;
  saveToken: (token: Token, client: Client, user: User, callback?: Callback<Token>) => Promise<Token | Falsey>;
  getUser: (username: string, password: string) => Promise<User | Falsey>;
  getAuthorizationCode: (code: string) => Promise<AuthorizationCode | Falsey | any>;
  saveAuthorizationCode: (code: AuthorizationCode, client: Client, user: User, callback?: Callback<AuthorizationCode>) => Promise<AuthorizationCode | Falsey | any>;
  revokeAuthorizationCode: (code: AuthorizationCode, callback?: Callback<boolean>) => Promise<boolean>;
  getRefreshToken: (refreshToken: string) => Promise<Token | Falsey>;
  revokeToken: (token: Token, callback?: Callback<boolean>) => Promise<boolean>;
  saveBlockchainTransaction: (transaction: IBlockchainTransaction, callback?: Callback<IBlockchainTransaction>) => Promise<IBlockchainTransaction | Falsey | any>;
  getBlockchainTransaction: (transactionId: string, callback?: Callback<IBlockchainTransaction>) => Promise<IBlockchainTransaction | Falsey>;
  saveProduct: (product: IProduct, callback?: Callback<IProduct>) => Promise<IProduct | Falsey>;
  getProduct: (productId: string, callback?: Callback<IProduct>) => Promise<IProduct | undefined>;
}


export interface ExtendedAuthorizationCodeModel extends AuthorizationCodeModel {
    saveBlockchainTransaction: (
      transaction: IBlockchainTransaction,
      callback?: Callback<IBlockchainTransaction>
    ) => Promise<IBlockchainTransaction | Falsey>;
}

export interface RefreshToken {
  refreshToken: string;
  refreshTokenExpiresAt: Date;
  client: Client;
  user: User;
}

export interface TokenInterface extends RefreshToken {
  accessToken: string;
  accessTokenExpiresAt: Date;
}