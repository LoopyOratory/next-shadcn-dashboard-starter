import { getMigrations } from "better-auth/db/migration";
import Database from "better-sqlite3";
import path from "path";

const dbPath = path.resolve("./data/auth.db");
const db = new Database(dbPath);

console.log("DB path:", dbPath);

try {
  const { toSQL } = getMigrations({
    database: db,
    provider: "sqlite",
  });
  
  const migrationSql = toSQL();
  console.log("Running migration...");
  
  db.exec(migrationSql);
  console.log("Migration successful!");
  
  // Verify tables
  const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all();
  console.log("Tables:", tables.map((t: any) => t.name));
} catch (e: any) {
  console.error("Migration error:", e.message);
}

db.close();
