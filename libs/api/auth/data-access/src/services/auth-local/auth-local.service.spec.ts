import { Test, TestingModule } from '@nestjs/testing';
import { AuthLocalService } from './auth-local.service';

describe('AuthLocalService', () => {
  let service: AuthLocalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthLocalService],
    }).compile();

    service = module.get<AuthLocalService>(AuthLocalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
