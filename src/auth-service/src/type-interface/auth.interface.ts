import { Callback } from "mongoose";
import { AuthorizationCodeModel, Client, Falsey, User } from "oauth2-server";
import { IBlockchainTransaction } from "../../../database";

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

/•auth interface•/