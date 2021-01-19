import { Field, ObjectType } from '@nestjs/graphql';
import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
export class CoreEntity {
  @PrimaryGeneratedColumn() // for GraphQL
  @Field(type => Number) // for TypeORM
  id: number;

  @CreateDateColumn() // for GraphQL
  @Field(type => Date) // for TypeORM
  createdAt: Date;

  @UpdateDateColumn() // for GraphQL
  @Field(type => Date) // for TypeORM
  updatedAt: Date;
}
