import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

pool.query("SELECT NOW()")
  .then((res) => {
    console.log("Database Connected Successfully");
    console.log(res.rows[0]);
  })
  .catch((err) => {
    console.log("Database Connection Error");
    console.log(err);
  });

export default pool;