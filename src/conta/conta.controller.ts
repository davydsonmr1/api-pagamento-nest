import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ContaService } from './conta.service';

@Controller('conta')
export class ContaController {
  constructor(private readonly contaService: ContaService) {}

  
  @Post()
  criarConta(@Body() body) {
    return this.contaService.criarConta(body.nome);
  }

  
  @Get()
  listarContas() {
    return this.contaService.listarContas();
  }

  
  @Get(':id')
  buscarConta(@Param('id') id) {
    const conta = this.contaService.buscarConta(id);
    if (conta) {
      return conta;
    }
    return { mensagem: 'Conta não encontrada' };
  }

  
  @Post('depositar')
  depositar(@Body() body) {
    const resultado = this.contaService.depositar(body.id, body.valor);
    if (resultado) {
      return { mensagem: 'Depósito realizado com sucesso', conta: resultado };
    }
    return { mensagem: 'Conta não encontrada' };
  }

  
  @Post('transferir')
  transferir(@Body() body) {
    const resultado = this.contaService.transferir(body.idOrigem, body.idDestino, body.valor);
    if (resultado) {
      return { mensagem: 'Transferência realizada com sucesso', resultado };
    }
    return { mensagem: 'Erro ao fazer transferência' };
  }
}
