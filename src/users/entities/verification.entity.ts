import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { v4 as uuidv4 } from 'uuid';
import { CoreEntity } from 'src/common/entities/core.entity';
import { BeforeInsert, Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { User } from './user.entity';

@InputType({ isAbstract: true }) // for DTO
@ObjectType() // for GraphQL
@Entity() // for TypeORM
export class Verification extends CoreEntity {
  @Field(type => String) // for GraphQL
  @Column() // for TypeORM
  code: string;

  @OneToOne(type => User, { onDelete: 'CASCADE' }) // for TypeORM
  @JoinColumn() // for TypeORM
  user: User;

  @BeforeInsert()
  createCode(): void {
    this.code = uuidv4();
  }
}
