import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateNarrativeDto } from './dto/create-narrative.dto';
import { UpdateNarrativeDto } from './dto/update-narrative.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NarrativesService {
  constructor(private prisma: PrismaService) {}

  create(userId: number, createNarrativeDto: CreateNarrativeDto) {
    return this.prisma.narrative.create({
      data: { ...createNarrativeDto, userId: userId },
    });
  }

  async update(
    userId: number,
    narrativeId: number,
    updateNarrativeDto: UpdateNarrativeDto,
  ) {
    const narrative = await this.prisma.narrative.findFirst({
      where: { id: narrativeId },
    });
    if (narrative && narrative.userId !== userId) {
      throw new UnauthorizedException(
        'You do not have access to this activity',
      );
    }

    return this.prisma.narrative.update({
      where: { id: narrativeId },
      data: updateNarrativeDto,
    });
  }

  async remove(userId: number, narrativeId: number) {
    const narrative = await this.prisma.narrative.findFirst({
      where: { id: narrativeId },
    });
    if (narrative && narrative.userId !== userId) {
      throw new UnauthorizedException(
        'You do not have access to this narrative',
      );
    }
    return this.prisma.narrative.delete({ where: { id: narrativeId } });
  }

  // CRUD operations
}
