import { Injectable } from '@nestjs/common';
import { Product } from './product.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateProductDto } from './dto/update-product-dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  all(): Promise<Product[]> {
    return this.productRepository.find({ relations: ['category'] });
  }

  get(id: number): Promise<Product> {
    return this.productRepository.findOne({ where: { id } });
  }

  create(data: UpdateProductDto): Promise<Product> {
    return this.productRepository.save(data);
  }

  update(id: number, data: UpdateProductDto): Promise<UpdateResult> {
    return this.productRepository.update(id, data);
  }

  remove(id: number): Promise<DeleteResult> {
    return this.productRepository.delete(id);
  }
}
