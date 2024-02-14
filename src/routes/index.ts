import { Router } from "express";
import ProductController from "@controller/ProductController";

const routes = Router();

routes.get("/products", ProductController.index);
routes.post("/products", ProductController.create);
routes.get("/products/:id", ProductController.find);
routes.put("/products/:id", ProductController.update);
routes.delete("/products/:id", ProductController.destroy);

export { routes };
