// types/passport-google-oauth20.d.ts

declare module 'passport-google-oauth20' {
  import { Strategy as PassportStrategy } from 'passport';
  import { Request } from 'express';

  export interface Profile {
    provider: string;
    id: string;
    displayName: string;
    name: {
      familyName: string;
      givenName: string;
    };
    emails: Array<{
      value: string;
      verified?: boolean;
    }>;
    photos: Array<{
      value: string;
    }>;
  }

  export interface VerifyCallback {
    (error: any, user?: any, info?: any): void;
  }

  export interface VerifyFunction {
    (accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback): void;
  }

  export interface VerifyFunctionWithRequest {
    (req: Request, accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback): void;
  }

  export interface StrategyOptions {
    clientID: string;
    clientSecret: string;
    callbackURL: string;
    scope?: string[];
    state?: boolean;
    sessionKey?: string;
    store?: any;
    proxy?: boolean;
    passReqToCallback?: false;
  }

  export interface StrategyOptionsWithRequest extends Omit<StrategyOptions, 'passReqToCallback'> {
    passReqToCallback: true;
  }

  export class Strategy extends PassportStrategy {
    constructor(options: StrategyOptions, verify: VerifyFunction);
    constructor(options: StrategyOptionsWithRequest, verify: VerifyFunctionWithRequest);

    name: string;
  }
}
