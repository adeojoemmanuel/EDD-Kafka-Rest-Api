import OAuth2Server, {
    AuthorizationCode,
    Client,
    Token,
    User,
    Falsey,
    Callback,
  } from 'oauth2-server';
  import { IClient, ClientModel } from './model/client';
  import { IToken, TokenModel } from './model/token';
  import { IUser, UserModel } from './model/user';
  import {
    IBlockchainTransaction,
    BlockchainTransaction,
  } from './model/blockchain';
  import { IProduct, Product } from './model/product';
  import { transformClient, transformToken } from './utils/transform';
  
  interface RefreshToken {
    refreshToken: string;
    refreshTokenExpiresAt: Date;
    client: Client;
    user: User;
  }
  
  interface TokenInterface extends RefreshToken {
    accessToken: string;
    accessTokenExpiresAt: Date;
  }
  
  const oauth = new OAuth2Server({
    model: {
      getAccessToken: async (accessToken: string): Promise<Token | Falsey> => {
        try {
          const token = await TokenModel.findOne({ accessToken })
            .populate('client user')
            .exec();
  
          return token ? transformToken(token) : false;
        } catch (error) {
          console.error('Error retrieving access token:', error);
          return false;
        }
      },
  
      getClient: async (
        clientId: string,
        clientSecret: string
      ): Promise<Client | Falsey> => {
        try {
          const client = await ClientModel.findOne({
            clientId,
            clientSecret,
          }).exec();
          return client ? transformClient(client) : false;
        } catch (error) {
          console.error('Error retrieving client:', error);
          return false;
        }
      },
  
      saveToken: async (
        token: Token,
        client: Client,
        user: User,
        callback?: Callback<Token>
      ): Promise<Token | Falsey> => {
        try {
          const tokenDocument = new TokenModel({
            accessToken: token.accessToken,
            accessTokenExpiresAt: token.accessTokenExpiresAt,
            refreshToken: token.refreshToken,
            refreshTokenExpiresAt: token.refreshTokenExpiresAt,
            client: client.id,
            user: user.id,
          });
  
          const savedToken = await tokenDocument.save();
          const transformedToken:any = savedToken ? transformToken(savedToken) : false;
  
          if (callback) callback(null, transformedToken);
  
          return transformedToken;
        } catch (error) {
          console.error('Error saving token:', error);
          if (callback) callback(error);
          return false;
        }
      },
  
      getUser: async (
        username: string,
        password: string
      ): Promise<User | Falsey> => {
        try {
          const user = await UserModel.findOne({ username, password }).exec();
          return user || false;
        } catch (error) {
          console.error('Error retrieving user:', error);
          return false;
        }
      },
  
      getAuthorizationCode: async (
        code: string
      ): Promise<AuthorizationCode | Falsey | any> => {
        try {
          const authCode = await TokenModel.findOne({
            authorizationCode: code || '',
          })
            .populate('client user')
            .exec();
          return authCode || false;
        } catch (error) {
          console.error('Error retrieving authorization code:', error);
          return false;
        }
      },
  
      saveAuthorizationCode: async (
        code: AuthorizationCode,
        client: Client,
        user: User,
        callback?: Callback<AuthorizationCode>
      ): Promise<AuthorizationCode | Falsey | any> => {
        try {
          const authCodeDocument = new TokenModel({
            authorizationCode: code.authorizationCode || '', // Ensuring it's a string
            expiresAt: code.expiresAt,
            redirectUri: code.redirectUri,
            client: client.id,
            user: user.id,
          });
  
          const savedAuthCode = await authCodeDocument.save();
          const transformedAuthCode:any = savedAuthCode || false;
  
          if (callback) callback(null, transformedAuthCode);
  
          return transformedAuthCode;
        } catch (error) {
          console.error('Error saving authorization code:', error);
          if (callback) callback(error);
          return false;
        }
      },
  
  
      // Revoke authorization code
      revokeAuthorizationCode: async (
        code: AuthorizationCode,
        callback?: Callback<boolean>
      ): Promise<boolean> => {
        try {
          const result = await TokenModel.deleteOne({
            authorizationCode: code.authorizationCode,
          }).exec();
          const isRevoked = result.deletedCount === 1;
  
          if (callback) callback(null, isRevoked);
  
          return isRevoked;
        } catch (error) {
          console.error('Error revoking authorization code:', error);
          if (callback) callback(error);
          return false;
        }
      },
  
      getRefreshToken: async (refreshToken: string): Promise<RefreshToken | Falsey> => {
        try {
          const token = await TokenModel.findOne({ refreshToken })
            .populate('client user')
            .exec() as any;

          return token ? transformToken(token) as RefreshToken : false;
        } catch (error) {
          console.error('Error retrieving refresh token:', error);
          return false;
        }
      },
  
      revokeToken: async (
        token: Token,
        callback?: Callback<boolean>
      ): Promise<boolean> => {
        try {
          const result = await TokenModel.deleteOne({
            refreshToken: token.refreshToken,
          }).exec();
          const isRevoked = result.deletedCount === 1;
  
          if (callback) callback(null, isRevoked);
  
          return isRevoked;
        } catch (error) {
          console.error('Error revoking refresh token:', error);
          if (callback) callback(error);
          return false;
        }
      },
  
      saveBlockchainTransaction: async (
        transaction: IBlockchainTransaction,
        callback?: Callback<IBlockchainTransaction>
      ): Promise<IBlockchainTransaction | Falsey | any> => {
        try {
          const transactionDocument = new BlockchainTransaction(transaction);
          const savedTransaction = await transactionDocument.save();
          const transformedTransaction = savedTransaction || false;
  
          if (callback) callback(null, transformedTransaction);
  
          return transformedTransaction;
        } catch (error) {
          console.error('Error saving blockchain transaction:', error);
          if (callback) callback(error);
          return false;
        }
      },

      getBlockchainTransaction: async (
        transactionId: string,
        callback?: Callback<IBlockchainTransaction>
      ): Promise<IBlockchainTransaction | Falsey> => {
        try {
          const transaction = await BlockchainTransaction.findOne({
            transactionId,
          }).exec();
          const transformedTransaction:any = transaction || false;
  
          if (callback) callback(null, transformedTransaction);
  
          return transformedTransaction;
        } catch (error) {
          console.error('Error retrieving blockchain transaction:', error);
          if (callback) callback(error);
          return false;
        }
      },
  
      saveProduct: async (
        product: IProduct,
        callback?: Callback<IProduct>
      ): Promise<IProduct | Falsey> => {
        try {
          const productDocument = new Product(product);
          const savedProduct = await productDocument.save();
          const transformedProduct = savedProduct as IProduct | undefined; // Adjusting types
  
          if (callback) callback(null, transformedProduct);
  
          return transformedProduct;
        } catch (error) {
          console.error('Error saving product:', error);
          if (callback) callback(error);
          return undefined;
        }
      },
  
      getProduct: async (
        productId: string,
        callback?: Callback<IProduct>
      ): Promise<IProduct | undefined> => { 
        try {
          const product = await Product.findById(productId).exec();
          const transformedProduct = product as IProduct | undefined;
  
          if (callback) callback(null, transformedProduct);
  
          return transformedProduct;
        } catch (error) {
          console.error('Error retrieving product:', error);
          if (callback) callback(error);
          return undefined;
        }
      },
    },
  });
  