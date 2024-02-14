import AppDataSource from "@database/connection";
import { CreateProductDTO, UpdateProductDTO } from "@dto/product/product.dto";
import { Product } from "@entity/Product";
import { DeleteResult, Repository } from "typeorm";

export class ProductRepository {
  constructor(
    private productRepository: Repository<
      Product
    > = AppDataSource.getRepository(Product)
  ) {}

  async getAll(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  async store(fields: CreateProductDTO): Promise<Product> {
    const product = new Product();
    product.name = fields.name;
    product.description = fields.description;
    product.weight = fields.weight;

    return await this.productRepository.save(product);
  }

  async findOne(id: string): Promise<Product | null> {
    return await this.productRepository.findOneBy({ id });
  }

  async delete(id: string): Promise<DeleteResult> {
    return await this.productRepository.delete(id);
  }

  async save(product: UpdateProductDTO): Promise<Product> {
    return await this.productRepository.save(product);
  }
}
