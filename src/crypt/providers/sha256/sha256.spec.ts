import { Test, TestingModule } from '@nestjs/testing';
import { Sha256 } from './sha256';

describe('Sha256', () => {
  let provider: Sha256;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Sha256],
    }).compile();

    provider = module.get<Sha256>(Sha256);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
