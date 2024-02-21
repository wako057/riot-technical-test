import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CryptService } from '../services/crypt.service';
import { FlexibleInputDto } from '../dto/flexibleinput.dto';
import { SignatureDto } from '../dto/signature.dto';

@Controller()
export class CryptController {
  constructor(private cryptService: CryptService) {}

  @Post('encrypt')
  @UsePipes(new ValidationPipe())
  encrypt(@Body() dataPosted: FlexibleInputDto) {
    console.log(`dataPosted: ${JSON.stringify(dataPosted)}`);
    return this.cryptService.encrypt(dataPosted);
  }

  @Post('decrypt')
  @UsePipes(new ValidationPipe())
  decrypt(@Body() dataPosted: FlexibleInputDto) {
    return this.cryptService.decrypt(dataPosted);
  }

  @Post('sign')
  @UsePipes(new ValidationPipe())
  sign(@Body() dataPosted: FlexibleInputDto) {
    console.log(dataPosted);
    return this.cryptService.sign(dataPosted);
  }

  @Post('verify')
  @UsePipes(new ValidationPipe())
  @HttpCode(204)
  verify(@Body() dataPosted: SignatureDto) {
    if (false === this.cryptService.verify(dataPosted)) {
      throw new BadRequestException('Signature Mismatch');
    }
  }
}
