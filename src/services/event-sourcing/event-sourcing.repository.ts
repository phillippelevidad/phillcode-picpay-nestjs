import { DataSource, EntityManager, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { EventSourcingEventEntity } from './event-sourcing-event.entity';

@Injectable()
export class EventSourcingRepository extends Repository<EventSourcingEventEntity> {
  constructor(dataSource: DataSource) {
    super(EventSourcingEventEntity, dataSource.manager);
  }

  async saveEvents(
    events: EventSourcingEventEntity[],
    manager?: EntityManager,
  ): Promise<EventSourcingEventEntity[]> {
    if (manager) {
      return manager.save(events);
    } else {
      return this.save(events);
    }
  }

  async findEventsForEntity(
    entityName: string,
    entityId: number,
    manager?: EntityManager,
  ): Promise<EventSourcingEventEntity[]> {
    const query = manager
      ? manager.createQueryBuilder(EventSourcingEventEntity, 'e')
      : this.createQueryBuilder('e');
    return query
      .where({ entityName: entityName, entityId: entityId })
      .orderBy({ created_at: 'ASC' })
      .getMany();
  }
}
