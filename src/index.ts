import dotenv from "dotenv";
import express, { Request, Response } from "express";

dotenv.config();

const PORT = process.env.API_PORT || 3000;

const app = express();

app.get("/", (request: Request, response: Response) => {
  return response.send("SERVER UP");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
