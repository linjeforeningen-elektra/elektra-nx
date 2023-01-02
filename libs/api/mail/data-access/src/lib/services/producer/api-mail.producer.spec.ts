import { Test } from '@nestjs/testing';
import { ApiMailProducer } from './api-mail.producer';

describe('ApiMailProducer', () => {
  let service: ApiMailProducer;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiMailProducer],
    }).compile();

    service = module.get(ApiMailProducer);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
