import { hashPassword } from 'src/utils/hash-password';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './user.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async getUser(userId: number): Promise<User | undefined> {
    return this.usersRepository.findOne({
      where: { id: userId },
    });
  }

  async registerUser(dto: CreateUserDto): Promise<User> {
    const { cpfCnpj, email } = dto;
    const existingUser = await this.usersRepository.findOne({
      where: [{ cpfCnpj }, { email }],
    });

    if (existingUser) {
      throw new BadRequestException('CPF/CNPJ or Email already exists');
    }

    const hashedPassword = await hashPassword(dto.password);

    const user = this.usersRepository.create({
      ...dto,
      password: hashedPassword,
    });

    return this.usersRepository.save(user);
  }
}
