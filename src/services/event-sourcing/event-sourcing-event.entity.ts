import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('event_sourcing_events')
export class EventSourcingEventEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'entity_id' })
  entityId: number;

  @Column({ name: 'entity_name' })
  entityName: string;

  @Column({ name: 'event_type' })
  eventType: string;

  @Column('json')
  payload: any;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;
}
