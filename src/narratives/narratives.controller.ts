import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { NarrativesService } from './narratives.service';
import { CreateNarrativeDto } from './dto/create-narrative.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { UpdateNarrativeDto } from './dto/update-narrative.dto';
@Controller('narratives')
@ApiTags('narratives')
export class NarrativesController {
  constructor(private readonly narrativesService: NarrativesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Req() req: any, @Body() createNarrativeDto: CreateNarrativeDto) {
    return this.narrativesService.create(req.user.sub, createNarrativeDto);
  }

  /**
   * Update the Activity with the given ID using the given body. User making request
   * must be the user associated with the Activity.
   */
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Req() req: any,
    @Param('id') id: string,
    @Body() updateNarrativeDto: UpdateNarrativeDto,
  ) {
    return this.narrativesService.update(req.user.sub, +id, updateNarrativeDto);
  }

  /**
   * Delete the Activity with the given ID. User making request
   * must be the user associated with the Activity.
   */
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Req() req: any, @Param('id') id: string) {
    return this.narrativesService.remove(req.user.sub, +id);
  }

  /**
   * Get narratives based on userId, academic year, and category (optional). // find filter
   */
}
