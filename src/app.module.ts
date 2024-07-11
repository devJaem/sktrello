import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { BoardModule } from './board/board.module';
import { CardModule } from './card/card.module';
import { CheckItemModule } from './check_item/check_item.module';
import { CheckListModule } from './check_list/check_list.module';
import { CommentModule } from './comment/comment.module';
import { ListModule } from './list/list.module';
import { ConfigModule } from '@nestjs/config';
import { configModuleValidationSchema } from './configs/env-validation.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmModuleOptions } from './configs/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: configModuleValidationSchema,
    }),
    TypeOrmModule.forRootAsync(typeOrmModuleOptions),
    UserModule,
    AuthModule,
    BoardModule,
    CardModule,
    CheckItemModule,
    CheckListModule,
    CommentModule,
    ListModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
