import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { SetupModule } from './setup/setup.module';
import { UsersController } from './users/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';

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
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'yourpassword',
      database: 'yourdatabase',
      entities: [__dirname + '/**/*.entity.{ts,js}'], // Подключение всех моделей
      synchronize: true, // ⚠️ В проде лучше false + миграции!
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [
    AppController,
    UsersController
  ],
  providers: [AppService],
})
export class AppModule { }
