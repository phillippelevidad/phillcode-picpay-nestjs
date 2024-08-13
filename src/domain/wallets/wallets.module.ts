import { EventSourcingModule } from 'src/services/event-sourcing/event-sourcing.module';
import { Module } from '@nestjs/common';
import { WalletsController } from './wallets.controller';
import { WalletsRepository } from './wallets.repository';
import { WalletsService } from './wallets.service';

@Module({
  imports: [EventSourcingModule],
  providers: [WalletsRepository, WalletsService],
  exports: [WalletsService],
  controllers: [WalletsController],
})
export class WalletsModule {}
