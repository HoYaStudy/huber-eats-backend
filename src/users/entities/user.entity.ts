import { InternalServerErrorException } from '@nestjs/common';
import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { BeforeInsert, BeforeUpdate, Column, Entity } from 'typeorm';
import { IsEmail, IsEnum } from 'class-validator';
import * as bcrypt from 'bcrypt';
import { CoreEntity } from 'src/common/entities/core.entity';

enum UserRole {
  Client,
  Owner,
  Delivery,
}

registerEnumType(UserRole, { name: 'UserRole' });

@InputType('UserInputType', { isAbstract: true }) // for DTO
@ObjectType() // for GraphQL
@Entity() // for TypeORM
export class User extends CoreEntity {
  @Field(type => String) // for GraphQL
  @Column() // for TypeORM
  @IsEmail()
  email: string;

  @Field(type => String) // for GraphQL
  @Column() // for TypeORM
  password: string;

  @Field(type => UserRole) // for GraphQL
  @Column({ type: 'enum', enum: UserRole }) // for TypeORM
  @IsEnum(UserRole)
  role: UserRole;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    try {
      this.password = await bcrypt.hash(this.password, 10);
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
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
