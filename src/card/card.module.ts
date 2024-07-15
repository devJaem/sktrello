import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardController } from './card.controller';
import { Card } from './entities/card.entity';
import { CardService } from './card.service';

@Module({
  imports: [TypeOrmModule.forFeature([Card])],
  providers: [CardService],
  controllers: [CardController],
})
export class CardModule {}
