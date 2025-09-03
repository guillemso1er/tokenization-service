import dotenv from 'dotenv';

dotenv.config();

if (!process.env.JWT_SECRET || process.env.JWT_SECRET === 'your-jwt-secret') {
  throw new Error('FATAL ERROR: JWT_SECRET is not defined or is set to the default value.');
}

export const authConfig = {
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1h',
};