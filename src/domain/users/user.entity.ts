import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'full_name' })
  fullName: string;

  @Column({ name: 'cpf_cnpj', unique: true })
  cpfCnpj: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  type: string;
}
