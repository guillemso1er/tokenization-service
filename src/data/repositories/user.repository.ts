import db from '../db';
import { User } from '../../models/user.model';

// This interface represents the structure of the data in the 'users' table (snake_case)
interface UserDataRow {
  id: string;
  username:string;
  password_hash: string;
  role: string;
  created_at: Date;
  updated_at: Date;
}

export class UserRepository {
  private readonly tableName = 'users';

  /**
   * Maps a database row (snake_case) to a User domain model object (camelCase).
   * @param row The database row.
   * @returns A User object.
   */
  private toModel(row: UserDataRow): User {
    return {
      id: row.id,
      username: row.username,
      passwordHash: row.password_hash,
      role: row.role as User['role'], // Assumes role in DB matches UserRole enum
    };
  }

  /**
   * Finds a single user by their username.
   * @param username The username to search for.
   * @returns A User object, or undefined if not found.
   */
  public async findByUsername(username: string): Promise<User | undefined> {
    const userRow = await db<UserDataRow>(this.tableName)
      .where({ username })
      .first();
    
    return userRow ? this.toModel(userRow) : undefined;
  }
}