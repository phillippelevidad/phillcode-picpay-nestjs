import { Injectable, Logger } from '@nestjs/common';
import { INotifier } from './notifier.interface';

@Injectable()
export class SmsNotifier implements INotifier {
  private readonly logger = new Logger(SmsNotifier.name);

  async send(to: string, message: string): Promise<void> {
    this.logger.log(`SMS sent to ${to}: ${message}`);
  }
}
