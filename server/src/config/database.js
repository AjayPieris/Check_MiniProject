import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

function parseMysqlUrl(urlString) {
  try {
    const u = new URL(urlString);
    if (u.protocol !== "mysql:" && u.protocol !== "mysql2:") return null;
    return {
      host: u.hostname,
      port: u.port ? Number(u.port) : 3306,
      user: decodeURIComponent(u.username || ""),
      password: decodeURIComponent(u.password || ""),
      database: u.pathname?.replace(/^\//, "") || undefined,
    };
  } catch {
    return null;
  }
}

const mysqlUrl = process.env.MYSQL_URL || process.env.DATABASE_URL;
const fromUrl = mysqlUrl ? parseMysqlUrl(mysqlUrl) : null;

const connectionConfig = {
  host: fromUrl?.host || process.env.MYSQL_HOST || "127.0.0.1",
  port: fromUrl?.port || Number(process.env.MYSQL_PORT || 3306),
  user: fromUrl?.user || process.env.MYSQL_USER || "root",
  password: fromUrl?.password || process.env.MYSQL_PASSWORD || "",
  database: fromUrl?.database || process.env.MYSQL_DATABASE || "ceylonconnect",
  waitForConnections: true,
  connectionLimit: Number(process.env.MYSQL_POOL_SIZE || 10),
  queueLimit: 0,
  dateStrings: true,
};

const rawPool = mysql.createPool(connectionConfig);

// Keep compatibility with existing code that expects `pool.query(sql, params)`
// and reads `result.rows`.
const pool = {
  async query(sql, params = []) {
    const [rows] = await rawPool.query(sql, params);
    return {
      rows: Array.isArray(rows) ? rows : [],
      insertId: rows?.insertId,
      affectedRows: rows?.affectedRows,
    };
  },
};

// eslint-disable-next-line no-void
void (async () => {
  try {
    await rawPool.query("SELECT 1");
    console.log("✅ Connected to MySQL successfully!");
  } catch (err) {
    console.error("❌ MySQL connection error:", err?.message || err);
  }
})();

export default pool;
export { rawPool };
