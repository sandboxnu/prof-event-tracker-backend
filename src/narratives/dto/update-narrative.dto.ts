import { PartialType } from '@nestjs/swagger';
import { CreateNarrativeDto } from './create-narrative.dto';

export class UpdateNarrativeDto extends PartialType(CreateNarrativeDto) {}
