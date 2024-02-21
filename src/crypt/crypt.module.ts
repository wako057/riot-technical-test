import { Module } from '@nestjs/common';
import { EncryptController } from './controllers/encrypt/encrypt.controller';
import { CryptService } from './services/crypt.service';
import { Base64 } from './providers/base64/base64';
import { Sha256 } from './providers/sha256/sha256';

@Module({
  controllers: [EncryptController],
  providers: [CryptService, Base64, Sha256],
})
export class CryptModule {}
