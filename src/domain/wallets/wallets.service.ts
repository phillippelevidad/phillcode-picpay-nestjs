import { EntityManager } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Wallet } from './wallet.entity';
import { WalletsRepository } from './wallets.repository';

@Injectable()
export class WalletsService {
  constructor(private readonly walletsRepository: WalletsRepository) {}

  async credit(
    userId: number,
    amount: number,
    manager?: EntityManager,
  ): Promise<Wallet> {
    const wallet = await this.findOrCreateWalletByUserId(userId, manager);
    wallet.credit(amount);
    return await this.walletsRepository.saveWallet(wallet, manager);
  }

  async debit(
    userId: number,
    amount: number,
    manager?: EntityManager,
  ): Promise<Wallet> {
    const wallet = await this.findOrCreateWalletByUserId(userId, manager);
    wallet.debit(amount);
    return await this.walletsRepository.saveWallet(wallet, manager);
  }

  async findOrCreateWalletByUserId(
    userId: number,
    manager?: EntityManager,
  ): Promise<Wallet> {
    let wallet = await this.walletsRepository.findByUserId(userId, manager);
    if (!wallet) {
      wallet = Wallet.create(userId);
      wallet = await this.walletsRepository.saveWallet(wallet, manager);
    }
    return wallet;
  }
}
