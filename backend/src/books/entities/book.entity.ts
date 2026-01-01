import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';

@Entity('books')
@ObjectType()
export class Book {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column()
  @Field()
  name: string;

  @Column('text')
  @Field()
  description: string;

  @CreateDateColumn()
  @Field({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn()
  @Field({ name: 'updated_at' })
  updatedAt: Date;
}
