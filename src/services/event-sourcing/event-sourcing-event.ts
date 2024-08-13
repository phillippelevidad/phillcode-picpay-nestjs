export interface EventSourcingEvent<T> {
  readonly eventType: string;
  readonly payload: T;
}
