import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { authConfig } from '../config';

// In a real application, you would fetch users from a database
const users = [
  {
    id: '1',
    username: 'admin',
    passwordHash: bcrypt.hashSync('admin123', 10),
    role: 'admin',
  },
  {
    id: '2',
    username: 'editor',
    passwordHash: bcrypt.hashSync('editor123', 10),
    role: 'editor',
  },
];

export class AuthService {
  async login(username: string, password: string): Promise<string> {
    const user = users.find((u) => u.username === username);
    if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
      throw new Error('Invalid credentials');
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      authConfig.jwtSecret,
      {
        expiresIn: authConfig.jwtExpiresIn,
      },
    );

    return token;
  }
}