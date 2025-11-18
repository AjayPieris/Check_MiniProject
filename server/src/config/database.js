const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

pool.on("connect", () => {
  console.log("🔗 Attempting to connect to database...");
});

pool.on("error", (err) => {
  console.error("❌ Database connection error:", err.message);
});

pool
  .connect()
  .then(() => console.log("✅ Connected to Neon PostgreSQL successfully!"))

module.exports = pool;
