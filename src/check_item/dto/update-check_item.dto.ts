import { PartialType } from '@nestjs/swagger';
import { CreateCheckItemDto } from './create-check_item.dto';

export class UpdateCheckItemDto extends PartialType(CreateCheckItemDto) {}
