import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { ScheduleModule } from '@nestjs/schedule';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    CacheModule.register({
      max: 50,
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    AuthModule,
    CoreModule,
  ],
})
export class AppModule {}
