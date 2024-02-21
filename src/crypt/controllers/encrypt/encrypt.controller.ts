import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CryptService } from '../../services/crypt.service';
import { FlexibleInputDto } from '../../dto/flexibleinput.dto';

@Controller()
export class EncryptController {
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
}
