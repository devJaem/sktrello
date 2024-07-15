import { OmitType } from '@nestjs/mapped-types';
import { CreateCardDto } from './create-card.dto';

export class UpdateCardDto extends OmitType(CreateCardDto, [
  'listId',
  'cardOrder',
]) {}
