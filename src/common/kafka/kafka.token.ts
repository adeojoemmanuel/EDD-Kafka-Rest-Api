"use strict";

import jwt from 'jsonwebtoken';
import Web3 from 'web3';

const web3 = new Web3(process.env.PORT);
const SECRET_KEY = process.env.PORT || '';

export const generateToken = (username: string) => {
    return jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
};
  
export const validateToken = (token: string) => {
    try {
        jwt.verify(token, SECRET_KEY);
        return true;
    } catch {
        return false;
    }
};