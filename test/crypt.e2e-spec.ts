import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CryptController } from '../src/crypt/controllers/crypt.controller';
import { CryptService } from '../src/crypt/services/crypt.service';
import { Base64 } from '../src/crypt/providers/base64/base64';
import { Sha256 } from '../src/crypt/providers/sha256/sha256';
import { SignatureDto } from '../src/crypt/dto/signature.dto';
import { FlexibleInputDto } from '../src/crypt/dto/flexibleinput.dto';
import { ContentTypeMiddleware } from '../src/content-type.middleware';
import { HmacDto } from '../src/crypt/dto/hmac.dto';

describe.only('AppController (e2e)', () => {
  let app: INestApplication;
  const dataDecoded: FlexibleInputDto = {
    key1: 'bla',
    key2: 'blu',
    key3: {
      key4: 'bli',
      key5: 'blo',
    },
  };
  const dataEncoded: FlexibleInputDto = {
    key1: 'Ymxh',
    key2: 'Ymx1',
    key3: 'eyJrZXk0IjoiYmxpIiwia2V5NSI6ImJsbyJ9',
  };

  const hmac: HmacDto = {
    signature:
      '25448be880f58face302de8d072f3f9976e087a09326797c4ded2063c4de0814',
  };
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
      providers: [CryptService, Base64, Sha256, ContentTypeMiddleware],
    }).compile();

    app = module.createNestApplication();
    app.use(new ContentTypeMiddleware().use);
    await app.init();
  });

  it('/encrypt (POST) Expect Error 415', () => {
    return request(app.getHttpServer())
      .post('/encrypt')
      .send(JSON.stringify(dataDecoded))
      .expect(415);
  });

  it('/encrypt (POST)', async () => {
    const res = await request(app.getHttpServer())
      .post('/encrypt')
      .set('Content-type', 'application/json')
      .send(JSON.stringify(dataDecoded))
      .expect(201);

    const answer = res.body;
    expect(answer).toStrictEqual(dataEncoded);
  });

  it('/decrypt (POST)', async () => {
    const res = await request(app.getHttpServer())
      .post('/decrypt')
      .set('Content-type', 'application/json')
      .send(JSON.stringify(dataEncoded))
      .expect(201);

    const answer = res.body;
    expect(answer).toStrictEqual(dataDecoded);
  });

  it('/sign (POST)', async () => {
    const res = await request(app.getHttpServer())
      .post('/sign')
      .set('Content-type', 'application/json')
      .send(JSON.stringify(dataDecoded))
      .expect(201);

    const answer = res.body;
    expect(answer).toStrictEqual(hmac);
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
