import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthController } from './health/health.controller';
import { PagamentoModule } from './pagamento/pagamento.module';

@Module({
  imports: [PagamentoModule],
  controllers: [AppController, HealthController],
  providers: [AppService],
})
export class AppModule {}
