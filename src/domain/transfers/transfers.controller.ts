import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { TransfersService } from './transfers.service';

@Controller('transfers')
export class TransfersController {
  constructor(private transfersService: TransfersService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async transfer(
    @Body('payer') payerId: number,
    @Body('payee') payeeId: number,
    @Body('value') amount: number,
  ): Promise<{ message: string }> {
    await this.transfersService.transfer(payerId, payeeId, amount);
    return { message: 'Transfer successful' };
  }
}
