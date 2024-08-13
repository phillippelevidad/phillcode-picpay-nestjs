import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Transfer } from './transfer.entity';

@Injectable()
export class TransfersRepository extends Repository<Transfer> {
  constructor(dataSource: DataSource) {
    super(Transfer, dataSource.manager);
  }

  async findByUserId(userId: number): Promise<Transfer[]> {
    return this.find({ where: [{ payerId: userId }, { payeeId: userId }] });
  }
}
