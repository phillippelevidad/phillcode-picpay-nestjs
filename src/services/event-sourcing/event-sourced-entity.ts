import { EventSourcingEvent } from './event-sourcing-event';

export abstract class EventSourcedEntity<
  TEvent extends EventSourcingEvent<any>,
> {
  private events: TEvent[] = [];

  protected abstract applyEvent(event: TEvent): void;

  protected addEvent(event: TEvent): void {
    this.applyEvent(event);
    this.events.push(event);
  }

  getUncommittedEvents(): TEvent[] {
    return this.events;
  }

  clearUncommittedEvents(): void {
    this.events = [];
  }

  public loadFromHistory(events: TEvent[]): void {
    events.forEach((event) => this.applyEvent(event));
  }
}
