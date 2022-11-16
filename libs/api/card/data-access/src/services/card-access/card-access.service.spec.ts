import { Test, TestingModule } from '@nestjs/testing';
import { CardAccessService } from './card-access.service';

describe('CardAccessService', () => {
  let service: CardAccessService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CardAccessService],
    }).compile();

    service = module.get<CardAccessService>(CardAccessService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
