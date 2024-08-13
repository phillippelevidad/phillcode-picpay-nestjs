import {
    EventSourcingEventEntity
} from 'src/services/event-sourcing/event-sourcing-event.entity';
import {
    EventSourcingRepository
} from 'src/services/event-sourcing/event-sourcing.repository';
import { EntityManager } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Wallet } from './wallet.entity';

@Injectable()
export class WalletsRepository {
  constructor(
    private readonly eventSourcingRepository: EventSourcingRepository,
  ) {}

  async saveWallet(wallet: Wallet, manager?: EntityManager): Promise<Wallet> {
    const uncommittedEvents = wallet.getUncommittedEvents();
    const eventsToSave = uncommittedEvents.map((event) => {
      const eventEntity = new EventSourcingEventEntity();
      eventEntity.entityId = wallet.id;
      eventEntity.entityName = 'Wallet';
      eventEntity.eventType = event.eventType;
      eventEntity.payload = event.payload;
      return eventEntity;
    });
    await this.eventSourcingRepository.saveEvents(eventsToSave, manager);
    wallet.clearUncommittedEvents();
    return wallet;
  }

  async findByUserId(
    userId: number,
    manager?: EntityManager,
  ): Promise<Wallet | undefined> {
    const events = await this.eventSourcingRepository.findEventsForEntity(
      'Wallet',
      userId,
      manager,
    );

    if (events.length === 0) {
      return undefined;
    }

    const wallet = new Wallet();
    wallet.loadFromHistory(events);

    return wallet;
  }
}
