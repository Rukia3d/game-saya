import { Database } from "sqlite";

const migrateDB = async (db: Database) => {
  await db.migrate({ migrationsPath: "storage/migrations" });
};

export default migrateDB;
