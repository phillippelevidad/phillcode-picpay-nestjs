import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Notification } from './notification.entity';

@Injectable()
export class NotificationsRepository extends Repository<Notification> {
  constructor(dataSource: DataSource) {
    super(Notification, dataSource.manager);
  }

  async findByUserId(userId: number): Promise<Notification[]> {
    return this.find({ where: { userId } });
  }
}
