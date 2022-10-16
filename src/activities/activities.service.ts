import { Injectable } from '@nestjs/common';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  Activity,
  ActivityCategory,
  PrismaPromise,
  SignificanceLevel,
} from '@prisma/client';
import { PrismaModule } from 'src/prisma/prisma.module';

@Injectable()
export class ActivitiesService {
  constructor(private prisma: PrismaService) {}

  create(createActivityDto: CreateActivityDto) {
    // will need to check that the user making the request is the professor
    return this.prisma.activity.create({ data: createActivityDto });
  }

  findAll(userId: number) {
    // will need to check that the user making the request is either the professor or is on the MC
    return this.prisma.activity.findMany({ where: { userId: userId } });
  }

  findFilter(
    userId: number,
    category: ActivityCategory | undefined,
    significance: SignificanceLevel | undefined,
  ) {
    let result: PrismaPromise<Activity[]>;

    if (!significance) {
      result = this.prisma.activity.findMany({
        where: { userId: userId, category: category },
      });
    } else if (!category) {
      result = this.prisma.activity.findMany({
        where: { userId: userId, significance: significance },
      });
    } else if (!significance && !category) {
      result = this.prisma.activity.findMany({ where: { userId: userId } });
    } else {
      result = this.prisma.activity.findMany({
        where: {
          userId: userId,
          category: category,
          significance: significance,
        },
      });
    }

    return result;
  }

  find(
    activityCatetory: ActivityCategory | undefined,
    significanceLevel: SignificanceLevel | undefined,
  ) {
    if (activityCatetory === undefined) {
      // do stuff
    }
  }

  findByCategory(activityCatetory: ActivityCategory) {
    return this.prisma.activity.findMany({
      where: { category: activityCatetory },
    });
  }

  findByLevel(significanceLevel: SignificanceLevel) {
    return this.prisma.activity.findMany({
      where: { significance: significanceLevel },
    });
  }

  findOne(id: number) {
    // will need to check that the user making the request is either the professor or is on the MC
    return this.prisma.activity.findFirst({ where: { id: id } });
  }

  update(id: number, updateActivityDto: UpdateActivityDto) {
    // will need to check that the user making the request is the professor
    return this.prisma.activity.update({
      where: { id },
      data: updateActivityDto,
    });
  }

  remove(id: number) {
    // will need to check that the user making the request is the professor
    return this.prisma.activity.delete({ where: { id } });
  }
}
