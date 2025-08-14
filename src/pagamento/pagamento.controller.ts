import { Controller, Get } from '@nestjs/common';

@Controller('/pagamento')
export class PagamentoController {
  @Get()
  check() {
    return { status: 'CONTROLLER PAGAMENTO FUNCIONANDO' };
  }
}
