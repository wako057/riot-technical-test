import { Injectable } from '@nestjs/common';

@Injectable()
export class Base64 {
  encrypt(input: string): string {
    const back: string = Buffer.from(input).toString('base64');

    console.log('encrypt: back', back);
    return back;
  }
}
