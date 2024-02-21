import { Injectable } from '@nestjs/common';
import { IhmacInterface } from '../ihmac.interface';
import { createHash } from 'node:crypto';

@Injectable()
export class Sha256 implements IhmacInterface {
  hash(input: string): string {
    return createHash('sha256').update(input).digest('hex');
  }
}
