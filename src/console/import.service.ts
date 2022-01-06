import { Injectable } from '@nestjs/common';
import { ConsoleService } from 'nestjs-console';
import * as fs from 'fs';
import { getConnection } from 'typeorm';
import { Category } from '../module/category/category.entity';
import { Product } from '../module/product/product.entity';

@Injectable()
export class ImportService {
  constructor(private readonly consoleService: ConsoleService) {
    // get the root cli
    const cli = this.consoleService.getCli();

    // create a single command (See [npm commander arguments/options for more details])
    this.consoleService.createCommand(
      {
        command: 'import',
        description: 'description',
      },
      this.importProduct,
      cli, // attach the command to the cli
    );
  }

  importProduct = async (): Promise<void | Promise<void>> => {
    console.log(`Import Product Start`);
    const data = JSON.parse(
      fs.readFileSync('electronic-catalog.json').toString(),
    );

    let products = data.products;
    const categories = products
      .map((p) => p.category)
      .filter((c, i, a) => a.indexOf(c) === i)
      .map((p) => {
        return { name: p };
      });

    const connection = getConnection();
    await connection.createQueryBuilder().delete().from(Product).execute();
    await connection.createQueryBuilder().delete().from(Category).execute();
    const categoryRepository = connection.getRepository('category');
    const productRepository = connection.getRepository('product');

    const storedCategories = await categoryRepository.save(categories);
    const categoryMapping = storedCategories.reduce((acc, cat) => {
      const { id, name } = cat;
      return Object.assign({ [name]: id }, acc);
    }, {});

    products = products.map((product) => {
      product.category = categoryMapping[product.category];
      return product;
    });

    await productRepository.save([...products]);
  };
}
