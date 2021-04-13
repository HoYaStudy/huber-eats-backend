import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, RelationId } from 'typeorm';

@InputType('PaymentInputType', { isAbstract: true }) // for GraphQL
@ObjectType() // for GraphQL
@Entity() // for TypeORM
export class Payment extends CoreEntity {
  @Field(type => String) // for GraphQL
  @Column() // for TypeORM
  transactionId: string;

  @Field(type => User) // for GraphQL
  @ManyToOne(
    type => User,
    user => user.payments,
  ) // for TypeORM
  user: User;

  @RelationId((order: Payment) => order.user) // for TypeORM
  userId: number;

  @Field(type => Restaurant) // for GraphQL
  @ManyToOne(type => Restaurant) // for TypeORM
  restaurant: Restaurant;

  @Field(type => Int) // for GraphQL
  @RelationId((payment: Payment) => payment.restaurant) // for TypeORM
  restaurantId: number;
}
