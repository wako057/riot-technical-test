import { Test, TestingModule } from '@nestjs/testing';
import { CryptController } from './crypt.controller';
import { CryptService } from '../services/crypt.service';
import { Base64 } from '../providers/base64/base64';
import { Sha256 } from '../providers/sha256/sha256';

describe('EncryptController', () => {
  let controller: CryptController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CryptController],
      providers: [CryptService, Base64, Sha256],
    }).compile();

    controller = module.get<CryptController>(CryptController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
