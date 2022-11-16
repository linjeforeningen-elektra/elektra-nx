import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CardEntity } from '../../entities';
import { RepositoryMock } from '../../__mocks__/repository-mock';
import { CardService } from './card.service';

describe('CardService', () => {
  let service: CardService;
  let cardRepo: Repository<CardEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CardService,
        {
          provide: getRepositoryToken(CardEntity),
          useValue: RepositoryMock(),
        },
      ],
    }).compile();

    cardRepo = module.get(getRepositoryToken(CardEntity));
    service = module.get<CardService>(CardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
