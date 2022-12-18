import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { User } from '../../entities';
import { UserService } from './user.service';
import { mocked } from 'jest-mock';
import { NotFoundException } from '@nestjs/common';
import { RepositoryMock } from '../../__mocks__/repository-mock';
import { QueryBuilderMock } from '../../__mocks__/query-builder-mock';

describe('UserService', () => {
  let service: UserService;
  let userRepo: jest.Mocked<Repository<User>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: RepositoryMock(),
        },
      ],
    }).compile();

    userRepo = module.get(getRepositoryToken(User));
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne()', () => {
    it('should throw', async () => {
      mocked(userRepo).findOneBy.mockResolvedValueOnce(undefined);
      await expect(service.findOne('')).rejects.toBeInstanceOf(NotFoundException);
    });

    it('should return undefined', async () => {
      mocked(userRepo).findOneBy.mockResolvedValueOnce(undefined);
      await expect(service.findOne('', false)).resolves.toBeUndefined();
    });
  });

  describe('find()', () => {
    it('should call getMany()', async () => {
      const qb = QueryBuilderMock() as unknown as SelectQueryBuilder<any>;
      mocked(userRepo).createQueryBuilder.mockReturnValueOnce(qb);

      await service.find({});

      expect(userRepo.createQueryBuilder).toHaveBeenCalled();
      expect(qb.getMany).toHaveBeenCalled();
    });

    it('should find by slug', async () => {
      const qb = QueryBuilderMock() as unknown as SelectQueryBuilder<any>;
      mocked(userRepo).createQueryBuilder.mockReturnValueOnce(qb);
      const slug = 'id';

      await service.find({ slug });

      expect(qb.where).toHaveBeenCalledWith(expect.any(String), { slug });
      expect(qb.getMany).toHaveBeenCalled();
    });

    it('should find by name', async () => {
      const qb = QueryBuilderMock() as unknown as SelectQueryBuilder<any>;
      mocked(userRepo).createQueryBuilder.mockReturnValueOnce(qb);
      const name = 'name';

      await service.find({ name });

      expect(qb.andWhere).toHaveBeenCalledWith(expect.any(String), { name: expect.stringContaining(name) });
      expect(qb.getMany).toHaveBeenCalled();
    });
  });

  describe('create()', () => {
    it('shhould call save', async () => {
      const name = '123';
      const slug = 'aaa';

      await service.create({ name, slug });
      expect(userRepo.save).toHaveBeenCalledWith({ name, slug });
    });
  });

  describe('delete()', () => {
    it('should return ID', async () => {
      const id = '123';
      jest.spyOn(service, 'findOne').mockResolvedValueOnce({ id } as unknown as User);

      const result = await service.delete(id);
      expect(result).toEqual({ id });
      expect(userRepo.remove).toHaveBeenCalled();
    });
  });
});
