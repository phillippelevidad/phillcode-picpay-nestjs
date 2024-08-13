import { EmailNotifier } from 'src/services/notifier/email-notifier';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { NotificationsRepository } from './notifications.repository';

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);

  constructor(
    private readonly emailNotifier: EmailNotifier,
    private readonly notificationsRepository: NotificationsRepository,
    private readonly usersService: UsersService,
  ) {}

  async notify(userId: number, message: string): Promise<void> {
    const user = await this.usersService.getUser(userId);
    if (!user) {
      throw new NotFoundException(`User ${userId} not found`);
    }

    await this.emailNotifier.send(user.email, message);

    const notification = this.notificationsRepository.create({
      userId,
      message,
      date: new Date(),
    });

    await this.notificationsRepository.save(notification);

    this.logger.debug(`Notification sent to user ${userId}: ${message}`);
  }
}
