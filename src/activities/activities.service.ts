import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  Activity,
  ActivityCategory,
  PrismaPromise,
  Role,
  SignificanceLevel,
} from '@prisma/client';

@Injectable()
export class ActivitiesService {
  constructor(private prisma: PrismaService) {}

  create(userId: number, createActivityDto: CreateActivityDto) {
    return this.prisma.activity.create({
      data: { ...createActivityDto, userId: userId },
    });
  }

  async findFilter(
    userMakingRequestId: number,
    userId: string | undefined,
    category: ActivityCategory | undefined,
    significance: SignificanceLevel | undefined,
  ) {
    let result: PrismaPromise<Activity[]>;
    var userToSearchId = userMakingRequestId;
    // if a userId query parameter is provided, then it
    // must be the same as the user making the request, or the user
    // making the request must have admin permissions
    if (userId) {
      const userMakingRequest = await this.prisma.user.findFirst({
        where: { id: userMakingRequestId },
      });

      if (
        +userId !== userMakingRequestId &&
        userMakingRequest &&
        userMakingRequest.role === Role.FACULTY
      ) {
        throw new UnauthorizedException(
          'You do not have permission to access these activites',
        );
      }
      userToSearchId = +userId;
    }

    if (!significance) {
      result = this.prisma.activity.findMany({
        where: { userId: userToSearchId, category: category },
      });
    } else if (!category) {
      result = this.prisma.activity.findMany({
        where: { userId: userToSearchId, significance: significance },
      });
    } else if (!significance && !category) {
      result = this.prisma.activity.findMany({
        where: { userId: userToSearchId },
      });
    } else {
      result = this.prisma.activity.findMany({
        where: {
          userId: userToSearchId,
          category: category,
          significance: significance,
        },
      });
    }

    return result;
  }

  async findOne(userId: number, activityId: number) {
    const user = await this.prisma.user.findFirst({ where: { id: userId } });
    const activity = await this.prisma.activity.findFirst({
      where: { id: activityId },
    });

    if (
      user &&
      activity &&
      activity.userId !== userId &&
      user.role === Role.FACULTY
    ) {
      throw new UnauthorizedException(
        'You do not have access to this activity',
      );
    }

    return this.prisma.activity.findFirst({ where: { id: activityId } });
  }

  async update(
    userId: number,
    activityId: number,
    updateActivityDto: UpdateActivityDto,
  ) {
    const activity = await this.prisma.activity.findFirst({
      where: { id: activityId },
    });
    if (activity && activity.userId !== userId) {
      throw new UnauthorizedException(
        'You do not have access to this activity',
      );
    }

    return this.prisma.activity.update({
      where: { id: activityId },
      data: updateActivityDto,
    });
  }

  async remove(userId: number, activityId: number) {
    const activity = await this.prisma.activity.findFirst({
      where: { id: activityId },
    });
    if (activity && activity.userId !== userId) {
      throw new UnauthorizedException(
        'You do not have access to this activity',
      );
    }
    return this.prisma.activity.delete({ where: { id: activityId } });
  }
}
