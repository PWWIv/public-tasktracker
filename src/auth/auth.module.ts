import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { ConfigService } from '@nestjs/config'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { JwtStrategy } from './jwt.strategy'
import { UsersModule } from 'src/users/users.module'

@Module({
  imports: [
    PassportModule,
    UsersModule,
    JwtModule.registerAsync({
      imports: [],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '60m' }, // токен действителен 60 минут
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule { }
