import { EventSourcingEvent } from 'src/services/event-sourcing/event-sourcing-event';

export class WalletCreditedEvent
  implements EventSourcingEvent<{ amount: number }>
{
  static readonly eventType = 'WalletCredited';
  readonly eventType = WalletCreditedEvent.eventType;

  constructor(public readonly payload: { amount: number }) {}
}
