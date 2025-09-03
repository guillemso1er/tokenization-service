import { Knex } from 'knex';
import bcrypt from 'bcrypt';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('users').del();

  // Inserts seed entries
  await knex('users').insert([
    {
      username: 'admin',
      password_hash: bcrypt.hashSync('admin123', 10),
      role: 'admin',
    },
    {
      username: 'editor',
      password_hash: bcrypt.hashSync('editor123', 10),
      role: 'editor',
    },
  ]);
}