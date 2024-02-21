import { Test, TestingModule } from '@nestjs/testing';
import { CryptService } from './crypt.service';
import { Base64 } from '../providers/base64/base64';

describe('ServicesService', () => {
  let service: CryptService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CryptService, Base64],
    }).compile();

    service = module.get<CryptService>(CryptService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
