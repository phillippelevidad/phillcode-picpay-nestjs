import { EventSourcingEvent } from 'src/services/event-sourcing/event-sourcing-event';

export class WalletCreatedEvent implements EventSourcingEvent<{ id: number }> {
  static readonly eventType = 'WalletCreated';
  readonly eventType = WalletCreatedEvent.eventType;

  constructor(public readonly payload: { id: number }) {}
}
