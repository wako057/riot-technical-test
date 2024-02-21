import { Body, Controller, Post } from '@nestjs/common';
import { CryptService } from '../../services/crypt.service';

@Controller('encrypt')
export class EncryptController {
  constructor(private cryptService: CryptService) {}

  @Post()
  encrypt(@Body() datasPosted: any) {
    console.log(datasPosted);
    this.cryptService.ecnryptThis(datasPosted);
    return { myData: 'blublu' };
  }
}
