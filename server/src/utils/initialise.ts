import { ConnectionOptions } from "typeorm";

export const initialise = async (): Promise<ConnectionOptions> => {
  if (!process.env.APP_ENV) {
    await require("dotenv").config();
  }

  return {
    type: "mysql",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: process.env.APP_ENV === "dev",
    entities: ["src/entities/**/*.ts"],
    migrations: ["src/migration/**/*.ts"],
    subscribers: ["src/subscriber/**/*.ts"],
  };
};
