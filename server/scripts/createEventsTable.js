import pool from "../src/config/database.js";

const sql = `
  CREATE TABLE IF NOT EXISTS events (
    event_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    location VARCHAR(255) NOT NULL,
    event_date DATE NOT NULL,
    event_time TIME NULL,
    image_url VARCHAR(500),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )
`;

try {
  await pool.query(sql);
  console.log("✅ events table created (or already exists).");
} catch (err) {
  console.error("❌ Failed to create events table:", err.message);
} finally {
  process.exit(0);
}
