import { User } from '@elektra-nx/api/user/models';
import { UpdateUserDto } from '@elektra-nx/api/shared/dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(private em: EntityManager, @InjectRepository(User) private user: Repository<User>) {}

  public async find(filter: Record<string, unknown>): Promise<User[]> {
    const { slug, name } = filter;

    const qb = this.user.createQueryBuilder('u');

    if (slug) {
      qb.where('u.slug = :slug', { slug });
      return qb.getMany();
    }

    if (name) {
      qb.andWhere('LOWER(u.name) like :name', { name: `%${name}%` });
    }

    return qb.getMany();
  }

  public async findOne(id: string, throws?: boolean): Promise<User | undefined>;
  public async findOne(id: string, throws = true): Promise<User> {
    const found = await this.user.findOneBy({ id });

    if (!found && throws) {
      throw new NotFoundException('User not found.');
    }

    return found;
  }

  public async updateOne(user: User, dto: UpdateUserDto): Promise<User> {
    return this.user.save({ ...user, ...dto });
  }

  public async update(ids: string[], dto: UpdateUserDto) {
    return this.user.update(ids, dto);
  }

  // public async create(dto: CreateUserDto): Promise<User> {
  //   const { id } = await this.createUserId();
  //   return this.user.save({ ...dto, id, ownerId: id });
  // }

  public async delete(user: User): Promise<{ id: string }> {
    const { id } = user;
    await this.user.remove(user);
    return { id };
  }
}
