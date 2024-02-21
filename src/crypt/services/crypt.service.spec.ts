import { Test, TestingModule } from '@nestjs/testing';
import { CryptService } from './crypt.service';
import { Base64 } from '../providers/base64/base64';
import { FlexibleInputDto } from '../dto/flexibleinput.dto';

describe('ServicesService', () => {
  let service: CryptService;
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

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CryptService, Base64],
    }).compile();

    service = module.get<CryptService>(CryptService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('encrypt', () => {
    const result: FlexibleInputDto = service.encrypt(dataDecoded);
    expect(result.key1).toEqual('Ymxh');
    expect(result.key2).toEqual('Ymx1');
    expect(result.key3).toEqual('eyJrZXk0IjoiYmxpIiwia2V5NSI6ImJsbyJ9');
  });

  it('decrypt', () => {
    const result: FlexibleInputDto = service.decrypt(dataEncoded);

    expect(result).toEqual(dataDecoded);
  });
});
