import {
  Injectable,
  NestMiddleware,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ContentTypeMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const contentType = req.headers['content-type'];

    if (!contentType || contentType !== 'application/json') {
      throw new HttpException(
        'Le header Content-Type doit être défini comme application/json',
        HttpStatus.UNSUPPORTED_MEDIA_TYPE,
      );
    }

    next();
  }
}
