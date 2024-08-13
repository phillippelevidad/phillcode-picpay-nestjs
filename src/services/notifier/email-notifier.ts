import axios from 'axios';
import { Job, Queue } from 'bull';
import { InjectQueue, Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { INotifier } from './notifier.interface';

@Processor('email')
export class EmailNotifier implements INotifier {
  private readonly logger = new Logger(EmailNotifier.name);

  constructor(@InjectQueue('email') private emailQueue: Queue) {}

  async send(to: string, message: string): Promise<void> {
    await this.emailQueue.add(
      'sendEmail',
      { to, message },
      {
        attempts: 10,
        backoff: 1000,
      },
    );
  }

  @Process('sendEmail')
  protected async handleSendEmail(
    job: Job<{ to: string; message: string }>,
  ): Promise<void> {
    const { to, message } = job.data;
    const url = 'https://util.devi.tools/api/v1/notify';

    try {
      const response = await axios.post(url, { to, message });
      if (response.status >= 200 && response.status < 300) {
        this.logger.log(`Email sent successfully to ${to}`);
      } else {
        throw new Error(`Failed with status code: ${response.status}`);
      }
    } catch (error) {
      this.logger.error(`Failed to send email to ${to}`, error.message);
      throw error;
    }
  }
}
