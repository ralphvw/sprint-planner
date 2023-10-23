import pgPromise from "pg-promise";
import dotenv from "dotenv";

dotenv.config();

const pgp = pgPromise();

const db = pgp(process.env.SPRINT_PLANNER_DB_URL || "");

export { db };
