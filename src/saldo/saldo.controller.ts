
import { Controller, Get, Post, Body } from '@nestjs/common';
import { SaldoService } from './saldo.service'; 


@Controller('/saldo')
export class SaldoController {
  constructor(private readonly saldoService: SaldoService) {}

  @Post('adicionar')
  adicionarValor(@Body('valor') valor: number) {
    const saldo = this.saldoService.adicionarValor(valor);
    return { saldo }; 
  }


  @Get('saldo')
  obterSaldo() {
    const saldo = this.saldoService .obterSaldo();
    return { saldo }; 
  }

  @Get()
  check() {
    return { 
      status: 'CONTROLLER PAGAMENTO FUNCIONANDO',
      timestamp: new Date().toISOString()
    };
  }
}

