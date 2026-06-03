import { betterAuth } from 'better-auth';
import { tanstackStartCookies } from 'better-auth/tanstack-start';
import { Database } from 'bun:sqlite';

const dbPath = process.env.AUTH_DB_PATH || 'data/auth.db';

export const auth = betterAuth({
  database: new Database(dbPath),
  emailAndPassword: { enabled: true },
  plugins: [tanstackStartCookies()]
});
