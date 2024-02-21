import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CryptController } from '../src/crypt/controllers/crypt.controller';
import { CryptService } from '../src/crypt/services/crypt.service';
import { Base64 } from '../src/crypt/providers/base64/base64';
import { Sha256 } from '../src/crypt/providers/sha256/sha256';
import { SignatureDto } from '../src/crypt/dto/signature.dto';

describe.only('AppController (e2e)', () => {
  let app: INestApplication;
  const dataSignature: SignatureDto = {
    signature:
      '25448be880f58face302de8d072f3f9976e087a09326797c4ded2063c4de0814',
    data: {
      key1: 'bla',
      key2: 'blu',
      key3: {
        key4: 'bli',
        key5: 'blo',
      },
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CryptController],
      providers: [CryptService, Base64, Sha256],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  it('/verify (POST)', () => {
    return request(app.getHttpServer())
      .post('/verify')
      .set('Content-type', 'application/json')
      .send(JSON.stringify(dataSignature))
      .expect(204);
  });

  afterAll(async () => {
    await app.close();
  });
});
