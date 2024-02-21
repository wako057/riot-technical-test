import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CryptModule } from './crypt/crypt.module';

@Module({
  imports: [CryptModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
