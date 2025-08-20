import { Module } from '@nestjs/common';
import { ContaController } from './conta.controller';
import { ContaService } from './conta.service';

@Module({
  controllers: [ContaController],
  providers: [ContaService],
  exports: [ContaService], 
})
export class ContaModule {}
