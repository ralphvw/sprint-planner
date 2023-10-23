import pgPromise from "pg-promise";

const pgp = pgPromise();

const db = pgp(process.env.SPRINT_PLANNER_DB_URL || "");

export { db };
