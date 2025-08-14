import { Controller, Get } from '@nestjs/common';

@Controller('/health')
export class HealthController {
  @Get()
  check() {
    return { status: 'ATE AQUI FUNCIONANDO', timestamp: new Date().toISOString() };
  }
}
