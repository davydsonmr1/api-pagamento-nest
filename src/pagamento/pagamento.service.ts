import { Injectable } from '@nestjs/common';
import { ContaService } from '../conta/conta.service';

@Injectable()
export class PagamentoService {
  constructor(private readonly contaService: ContaService) {}
  
  
  pagarParaConta(idConta, valor) {
    return this.contaService.depositar(idConta, valor);
  }
  
  
  transferirEntreContas(idOrigem, idDestino, valor) {
    return this.contaService.transferir(idOrigem, idDestino, valor);
  }
}
