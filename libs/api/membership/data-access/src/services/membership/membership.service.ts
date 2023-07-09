import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { CreateMembershipDto, UpdateMembershipDto } from '@elektra-nx/api/shared/dto';
import { Membership } from '@elektra-nx/api/membership/models';
import { User } from '@elektra-nx/api/user/models';
import { AccessRole } from '@elektra-nx/shared/models';

@Injectable()
export class MembershipService {
  constructor(
    @InjectRepository(Membership) private membershipRepo: Repository<Membership>,
    private em: EntityManager,
  ) {}

  public async findUserMembership(user: User): Promise<Membership | undefined> {
    return this.membershipRepo.findOneBy({ userId: user.id });
  }

  public async create(userId: string, dto: CreateMembershipDto): Promise<Membership> {
    return this.membershipRepo.save({ ...dto, userId, ownerId: userId });
  }

  public async find(filter: Record<string, unknown> = {}): Promise<Membership[]> {
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

  public async findOne(id: string, throws?: boolean): Promise<Membership | undefined>;
  public async findOne(id: string, throws = true): Promise<Membership> {
    const found = await this.membershipRepo.findOneBy({ id });

    if (!found && throws) {
      throw new NotFoundException('Membership not found.');
    }

    return found;
  }

  public async findOneFromUserRelation(user: User, throws = false): Promise<Membership | undefined> {
    const found = await this.membershipRepo.findOneBy({ userId: user.id });

    if (!found && throws) {
      throw new NotFoundException('Membership not found.');
    }

    return found;
  }

  public async isMember(user: User): Promise<AccessRole | null> {
    return user.roles.includes(AccessRole.MEMBER) ? AccessRole.MEMBER : null;
  }

  public async updateOne(membership: Membership, dto: UpdateMembershipDto): Promise<Membership> {
    return this.em.transaction(async (em) => {
      const _membership = await em.save(Membership, { ...membership, ...dto });
      return _membership;
    });
  }

  public async delete(id: string): Promise<{ id: string }> {
    const membership = await this.findOne(id);
    const _id = membership.id;
    await this.membershipRepo.remove(membership);
    return { id: _id };
  }
}
