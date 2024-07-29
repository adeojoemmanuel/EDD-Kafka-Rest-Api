import { IClient, IUser, IToken } from './../../../database/index';
import { Token, Client, User } from 'oauth2-server';
import { KafkaClient, Producer, Consumer, Message } from 'kafka-node';
import { config } from './../../../common/config';

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

