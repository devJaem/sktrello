import { IsNumber, IsOptional } from 'class-validator';

export class MoveCheckListDto {
  @IsNumber()
  @IsOptional()
  targetOrder?: number; // 체크리스트 내부에서 이동할 때 사용

  @IsNumber()
  @IsOptional()
  targetCardId?: number; // 다른 카드로 이동할 때 사용
}
