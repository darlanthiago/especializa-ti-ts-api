import "dotenv/config";
import "@database/connection";

import express, { Request, Response } from "express";
import bodyParser from "body-parser";

import ProductController from "@controller/ProductController";

const PORT = process.env.API_PORT || 3000;

const app = express();

app.use(bodyParser.json());

app.get("/", (request: Request, response: Response) => {
  return response.json({ msg: "SERVER UP" });
});

app.get("/products", ProductController.index);
app.post("/products", ProductController.create);
app.get("/products/:id", ProductController.find);
app.put("/products/:id", ProductController.update);
app.delete("/products/:id", ProductController.destroy);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
