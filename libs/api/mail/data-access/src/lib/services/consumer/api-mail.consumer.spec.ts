import { ApiMailConsumer } from './api-mail.consumer';
import { Test } from '@nestjs/testing';

describe('ApiMailConsumer', () => {
  let service: ApiMailConsumer;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiMailConsumer],
    }).compile();

    service = module.get(ApiMailConsumer);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
