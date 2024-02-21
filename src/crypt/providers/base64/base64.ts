import { Injectable } from '@nestjs/common';
import { IcryptInterface } from '../icrypt.interface';

@Injectable()
export class Base64 implements IcryptInterface {
  encrypt(input: string): string {
    const back: string = Buffer.from(input).toString('base64');

    return back;
  }

  decrypt(input: string): string {
    const back: string = Buffer.from(input, 'base64').toString();

    return back;
  }
}
