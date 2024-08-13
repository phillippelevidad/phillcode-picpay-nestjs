import { EventSourcingEvent } from 'src/services/event-sourcing/event-sourcing-event';

export class WalletDebitedEvent
  implements EventSourcingEvent<{ amount: number }>
{
  static readonly eventType = 'WalletDebited';
  readonly eventType = WalletDebitedEvent.eventType;

  constructor(public readonly payload: { amount: number }) {}
}
