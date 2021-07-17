import "reflect-metadata";
import { createConnection, getRepository } from "typeorm";
import { initialSetup } from "./InitialConfig";

export const connection = createConnection({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "",
  database: "manager_db",
  synchronize: true,
  logging: false,
  entities: ["src/entity/**/*.ts"],
})
  .then(initialSetup)
  .then(() => console.log("DB connected"))
  .catch((err) => console.error(err));
