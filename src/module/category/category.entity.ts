import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Product } from '../product/product.entity';
import { Exclude } from 'class-transformer';
@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Product, (product) => product.category)
  @JoinColumn()
  products: Product[];

  @Column()
  name: string;

  @UpdateDateColumn({ name: 'updated_at' })
  @Exclude()
  updatedAt: Date;
  @Exclude()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
