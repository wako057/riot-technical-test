import { Module } from '@nestjs/common';
import { EncryptController } from './controllers/encrypt/encrypt.controller';
import { CryptService } from './services/crypt.service';
import { Base64 } from './providers/base64/base64';

@Module({
  controllers: [EncryptController],
  providers: [CryptService, Base64],
})
export class CryptModule {}
