import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { ClientEntity } from './client.entity';
import { UserEntity } from '../users/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([ClientEntity, UserEntity])],
    controllers: [ClientsController],
    providers: [ClientsService],
    exports: [ClientsService],
})
export class ClientsModule { }
