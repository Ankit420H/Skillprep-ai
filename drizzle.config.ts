

/** @type { import("drizzle-kit").Config } */
import * as dotenv from 'dotenv';
dotenv.config({path: '.env.local'}); // Load environment variables from .env.local file
const DB_PATH = process.env.DATABASE_URL;


export default {
    schema: "./src/core/db/schema.ts",
    dialect: 'postgresql',
    dbCredentials: {
      url: DB_PATH,
    },
};
