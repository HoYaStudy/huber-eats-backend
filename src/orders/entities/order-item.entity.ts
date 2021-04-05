import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Dish } from 'src/restaurants/entities/dish.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@InputType('OrderItemOptionInputType', { isAbstract: true }) // for DTO
@ObjectType() // for GraphQL
export class OrderItemOption {
  @Field(type => String) // for GraphQL
  name: string;

  @Field(type => String, { nullable: true }) // for GraphQL
  choice: string;
}

@InputType('OrderItemInputType', { isAbstract: true }) // for DTO
@ObjectType() // for GraphQL
@Entity() // for TypeORM
export class OrderItem extends CoreEntity {
  @Field(type => Dish)
  @ManyToOne(type => Dish, { nullable: true, onDelete: 'CASCADE' }) // for TypeORM
  dish: Dish;

  @Field(type => [OrderItemOption], { nullable: true }) // for GraphQL
  @Column({ type: 'json', nullable: true }) // for TypeORM
  options?: OrderItemOption[];
}
