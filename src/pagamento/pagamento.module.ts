import { Module } from '@nestjs/common';
import { PagamentoController } from './pagamento.controller';
import { PagamentoService } from './pagamento.service';
import { ContaModule } from '../conta/conta.module';

@Module({
  imports: [ContaModule], 
  controllers: [PagamentoController],
  providers: [PagamentoService],
})
export class PagamentoModule {}
