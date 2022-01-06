import { Length } from 'class-validator';

export class UpdateProductDto {
  @Length(3, 200)
  readonly name: string;
  readonly price: number;
  readonly quantity: number;
}
