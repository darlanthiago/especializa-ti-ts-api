import "reflect-metadata";
import { DataSource } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

import { Product } from "@entity/Product";

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
  synchronize: true,
  logging: true,
  entities: [Product],
  subscribers: [],
  migrations: [],
  namingStrategy: new SnakeNamingStrategy(),
});

AppDataSource.initialize()
  .then(() => console.log("Connected to database"))
  .catch((error) => console.log(error));

export default AppDataSource;
