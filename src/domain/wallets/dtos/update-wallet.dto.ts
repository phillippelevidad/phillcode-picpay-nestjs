import { IsIn, IsNumber, IsString, Min } from 'class-validator';

export class UpdateWalletDto {
  @IsString()
  @IsIn(['credit', 'debit'], {
    message: 'Operation must be either credit or debit',
  })
  operation: 'credit' | 'debit';

  @IsNumber()
  @Min(0.01, { message: 'Amount must be a positive number greater than 0' })
  amount: number;
}
