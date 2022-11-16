import { Test, TestingModule } from '@nestjs/testing';
import { BlockRevisionService } from './block-revision.service';

describe('BlockRevisionService', () => {
  let service: BlockRevisionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BlockRevisionService],
    }).compile();

    service = module.get<BlockRevisionService>(BlockRevisionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
