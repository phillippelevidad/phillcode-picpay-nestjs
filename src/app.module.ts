import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationsModule } from './domain/notifications/notifications.module';
import { TransfersModule } from './domain/transfers/transfers.module';
import { UsersModule } from './domain/users/users.module';
import { WalletsModule } from './domain/wallets/wallets.module';
import { EventSourcingModule } from './services/event-sourcing/event-sourcing.module';
import { NotifierModule } from './services/notifier/notifier.module';

@Module({
  imports: [
    // Domain modules
    NotificationsModule,
    TransfersModule,
    UsersModule,
    WalletsModule,

    // Common modules
    EventSourcingModule,
    NotifierModule,

    // Load environment variables
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // TypeORM configuration
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('DATABASE_URL'),
        autoLoadEntities: true,
        synchronize: configService.get<string>('NODE_ENV') === 'development',
      }),
      inject: [ConfigService],
    }),

    // Background processing
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        redis: {
          host: configService.get<string>('REDIS_HOST'),
          port: configService.get<number>('REDIS_PORT'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {}
