import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { CoreEntity } from '@elektra-nx/api/database/utils';
import { User } from '@elektra-nx/api/user/models';
import { MembershipModel, Specialisation } from '@elektra-nx/shared/models';
import { Field, ObjectType } from '@nestjs/graphql';

@Entity('membership')
@ObjectType()
export class Membership extends CoreEntity implements MembershipModel {
  @Column()
  @Field(() => String)
  phone: string;

  @Column()
  @Field(() => String)
  address: string;

  @Column()
  @Field(() => String)
  postal_code: string;

  @Column({ nullable: true })
  @Field(() => String)
  gender?: string;

  @Column({ nullable: true })
  @Field(() => Date, { nullable: true })
  immatriculation?: Date;

  @Column()
  @Field(() => Date)
  memberyear: Date;

  @Column({ nullable: true })
  @Field(() => Date, { nullable: true })
  graduation?: Date;

  @Column({ default: false })
  @Field(() => Boolean)
  confirmed: boolean;

  @Column({ type: 'enum', enum: Specialisation, enumName: 'Specialization', nullable: true })
  @Field(() => String)
  specialisation?: Specialisation;

  @Column()
  userId: string;

  @OneToOne(() => User, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;
}
