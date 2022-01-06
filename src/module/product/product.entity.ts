import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Category } from '../category/category.entity';
import { Exclude, Transform } from 'class-transformer';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Category, (category) => category.products, {
    onDelete: 'CASCADE',
  })
  @JoinColumn([{ name: 'category_id', referencedColumnName: 'id' }])
  @Transform(({ value }) => value.name)
  category: Category;

  @Column()
  name: string;

  @Column()
  sku: string;

  @Column({ type: 'numeric', precision: 6, scale: 2 })
  price: number;

  @Column({ type: 'integer' })
  quantity: number;

  @UpdateDateColumn({ name: 'updated_at' })
  @Exclude()
  updatedAt: Date;
  @Exclude()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
