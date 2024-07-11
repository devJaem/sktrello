import { PartialType } from '@nestjs/swagger';
import { CreateCheckListDto } from './create-check_list.dto';

export class UpdateCheckListDto extends PartialType(CreateCheckListDto) {}
