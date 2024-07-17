import { PickType } from '@nestjs/swagger';
import { CreateCheckListDto } from './create-checkList.dto';

export class UpdateCheckListDto extends PickType(CreateCheckListDto, [
  'title',
]) {}
