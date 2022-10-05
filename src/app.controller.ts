import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("test/deleteUsers")
  deleteUsers(): void {
    prisma.user.deleteMany({})
    .then(e => console.log(e))
  }




}
