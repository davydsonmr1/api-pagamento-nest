import { Injectable } from '@nestjs/common';
import { ContaService } from '../conta/conta.service';

@Injectable()
export class PagamentoService {
  constructor(private readonly contaService: ContaService) {}
  
  
  async pagarParaConta(idConta, valor) {
    return await this.contaService.depositar(idConta, valor);
  }
  
  
  async transferirEntreContas(idOrigem, idDestino, valor) {
    return await this.contaService.transferir(idOrigem, idDestino, valor);
  }
}
