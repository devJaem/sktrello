import { PartialType } from '@nestjs/swagger';
import { CreateCheckItemDto } from './create-checkitem.dto';

export class UpdateCheckItemDto extends PartialType(CreateCheckItemDto) {}
