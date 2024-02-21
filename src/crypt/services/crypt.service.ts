import { Injectable } from '@nestjs/common';
import { Base64 } from '../providers/base64/base64';

@Injectable()
export class CryptService {
  constructor(private encryptor: Base64) {}
  ecnryptThis(dataToEncrypt: string): string {
    console.log('on est dans le service', dataToEncrypt);
    const result = this.encryptor.encrypt(JSON.stringify(dataToEncrypt));
    console.log('resultat chiffrement', result);

    return result;
  }
}
