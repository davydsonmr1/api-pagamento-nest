import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ContaService } from './conta.service';

@Controller('/conta')
export class ContaController {
  constructor(private readonly contaService: ContaService) {}

  
  @Post()
  async criarConta(@Body() body) {
    return await this.contaService.criarConta(body.nome);
  }

  
  @Get()
  async listarContas() {
    return await this.contaService.listarContas();
  }

  
  @Get(':id')
  async buscarConta(@Param('id') id) {
    const conta = await this.contaService.buscarConta(id);
    if (conta) {
      return conta;
    }
    return { mensagem: 'Conta não encontrada' };
  }

  
  @Post('depositar')
  async depositar(@Body() body) {
    const resultado = await this.contaService.depositar(body.id, body.valor);
    if (resultado) {
      return { mensagem: 'Depósito realizado com sucesso', conta: resultado };
    }
    return { mensagem: 'Conta não encontrada' };
  }

  
  @Post('transferir')
  async transferir(@Body() body) {
    const resultado = await this.contaService.transferir(body.idOrigem, body.idDestino, body.valor);
    if (resultado) {
      return { mensagem: 'Transferência realizada com sucesso', resultado };
    }
    return { mensagem: 'Erro ao fazer transferência' };
  }
}
