import { PickType } from '@nestjs/mapped-types';
import { CreateCardDto } from './create-card.dto';

export class MoveCardDto extends PickType(CreateCardDto, [
  'listId',
  'cardOrder',
]) {}
