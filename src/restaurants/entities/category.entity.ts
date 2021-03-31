import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { isString, IsString, Length } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Restaurant } from './restaurant.entity';

@InputType('CategoryInputType', { isAbstract: true }) // for DTO
@ObjectType() // for GraphQL
@Entity() // for TypeORM
export class Category extends CoreEntity {
  @Field(type => String) // for GraphQL
  @Column({ unique: true }) // for TypeORM
  @IsString()
  @Length(5)
  name: string;

  @Field(type => String, { nullable: true }) // for GraphQL
  @Column({ nullable: true }) // for TypeORM
  @IsString()
  coverImage: string;

  @Field(type => String) // for GraphQL
  @Column({ unique: true }) // for TypeORM
  @IsString()
  slug: string;

  @Field(type => [Restaurant], { nullable: true }) // for GraphQL
  @OneToMany(
    type => Restaurant,
    restaurant => restaurant.category,
  ) // for TypeORM
  restaurants: Restaurant[];
}
