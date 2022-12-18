import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { MembershipEntity, User } from '../../entities';
import { RepositoryMock } from '../../__mocks__/repository-mock';
import { MembershipService } from './membership.service';
import { mocked } from 'jest-mock';
import { MembershipFindDto, UpdateMembershipDto } from '../../dto';
import { MembershipDto, UserDto } from './__mocks__/dto';
import { NotFoundException } from '@nestjs/common';
import { QueryBuilderMock } from '../../__mocks__/query-builder-mock';
import { Specialisation } from '@elektra-nx/shared/models';

describe('MembershipService', () => {
  let service: MembershipService;
  let membershipRepo: Repository<MembershipEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MembershipService,
        {
          provide: getRepositoryToken(MembershipEntity),
          useValue: RepositoryMock(),
        },
      ],
    }).compile();

    membershipRepo = module.get(getRepositoryToken(MembershipEntity));
    service = module.get<MembershipService>(MembershipService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findUserMembership()', () => {
    it('should call findOneBy', async () => {
      const user = { id: '1' };
      await service.findUserMembership(user as unknown as User);
      expect(membershipRepo.findOneBy).toHaveBeenCalledWith({ userId: user.id });
    });
  });

  describe('create()', () => {
    it('should call save()', async () => {
      const user = { ...UserDto, id: '1', ownerId: '1' };
      const dto = MembershipDto;

      await service.create(user, dto);

      expect(membershipRepo.save).toHaveBeenCalledWith({ ...dto, user });
    });
  });

  describe('find()', () => {
    let qb: SelectQueryBuilder<any>;

    beforeEach(() => {
      qb = QueryBuilderMock() as unknown as SelectQueryBuilder<any>;
      mocked(membershipRepo).createQueryBuilder.mockReturnValueOnce(qb);
    });

    it('should filter address', async () => {
      const filter: MembershipFindDto = { address: 'a' };
      await service.find(filter);
      expect(qb.andWhere).toHaveBeenCalledWith(expect.stringContaining('address'), {
        address: expect.stringContaining(filter.address),
      });
    });

    it('should filter confirmed', async () => {
      const filter: MembershipFindDto = { confirmed: true };
      await service.find(filter);
      expect(qb.andWhere).toHaveBeenCalledWith(expect.stringContaining('confirmed'), { confirmed: filter.confirmed });
    });

    it('should filter phone', async () => {
      const filter: MembershipFindDto = { phone: '123' };
      await service.find(filter);
      expect(qb.andWhere).toHaveBeenCalledWith(expect.stringContaining('phone'), {
        phone: expect.stringContaining(filter.phone),
      });
    });

    it('should filter specialization', async () => {
      const filter: MembershipFindDto = { specialisation: [Specialisation.POWER] };
      await service.find(filter);
      expect(qb.andWhere).toHaveBeenCalledWith(expect.stringContaining('specialisation'), {
        specialisation: filter.specialisation,
      });
    });
  });

  describe('findOne()', () => {
    it('should throw', async () => {
      const id = '123';
      mocked(membershipRepo).findOneBy.mockResolvedValueOnce(undefined);
      await expect(service.findOne(id)).rejects.toBeInstanceOf(NotFoundException);
    });

    it('should not throw', async () => {
      const id = '123';
      mocked(membershipRepo).findOneBy.mockResolvedValueOnce(undefined);
      await expect(service.findOne(id, false)).resolves.toBeUndefined();
    });
  });

  describe('update()', () => {
    it('should call save', async () => {
      const membership = MembershipDto as MembershipEntity;
      const dto: UpdateMembershipDto = { phone: '87654321' };
      await service.update(membership, dto);

      expect(membershipRepo.save).toHaveBeenCalledWith({ ...membership, ...dto });
    });
  });

  describe('delete()', () => {
    it('should call findOne and remove', async () => {
      const found = { ...MembershipDto, id: '1' };
      jest.spyOn(service, 'findOne').mockResolvedValueOnce(found as unknown as MembershipEntity);

      const result = await service.delete(found.id);
      expect(result).toEqual({ id: expect.any(String) });
      expect(membershipRepo.remove).toHaveBeenCalledWith(found);
    });
  });
});
