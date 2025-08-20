import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthController } from './health/health.controller';
import { SaldoModule } from './saldo/saldo.module';
import { ContaModule } from './conta/conta.module';
import { PagamentoModule } from './pagamento/pagamento.module';

@Module({
  imports: [SaldoModule, ContaModule, PagamentoModule],
  controllers: [AppController, HealthController],
  providers: [AppService],
})
export class AppModule {}
