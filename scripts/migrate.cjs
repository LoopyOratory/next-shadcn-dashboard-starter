const { getMigrations } = require("better-auth/db/migration");
const Database = require("better-sqlite3");
const path = require("path");

const dbPath = path.resolve("./data/auth.db");
const db = new Database(dbPath);

async function run() {
  console.log("DB path:", dbPath);

  try {
    const { toBeCreated, compileMigrations, runMigrations } = await getMigrations({
      database: db,
    });

    console.log("Tables to create:", toBeCreated.map((t) => t.table));

    await runMigrations();
    console.log("Migration successful!");

    const tables = db
      .prepare("SELECT name FROM sqlite_master WHERE type='table'")
      .all();
    console.log("Tables:", tables.map((t) => t.name));
  } catch (e) {
    console.error("Error:", e.message);
    console.error(e.stack);
  }

  db.close();
}

run();
