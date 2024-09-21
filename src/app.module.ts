import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { StaffModule } from './staff/staff.module';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [
    UsersModule,
    DatabaseModule,
    StaffModule,
    //apply rate limit
    ThrottlerModule.forRoot([
      {
        name: 'long',
        ttl: 60000,
        limit: 10,
      },
      {
        name: 'short',
        ttl: 1000,
        limit: 2,
      },
    ]),
    LoggerModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
