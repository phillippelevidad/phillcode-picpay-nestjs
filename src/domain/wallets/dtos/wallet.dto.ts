import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class WalletDto {
  @Expose()
  id: number;

  @Expose()
  balance: number;
}
