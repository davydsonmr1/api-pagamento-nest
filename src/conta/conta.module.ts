import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ContaController } from './conta.controller';
import { ContaService } from './conta.service';
import { Conta, ContaSchema } from './conta.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Conta.name, schema: ContaSchema }]),
  ],
  controllers: [ContaController],
  providers: [ContaService],
  exports: [ContaService], 
})
export class ContaModule {}
