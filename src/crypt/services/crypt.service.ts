import { Injectable } from '@nestjs/common';
import { Base64 } from '../providers/base64/base64';
import { FlexibleInputDto } from '../dto/flexibleinput.dto';

@Injectable()
export class CryptService {
  constructor(private encryptor: Base64) {}

  encrypt(dataToEncrypt: FlexibleInputDto): FlexibleInputDto {
    const output = new FlexibleInputDto();

    for (const key in dataToEncrypt) {
      if (dataToEncrypt.hasOwnProperty(key)) {
        const value = dataToEncrypt[key];

        output[key] =
          typeof value === 'string'
            ? this.encryptor.encrypt(value.toString())
            : this.encryptor.encrypt(JSON.stringify(value));
      }
    }

    return output;
  }

  getDecryptedValue(cryptedValue: string): string | object {
    const decryptedValue = this.encryptor.decrypt(cryptedValue);
    try {
      return JSON.parse(decryptedValue);
    } catch (error) {
      return decryptedValue;
    }
  }

  decrypt(dataToDecrypt: FlexibleInputDto): FlexibleInputDto {
    const output = new FlexibleInputDto();

    for (const key in dataToDecrypt) {
      if (dataToDecrypt.hasOwnProperty(key)) {
        const value = dataToDecrypt[key];

        output[key] = this.getDecryptedValue(value.toString());
      }
    }

    return output;
  }
}
