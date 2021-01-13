import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsOptional, IsString, Length } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@InputType({ isAbstract: true }) // for DTO
@ObjectType() // for GraphQL
@Entity() // for TypeORM
export class Restaurant {
  @Field(type => Number) // for GraphQL
  @PrimaryGeneratedColumn() // for TypeORM
  id: number;

  @Field(type => String) // for GraphQL
  @Column() // for TypeORM
  @IsString()
  @Length(5)
  name: string;

  @Field(type => Boolean, { nullable: true }) // for GraphQL
  @Column({ default: false }) // for TypeORM
  @IsOptional()
  @IsBoolean()
  isVegan?: boolean;

  @Field(type => String, { defaultValue: 'KangNam' }) // for GraphQL
  @Column() // for TypeORM
  @IsString()
  address: string;
}
