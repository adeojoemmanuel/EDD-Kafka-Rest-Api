import { IClient } from './../models/client';
import { IUser } from './../models/user';
import { IToken } from './../models/token';
import { Token, Client, User } from 'oauth2-server';

export function transformClient(client: IClient): Client {
    return {
        id: client._id.toString(),
        clientId: client.clientId,
        clientSecret: client.clientSecret,
        grants: client.grants,
        redirectUris: client.redirectUris,
    };
}

export function transformToken(token: IToken): Token {
    return {
        accessToken: token.accessToken,
        accessTokenExpiresAt: token.accessTokenExpiresAt,
        refreshToken: token.refreshToken,
        refreshTokenExpiresAt: token.refreshTokenExpiresAt,
        client: token.client as any as Client,
        user: token.user as User,
    };
}

