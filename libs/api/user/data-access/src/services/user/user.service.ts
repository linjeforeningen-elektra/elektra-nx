import { User } from '@elektra-nx/api/user/models';
import { AddManyUserRoleDto, UpdateUserDto } from '@elektra-nx/api/shared/dto';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { FindUsersFilterDto } from '@elektra-nx/api/user/utils';
import { orderByQuery, paginateQuery } from '@elektra-nx/api/database/utils';
import { AccessRole } from '@elektra-nx/shared/models';

@Injectable()
export class UserService {
  constructor(private em: EntityManager, @InjectRepository(User) private user: Repository<User>) {}

  public async find(filter: FindUsersFilterDto): Promise<User[]> {
    const { slug, name, roles, pagination, orderBy, _roles } = filter;

    const qb = this.user.createQueryBuilder('u');

    if (slug) {
      qb.where('u.slug = :slug', { slug });
      return qb.getMany();
    }

    if (name) {
      qb.andWhere('LOWER(u.name) like :name', { name: `%${name}%` });
    }

    if (roles || _roles) {
      if (roles && !_roles) qb.andWhere('u.roles @> :roles', { roles });
      else if (_roles && !roles) qb.andWhere('NOT u.roles @> :_roles', { _roles });
      else throw new BadRequestException('Only provide roles or _roles');
    }

    if (pagination) {
      paginateQuery(qb, pagination);
    }

    if (orderBy) {
      orderByQuery(qb, orderBy);
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

  private uniqueRoles(...roles: AccessRole[]) {
    return roles.filter((role, index) => roles.indexOf(role) === index);
  }

  public async addOneRole(user: User, role: AccessRole) {
    const roles = this.uniqueRoles(...user.roles, role);
    return this.user.save({ ...user, roles });
  }

  public async removeOneRole(user: User, role: AccessRole) {
    const roles = this.uniqueRoles(...user.roles.filter((r) => r !== role));
    return this.user.save({ ...user, roles });
  }

  public async addManyRoles(dto: AddManyUserRoleDto) {}
}
