import jwt from 'jsonwebtoken';

export const createAuthToken = (userId) => jwt.sign({ userId }, 'thisisasecret', { expiresIn: '7 days' });