// src/articles/articles.service.ts

import { Injectable } from '@nestjs/common';
import { CreateNarrativesDto } from './dto/create-narratives.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NarrativesService {
  constructor(private prisma: PrismaService) {}

  // CRUD operations
}
