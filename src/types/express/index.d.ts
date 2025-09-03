import { UserRole } from '../../enums/roles.enum';

declare global {
  namespace Express {
    export interface Request {
      user?: UserPayload;
    }
  }
}

export interface UserPayload {
  id: string;
  role: UserRole;
}