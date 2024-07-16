import { IsNumber, IsOptional } from 'class-validator';
import { CHECK_MESSAGES } from 'src/constants/check-message.constant';

export class MoveCheckItemDto {
  @IsNumber()
  @IsOptional()
  targetOrder?: number; // 체크리스트 내부에서 이동할 때 사용

  @IsNumber()
  @IsOptional()
  targetChecklistId?: number; // 다른 체크리스트로 이동할 때 사용
}
