import { Controller, Get, Post, Body } from '@nestjs/common';
import { PagamentoService } from './pagamento.service';

@Controller('/pagamento')
export class PagamentoController {
  constructor(private readonly pagamentoService: PagamentoService) {}
  
  
  @Get()
  checar() {
    return {
      mensagem: 'Serviço de pagamento funcionando!',
      hora: new Date().toISOString()
    };
  }
  
  
  @Post('pagar')
  async pagarParaConta(@Body() body) {
    const resultado = await this.pagamentoService.pagarParaConta(body.idConta, body.valor);
    
    if (resultado) {
      return {
        mensagem: 'Pagamento realizado com sucesso!',
        conta: resultado
      };
    }
    
    return {
      mensagem: 'Erro ao realizar pagamento',
      erro: 'Conta não encontrada'
    };
  }
  
  
  @Post('transferir')
  async transferirEntreContas(@Body() body) {
    const resultado = await this.pagamentoService.transferirEntreContas(
      body.idOrigem, 
      body.idDestino, 
      body.valor
    );
    
    if (resultado) {
      return {
        mensagem: 'Transferência realizada com sucesso!',
        resultado
      };
    }
    
    return {
      mensagem: 'Erro ao realizar transferência',
      erro: 'Verifique se as contas existem e se há saldo suficiente'
    };
  }
}
