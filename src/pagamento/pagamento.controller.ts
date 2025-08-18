
import { Controller, Get, Post, Body } from '@nestjs/common';
import { PagamentoService } from './pagamento.service';


@Controller('/pagamento')
export class PagamentoController {
  constructor(private readonly pagamentoService: PagamentoService) {}

  @Post('adicionar')
  adicionarValor(@Body('valor') valor: number) {
    const saldo = this.pagamentoService.adicionarValor(valor);
    return { saldo }; // retornando o saldo pra testar
  }

  @Get('saldo')
  obterSaldo() {
    const saldo = this.pagamentoService.obterSaldo();
    return { saldo }; // pega o saldo 
  }

  @Get()
  check() {
    return { 
      status: 'CONTROLLER PAGAMENTO FUNCIONANDO',
      timestamp: new Date().toISOString()
    };
  }
}