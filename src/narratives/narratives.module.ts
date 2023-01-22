// src/articles/articles.module.ts

import { Module } from '@nestjs/common';
import { NarrativesService } from './narratives.service';
import { NarrativesController } from './narratives.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [NarrativesController],
  providers: [NarrativesService],
  imports: [PrismaModule],
})
export class NarrativesModule {}
