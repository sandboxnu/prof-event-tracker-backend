import { Injectable } from '@nestjs/common';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { PrismaService } from 'src/prisma/prisma.service';

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
