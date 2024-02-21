import { Test, TestingModule } from '@nestjs/testing';
import { Base64 } from './base64';

describe('Base64', () => {
  let provider: Base64;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Base64],
    }).compile();

    provider = module.get<Base64>(Base64);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
