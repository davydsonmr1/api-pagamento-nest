import { Controller, Get } from '@nestjs/common';
import { PagamentoService } from '../pagamento/pagamento.service';

@Controller('/health')
export class HealthController {
  
  @Get()
  check() {
    
    const services = {
      pagamento: {
        status: 'Pagamento Ok',
        timestamp: new Date().toISOString()
      },
    };

    return {
      status: 'Health OK',
      timestamp: new Date().toISOString(),
      services: services
    };
  }
}