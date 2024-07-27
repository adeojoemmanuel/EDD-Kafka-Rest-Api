import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || '';

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
