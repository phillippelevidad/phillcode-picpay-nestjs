import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('transfers')
export class Transfer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'payer_id' })
  payerId: number;

  @Column({ name: 'payee_id' })
  payeeId: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ type: 'timestamptz' })
  date: Date;

  constructor(payerId: number, payeeId: number, amount: number) {
    this.payerId = payerId;
    this.payeeId = payeeId;
    this.amount = amount;
    this.date = new Date();
  }
}
