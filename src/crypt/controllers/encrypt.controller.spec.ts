import { Test, TestingModule } from '@nestjs/testing';
import { EncryptController } from './encrypt.controller';
import { CryptService } from '../services/crypt.service';
import { Base64 } from '../providers/base64/base64';
import { Sha256 } from '../providers/sha256/sha256';

describe('EncryptController', () => {
  let controller: EncryptController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EncryptController],
      providers: [CryptService, Base64, Sha256],
    }).compile();

    controller = module.get<EncryptController>(EncryptController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
