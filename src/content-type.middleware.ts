import {
  Injectable,
  NestMiddleware,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Injectable()
export class ContentTypeMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const contentType = req.headers['content-type'];

    if (req.originalUrl !== '/') {
      if (!contentType || contentType !== 'application/json') {
        throw new HttpException(
          'Le header Content-Type doit être défini comme application/json',
          HttpStatus.UNSUPPORTED_MEDIA_TYPE,
        );
      }
    }

    next();
  }
}
