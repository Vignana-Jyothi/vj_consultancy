import pool from "./src/config/db.js";

async function main() {
  try {
    const res = await pool.query(`SELECT * FROM projects LIMIT 5;`);
    console.log("Projects sample rows:");
    console.log(JSON.stringify(res.rows, null, 2));
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await pool.end();
  }
}

main();
