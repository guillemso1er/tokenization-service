import { UserRole } from '../enums/roles.enum';

export interface User {
  id: string;
  username: string;
  passwordHash: string;
  role: UserRole;
}