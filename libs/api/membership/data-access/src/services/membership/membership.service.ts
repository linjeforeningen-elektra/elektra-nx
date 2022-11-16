import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMembershipDto, UpdateMembershipDto } from '@elektra-nx/api/shared/dto';
import { MembershipEntity } from '@elektra-nx/api/membership/models';
import { UserEntity } from '@elektra-nx/api/user/models';
import { AccessRole } from '@elektra-nx/shared/models';

@Injectable()
export class MembershipService {
  constructor(@InjectRepository(MembershipEntity) private membershipRepo: Repository<MembershipEntity>) {}

  public async findUserMembership(user: UserEntity): Promise<MembershipEntity | undefined> {
    return this.membershipRepo.findOneBy({ userId: user.id });
  }

  public async create(userId: string, dto: CreateMembershipDto): Promise<MembershipEntity> {
    return this.membershipRepo.save({ ...dto, userId, ownerId: userId });
  }

  public async find(filter: Record<string, unknown> = {}): Promise<MembershipEntity[]> {
    const { address, confirmed, graduation, immatriculation, memberyear, phone, specialisation } = filter;

    const qb = this.membershipRepo.createQueryBuilder('m');

    // if (address) {
    //   qb.andWhere('LOWER(m.address) LIKE :address', { address: `%${address}%` });
    // }

    // if (confirmed) {
    //   qb.andWhere('m.confirmed = :confirmed', { confirmed });
    // }

    // if (phone) {
    //   qb.andWhere('m.phone LIKE :phone', { phone: `%${phone}%` });
    // }

    // if (specialisation) {
    //   qb.andWhere('m.specialisation = ANY(...:specialization)', { specialisation });
    // }

    // if (graduation) {
    //   if (graduation.after) {
    //     qb.andWhere('m.graduation > :after', { after: graduation.after });
    //   }

    //   if (graduation.before) {
    //     qb.andWhere('m.graduation < :before', { before: graduation.before });
    //   }
    // }

    // if (immatriculation) {
    //   if (immatriculation.after) {
    //     qb.andWhere('m.immatriculation > :after', { after: immatriculation.after });
    //   }

    //   if (immatriculation.before) {
    //     qb.andWhere('m.immatriculation < :before', { before: immatriculation.before });
    //   }
    // }

    // if (memberyear) {
    //   if (memberyear.after) {
    //     qb.andWhere('m.memberyear > :after', { after: memberyear.after });
    //   }

    //   if (memberyear.before) {
    //     qb.andWhere('m.memberyear < :before', { before: memberyear.before });
    //   }
    // }

    return qb.getMany();
  }

  public async findOne(id: string, throws?: boolean): Promise<MembershipEntity | undefined>;
  public async findOne(id: string, throws = true): Promise<MembershipEntity> {
    const found = await this.membershipRepo.findOneBy({ id });

    if (!found && throws) {
      throw new NotFoundException('Membership not found.');
    }

    return found;
  }

  public async findOneFromUserRelation(user: UserEntity, throws = false): Promise<MembershipEntity | undefined> {
    const found = await this.membershipRepo.findOneBy({ userId: user.id });

    if (!found && throws) {
      throw new NotFoundException('Membership not found.');
    }

    return found;
  }

  public async isMember(user: UserEntity): Promise<AccessRole | null> {
    const membership = await this.findOneFromUserRelation(user);
    if (!membership || !membership?.confirmed) return null;
    return AccessRole.MEMBER;
  }

  public async updateOne(membership: MembershipEntity, dto: UpdateMembershipDto) {
    return this.membershipRepo.save({ ...membership, ...dto });
  }

  public async delete(id: string): Promise<{ id: string }> {
    const membership = await this.findOne(id);
    const _id = membership.id;
    await this.membershipRepo.remove(membership);
    return { id: _id };
  }
}
