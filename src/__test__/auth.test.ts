// src/tests/auth.service.test.ts
import request from 'supertest';
import express from 'express';
import { createToken, verifyToken } from '../controllers/auth.controller';

const app = express();
app.use(express.json());
app.post('/token', createToken);
app.get('/verify', verifyToken);

describe('Auth Service', () => {
    it('should return token on valid credentials', async () => {
        const response = await request(app)
            .post('/token')
            .send({ username: 'user', password: 'password' });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
    });

    it('should return valid message on valid token', async () => {
        const tokenResponse = await request(app)
            .post('/token')
            .send({ username: 'user', password: 'password' });
        const token = tokenResponse.body.token;

        const response = await request(app)
            .get('/verify')
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'Token is valid');
    });

    it('should return 401 on invalid token', async () => {
        const response = await request(app)
            .get('/verify')
            .set('Authorization', 'Bearer invalidtoken');
        expect(response.status).toBe(403);
    });
});
