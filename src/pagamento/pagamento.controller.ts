import { Controller, Get } from '@nestjs/common';
import { PagamentoService } from './pagamento.service';

@Controller('/pagamento')
export class PagamentoController {
  constructor(private readonly pagamentoService: PagamentoService) {}

  @Get()
  check() {
    return { 
      status: 'CONTROLLER PAGAMENTO FUNCIONANDO',
      timestamp: new Date().toISOString()
    };
  }
  
}