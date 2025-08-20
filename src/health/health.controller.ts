import { Controller, Get } from '@nestjs/common';
import { SaldoService } from '../saldo/saldo.service';

@Controller('/health')
export class HealthController {
  
  @Get()
  check() {
    
    const services = {
      Saldo: {
        status: 'Saldo Ok',
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