import { PickType } from '@nestjs/swagger';
import { CreateChecklistDto } from './create-checklist.dto';

export class UpdateChecklistDto extends PickType(CreateChecklistDto, [
  'title',
]) {}
