import { Controller, Get, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  @Get()
  async auth(@Res() res: Response) {
    return res.redirect('/auth/google');
  }
}
