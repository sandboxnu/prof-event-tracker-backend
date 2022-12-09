import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { ApiTags } from '@nestjs/swagger';
import { ActivityCategory, SignificanceLevel } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';

@Controller('activities')
@ApiTags('activities')
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Req() req: any, @Body() createActivityDto: CreateActivityDto) {
    return this.activitiesService.create(req.user.sub, createActivityDto);
  }

  @Get('all')
  @UseGuards(JwtAuthGuard)
  findAll(
    @Req() req: any,
    @Query('userId') userId?: string | undefined,
    @Query('category') category?: ActivityCategory | undefined,
    @Query('significance') signifiance?: SignificanceLevel | undefined,
  ) {
    return this.activitiesService.findFilter(
      req.user.sub,
      userId,
      category,
      signifiance,
    );
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Req() req: any, @Param('id') id: string) {
    return this.activitiesService.findOne(req.user.sub, +id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Req() req: any,
    @Param('id') id: string,
    @Body() updateActivityDto: UpdateActivityDto,
  ) {
    return this.activitiesService.update(req.user.sub, +id, updateActivityDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Req() req: any, @Param('id') id: string) {
    return this.activitiesService.remove(req.user.sub, +id);
  }
}
