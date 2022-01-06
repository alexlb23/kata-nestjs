import { IsNotEmpty, Length } from 'class-validator';

export class CreateProductDto {
  @Length(3, 200)
  readonly name: string;
  @IsNotEmpty()
  readonly sku: string;
  readonly price: number;
  readonly quantity: number;
}
