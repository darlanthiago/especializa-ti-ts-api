import { Request, Response } from "express";
import { validate } from "class-validator";

import { ProductRepository } from "@repository/ProductRepository";
import { CreateProductDTO, UpdateProductDTO } from "@dto/product/product.dto";

class ProductController {
  constructor(private productRepository = new ProductRepository()) {}

  index = async (_: Request, response: Response): Promise<Response> => {
    const products = await this.productRepository.getAll();

    return response.status(200).send({
      data: products,
    });
  };

  create = async (request: Request, response: Response): Promise<Response> => {
    try {
      const { name, description, weight } = request.body;

      const createProductDto = new CreateProductDTO();
      createProductDto.name = name;
      createProductDto.description = description;
      createProductDto.weight = weight;

      const errors = await validate(createProductDto);

      if (errors.length > 0) {
        return response.status(402).json({
          errors,
        });
      }

      const newProduct = await this.productRepository.store(createProductDto);

      return response.status(201).send({
        data: newProduct,
      });
    } catch (error) {
      return response.status(400).send({
        error,
      });
    }
  };

  find = async (request: Request, response: Response): Promise<Response> => {
    const { id } = request.params;

    const product = await this.productRepository.findOne(id);

    if (!product) {
      return response.status(404).send({
        message: "Product not found",
      });
    }

    return response.status(201).json({
      data: product,
    });
  };

  update = async (request: Request, response: Response): Promise<Response> => {
    const { name, description, weight } = request.body;
    const { id } = request.params;

    const product = await this.productRepository.findOne(id);

    if (!product) {
      return response.status(404).send({
        message: "Product not found",
      });
    }

    const updateProductDto = new UpdateProductDTO();

    updateProductDto.id = id;
    updateProductDto.name = name;
    updateProductDto.description = description;
    updateProductDto.weight = weight;

    const errors = await validate(updateProductDto);

    if (errors.length > 0) {
      return response.status(422).json({
        error: errors,
      });
    }

    const newProduct = await this.productRepository.save(updateProductDto);

    return response.status(200).send({
      data: newProduct,
    });
  };

  destroy = async (request: Request, response: Response): Promise<Response> => {
    const { id } = request.params;

    try {
      const product = await this.productRepository.findOne(id);

      if (!product) {
        return response.status(404).send({
          message: "Product not found",
        });
      }

      await this.productRepository.delete(id);

      return response.status(204).send();
    } catch (error) {
      return response.status(400).json({ error });
    }
  };
}

export default new ProductController();
