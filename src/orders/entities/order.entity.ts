import {
  Field,
  Float,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { IsEnum, IsNumber } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  RelationId,
} from 'typeorm';
import { OrderItem } from './order-item.entity';

export enum OrderStatus {
  Pending = 'Pending',
  Cooking = 'Cooking',
  Cooked = 'Cooked',
  PickedUp = 'PickedUp',
  Delivered = 'Delivered',
}

registerEnumType(OrderStatus, { name: 'OrderStatus' });

@InputType('OrderInputType', { isAbstract: true }) // for DTO
@ObjectType() // for GraphQL
@Entity() // for TypeORM
export class Order extends CoreEntity {
  @Field(type => User, { nullable: true }) // for GraphQL
  @ManyToOne(
    type => User,
    user => user.orders,
    { onDelete: 'SET NULL', nullable: true, eager: true },
  ) // for TypeORM
  customer?: User;

  @RelationId((order: Order) => order.customer) // for TypeORM
  customerId: number;

  @Field(type => User, { nullable: true }) // for GraphQL
  @ManyToOne(
    type => User,
    user => user.rides,
    { onDelete: 'SET NULL', nullable: true, eager: true },
  ) // for TypeORM
  driver?: User;

  @RelationId((order: Order) => order.driver) // for TypeORM
  driverId: number;

  @Field(type => Restaurant, { nullable: true }) // for GraphQL
  @ManyToOne(
    type => Restaurant,
    restaurant => restaurant.orders,
    { onDelete: 'SET NULL', nullable: true, eager: true },
  ) // for TypeORM
  restaurant?: Restaurant;

  @Field(type => [OrderItem]) // for GraphQL
  @ManyToMany(type => OrderItem, { eager: true }) // for TypeORM
  @JoinTable() // for TypeORM
  items: OrderItem[];

  @Field(type => Float, { nullable: true }) // for GraphQL
  @Column({ nullable: true }) // for TypeORM
  @IsNumber()
  total?: number;

  @Field(type => OrderStatus) // for GraphQL
  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.Pending }) // for TypeORM
  @IsEnum(OrderStatus)
  status: OrderStatus;
}
