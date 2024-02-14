import "module-alias/register";
import "dotenv/config";
import "@database/connection";

import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";

import { routes } from "routes";

const PORT = process.env.API_PORT || 3000;

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use(routes);

app.get("/", (_: Request, response: Response) => {
  return response.json({ msg: "SERVER UP" });
});

app.get("*", (_: Request, response: Response) => {
  return response.status(404).send({ msg: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
