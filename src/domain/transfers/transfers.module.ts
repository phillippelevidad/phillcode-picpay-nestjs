import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationsModule } from '../notifications/notifications.module';
import { UsersModule } from '../users/users.module';
import { WalletsModule } from '../wallets/wallets.module';
import { AuthorizationService } from './authorization.service';
import { Transfer } from './transfer.entity';
import { TransfersController } from './transfers.controller';
import { TransfersRepository } from './transfers.repository';
import { TransfersService } from './transfers.service';

@Module({
  imports: [
    NotificationsModule,
    UsersModule,
    WalletsModule,
    TypeOrmModule.forFeature([Transfer]),
  ],
  providers: [AuthorizationService, TransfersRepository, TransfersService],
  exports: [TransfersService],
  controllers: [TransfersController],
})
export class TransfersModule {}
