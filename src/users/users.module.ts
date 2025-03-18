import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ReAuthGuard } from 'src/common/guards/re-auth.guard';
import { EncryptionService } from '../common/services/encryption.service';

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])], // Подключаем Entity
    providers: [UsersService, ReAuthGuard, EncryptionService],
    controllers: [UsersController],
    exports: [UsersService],
})
export class UsersModule { }
