import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { IsNumber, IsString, Length } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity, ManyToOne, RelationId } from 'typeorm';
import { Restaurant } from './restaurant.entity';

@InputType('DishChoiceInputType', { isAbstract: true }) // for DTO
@ObjectType() // for GraphQL
export class DishChoice {
  @Field(type => String) // for GraphQL
  name: string;

  @Field(type => Int, { nullable: true }) // for GraphQL
  extra?: number;
}

@InputType('DishOptionInputType', { isAbstract: true }) // for DTO
@ObjectType() // for GraphQL
export class DishOption {
  @Field(type => String) // for GraphQL
  name: string;

  @Field(type => [DishChoice], { nullable: true }) // for GraphQL
  choices?: DishChoice[];

  @Field(type => Int, { nullable: true }) // for GraphQL
  extra?: number;
}

@InputType('DishInputType', { isAbstract: true }) // for DTO
@ObjectType() // for GraphQL
@Entity() // for TypeORM
export class Dish extends CoreEntity {
  @Field(type => String) // for GraphQL
  @Column() // for TypeORM
  @IsString()
  @Length(5)
  name: string;

  @Field(type => Int) // for GraphQL
  @Column() // for TypeORM
  @IsNumber()
  price: number;

  @Field(type => String, { nullable: true }) // for GraphQL
  @Column({ nullable: true }) // for TypeORM
  @IsString()
  photo: string;

  @Field(type => String) // for GraphQL
  @Column() // for TypeORM
  @IsString()
  @Length(5, 140)
  description: string;

  @Field(type => Restaurant) // for GraphQL
  @ManyToOne(
    type => Restaurant,
    restaurant => restaurant.menu,
    { onDelete: 'CASCADE' },
  ) // for TypeORM
  restaurant: Restaurant;

  @RelationId((dish: Dish) => dish.restaurant) // for TypeORM
  restaurantId: number;

  @Field(type => [DishOption], { nullable: true })
  @Column({ type: 'json', nullable: true })
  options?: DishOption[];
}
