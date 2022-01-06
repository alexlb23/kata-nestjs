import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product-dto';
import { UpdateProductDto } from './dto/update-product-dto';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller('product')
@UseInterceptors(ClassSerializerInterceptor)
export class ProductController {
  constructor(private readonly productsService: ProductService) {}

  @Get()
  index(): Promise<Product[]> {
    return this.productsService.all();
  }

  @Post()
  create(@Body() dto: CreateProductDto) {
    return this.productsService.create(dto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const product = await this.productsService.get(+id);

    if (!product) {
      throw new NotFoundException();
    }
    return this.productsService.get(+id);
  }

  @Put(':id')
  @HttpCode(204)
  async update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    const result: UpdateResult = await this.productsService.update(+id, dto);
    if (result.affected === 0) {
      throw new NotFoundException();
    }
    return;
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    const result: DeleteResult = await this.productsService.remove(+id);
    if (result.affected === 0) {
      throw new NotFoundException();
    }
    return;
  }
}
