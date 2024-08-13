import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventSourcingEventEntity } from './event-sourcing-event.entity';
import { EventSourcingRepository } from './event-sourcing.repository';

@Module({
  imports: [TypeOrmModule.forFeature([EventSourcingEventEntity])],
  providers: [EventSourcingRepository],
  exports: [EventSourcingRepository],
})
export class EventSourcingModule {}
