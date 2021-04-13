import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, OneToMany, RelationId } from 'typeorm';
import { IsString, Length } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { User } from 'src/users/entities/user.entity';
import { Category } from './category.entity';
import { Dish } from './dish.entity';
import { Order } from 'src/orders/entities/order.entity';

@InputType('RestaurantInputType', { isAbstract: true }) // for DTO
@ObjectType() // for GraphQL
@Entity() // for TypeORM
export class Restaurant extends CoreEntity {
  @Field(type => String) // for GraphQL
  @Column() // for TypeORM
  @IsString()
  @Length(5)
  name: string;

  @Field(type => String)
  @Column()
  @IsString()
  coverImg: string;

  @Field(type => String) // for GraphQL
  @Column() // for TypeORM
  @IsString()
  address: string;

  @Field(type => Category, { nullable: true }) // for GraphQL
  @ManyToOne(
    type => Category,
    category => category.restaurants,
    { nullable: true, onDelete: 'SET NULL' },
  ) // for TypeORM
  category: Category;

  @Field(type => User) // for GraphQL
  @ManyToOne(
    type => User,
    user => user.restaurants,
    { onDelete: 'CASCADE' },
  ) // for TypeORM
  owner: User;

  @Field(type => [Order]) // for GraphQL
  @ManyToOne(
    type => Order,
    order => order.restaurant,
  ) // for TypeORM
  orders: Order[];

  @RelationId((restaurant: Restaurant) => restaurant.owner) // for TypeORM
  ownerId: number;

  @Field(type => [Dish]) // for GraphQL
  @OneToMany(
    type => Dish,
    dish => dish.restaurant,
  ) // for TypeORM
  menu: Dish[];

  @Field(type => Boolean) // for GraphQL
  @Column({ default: false }) // for TypeORM
  isPromoted: boolean;

  @Field(type => Date, { nullable: true }) // for GraphQL
  @Column({ nullable: true }) // for TypeORM
  promotedUntil: Date;
}
