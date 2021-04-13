import { InternalServerErrorException } from '@nestjs/common';
import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany } from 'typeorm';
import { IsBoolean, IsEmail, IsEnum, IsString } from 'class-validator';
import * as bcrypt from 'bcrypt';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
import { Order } from 'src/orders/entities/order.entity';
import { Payment } from 'src/payments/entities/payment.entity';

export enum UserRole {
  Client = 'Client',
  Owner = 'Owner',
  Delivery = 'Delivery',
}

registerEnumType(UserRole, { name: 'UserRole' });

@InputType('UserInputType', { isAbstract: true }) // for DTO
@ObjectType() // for GraphQL
@Entity() // for TypeORM
export class User extends CoreEntity {
  @Field(type => String) // for GraphQL
  @Column({ unique: true }) // for TypeORM
  @IsEmail()
  email: string;

  @Field(type => String) // for GraphQL
  @Column({ select: false }) // for TypeORM
  @IsString()
  password: string;

  @Field(type => UserRole) // for GraphQL
  @Column({ type: 'enum', enum: UserRole }) // for TypeORM
  @IsEnum(UserRole)
  role: UserRole;

  @Field(type => Boolean) //for GraphQL
  @Column({ default: false }) //for TypeORM
  @IsBoolean()
  verified: boolean;

  @Field(type => [Restaurant]) //for GraphQL
  @OneToMany(
    type => Restaurant,
    restaurant => restaurant.owner,
  ) // for TypeORM
  restaurants: Restaurant[];

  @Field(type => [Payment]) //for GraphQL
  @OneToMany(
    type => Payment,
    payment => payment.user,
    { eager: true },
  ) // for TypeORM
  payments: Payment[];

  @Field(type => [Order]) //for GraphQL
  @OneToMany(
    type => Order,
    order => order.customer,
  ) // for TypeORM
  orders: Order[];

  @Field(type => [Order]) //for GraphQL
  @OneToMany(
    type => Order,
    order => order.driver,
  ) // for TypeORM
  rides: Order[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    if (this.password) {
      try {
        this.password = await bcrypt.hash(this.password, 10);
      } catch (e) {
        console.log(e);
        throw new InternalServerErrorException();
      }
    }
  }

  async checkPassword(password: string): Promise<boolean> {
    try {
      return await bcrypt.compare(password, this.password);
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }
}
