import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateNarrativeDto } from './dto/create-narrative.dto';
import { UpdateNarrativeDto } from './dto/update-narrative.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  NarrativeCategory,
  PrismaPromise,
  Narrative,
  Role,
} from '@prisma/client';

@Injectable()
export class NarrativesService {
  constructor(private prisma: PrismaService) {}

  create(userId: number, createNarrativeDto: CreateNarrativeDto) {
    const dateModified = new Date();
    return this.prisma.narrative.create({
      data: {
        ...createNarrativeDto,
        userId: userId,
        dateModified: dateModified,
      },
    });
  }

  async findNarrative(
    userId: number,
    requestedId: number,
    year: number,
    category?: NarrativeCategory | undefined,
  ) {
    let result: PrismaPromise<Narrative[]>;

    const user = await this.prisma.user.findFirst({ where: { id: userId } });
    let userToSearchId = userId;

    if (userId !== requestedId) {
      if (user?.role === Role.FACULTY) {
        throw new UnauthorizedException(
          'You do not have permission to access these activites',
        );
      } else {
        userToSearchId = requestedId;
      }
    }

    if (category) {
      result = this.prisma.narrative.findMany({
        where: {
          userId: userToSearchId,
          category: category,
          year: year,
        },
      });
    } else {
      result = this.prisma.narrative.findMany({
        where: {
          userId: userToSearchId,
          year: year,
        },
      });
    }
    return result;
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
