import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configModuleValidationSchema } from './configs/env-validation.config';
import { typeOrmModuleOptions } from './configs/database.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { BoardModule } from './board/board.module';
import { CardModule } from './card/card.module';
import { CommentModule } from './comment/comment.module';
import { ListModule } from './list/list.module';
import { AppController } from './app.controller';
import { CheckListModule } from './checkList/checkList.module';
import { CheckItemModule } from './checkItem/checkItem.module';

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
  providers: [],
})
export class AppModule {}
