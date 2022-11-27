import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';

import { PrismaClient } from '@prisma/client';
import { JwtAuthGuard } from './auth/jwt/jwt-auth.guard';

const prisma = new PrismaClient();

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('protected')
  @UseGuards(JwtAuthGuard)
  async protected(@Req() req: any) {
    console.log('User', req.user);
    return 'Protected route! Your email is: ' + req.user.email;
  }
}
