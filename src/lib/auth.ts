import { betterAuth } from 'better-auth';
import { tanstackStartCookies } from 'better-auth/tanstack-start';
import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.resolve(__dirname, '../../data/auth.db');

export const auth = betterAuth({
  database: new Database(dbPath),
  emailAndPassword: { enabled: true },
  plugins: [tanstackStartCookies()]
});
