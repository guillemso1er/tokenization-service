import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { authConfig } from '../config';
import { UserRepository } from '../data/repositories/user.repository';

export class AuthService {
  private readonly userRepository = new UserRepository();

  async login(username: string, password: string): Promise<string> {
    const user = await this.userRepository.findByUsername(username);

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