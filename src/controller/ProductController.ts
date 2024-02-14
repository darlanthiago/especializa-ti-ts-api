import { Request, Response } from "express";
import { validate } from "class-validator";

import { Product } from "@entity/Product";
import AppDataSource from "@database/connection";

class ProductController {
  async index(request: Request, response: Response): Promise<Response> {
    const productRepository = AppDataSource.getRepository(Product);
    const products = await productRepository.find();

    return response.status(200).send({
      data: products,
    });
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { name, description, weight } = request.body;

    const productRepository = AppDataSource.getRepository(Product);

    const product = new Product();

    product.name = name;
    product.description = description;
    product.weight = weight;

    const errors = await validate(product);

    if (errors.length > 0) {
      return response.status(422).json({
        error: errors,
      });
    }

    const newProduct = await productRepository.save(product);

    return response.status(201).send({
      data: newProduct,
    });
  }

  async find(request: Request, response: Response): Promise<Response> {
    const id = request.params;

    const productRepository = AppDataSource.getRepository(Product);

    const product = await productRepository.findOneBy(id);

    if (!product) {
      return response.status(404).send({
        message: "Product not found",
      });
    }

    return response.status(201).send({
      data: product,
    });
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { name, description, weight } = request.body;
    const id = request.params;

    const productRepository = AppDataSource.getRepository(Product);

    const product = await productRepository.findOneBy(id);

    if (!product) {
      return response.status(404).send({
        message: "Product not found",
      });
    }

    product.name = name;
    product.description = description;
    product.weight = weight;

    const errors = await validate(product);

    if (errors.length > 0) {
      return response.status(422).json({
        error: errors,
      });
    }

    const newProduct = await productRepository.save(product);

    return response.status(200).send({
      data: newProduct,
    });
  }

  async destroy(request: Request, response: Response): Promise<Response> {
    const id = request.params;

    const productRepository = AppDataSource.getRepository(Product);

    try {
      const product = await productRepository.findOneBy(id);

      if (!product) {
        return response.status(404).send({
          message: "Product not found",
        });
      }

      await productRepository.delete(id);

      return response.status(204).send();
    } catch (error) {
      return response.status(400).json({ error });
    }
  }
}

export default new ProductController();
