import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthController } from './health/health.controller';
import { SaldoModule } from './saldo/saldo.module';

@Module({
  imports: [SaldoModule],
  controllers: [AppController, HealthController],
  providers: [AppService],
})
export class AppModule {}
