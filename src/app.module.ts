import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { SetupModule } from './setup/setup.module';
import { UsersController } from './users/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './users/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    AuthModule,
    UsersModule,
    SetupModule,
    TypeOrmModule.forRoot({
      type: 'postgres', // Укажи свою БД
      host: 'db',
      port: 5432,
      username: 'user',
      password: 'password',
      database: 'mydatabase',
      entities: [__dirname + '/**/*.entity.{ts,js}'], // Подключение всех моделей
      synchronize: true, // ⚠️ В проде лучше false + миграции!
    }),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [
    AppController,
    UsersController
  ],
  providers: [AppService],
})
export class AppModule { }
