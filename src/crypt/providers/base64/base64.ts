import { Injectable } from '@nestjs/common';
import { IcryptInterface } from '../icrypt.interface';

@Injectable()
export class Base64 implements IcryptInterface {
  encrypt(input: string): string {
    return Buffer.from(input).toString('base64');
  }

  decrypt(input: string): string {
    return Buffer.from(input, 'base64').toString();
  }
}
