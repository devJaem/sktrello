import { PartialType } from '@nestjs/swagger';
import { CreateCheckitemDto } from './create-checkitem.dto';

export class UpdateCheckitemDto extends PartialType(CreateCheckitemDto) {}
