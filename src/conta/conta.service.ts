import { Injectable } from '@nestjs/common';

// Serviço básico de conta
@Injectable()
export class ContaService {
  // Lista de contas usando array simples
  private contas: any[] = [];

  // Criar uma nova conta
  criarConta(nome) {
    // Criar conta de forma bem simples
    const novaConta = {
      id: Date.now().toString(), // ID baseado no timestamp
      nome: nome,
      saldo: 0
    };

    // Adicionar na lista
    this.contas.push(novaConta);
    
    return novaConta;
  }

  // Listar todas as contas
  listarContas() {
    return this.contas;
  }

  // Buscar uma conta pelo ID
  buscarConta(id) {
    return this.contas.find(conta => conta.id === id);
  }

  // Adicionar dinheiro na conta
  depositar(id, valor) {
    // Encontrar a conta
    const conta = this.buscarConta(id);
    
    // Se encontrou a conta
    if (conta) {
      // Adicionar valor
      conta.saldo = conta.saldo + valor;
      return conta;
    }

    // Não encontrou a conta
    return null;
  }

  // Transferir dinheiro entre contas
  transferir(idOrigem, idDestino, valor) {
    
    const contaOrigem = this.buscarConta(idOrigem);
    const contaDestino = this.buscarConta(idDestino);

    
    if (contaOrigem && contaDestino && contaOrigem.saldo >= valor) {
      
      contaOrigem.saldo = contaOrigem.saldo - valor;
      
      
      contaDestino.saldo = contaDestino.saldo + valor;
      
      return {
        contaOrigem: contaOrigem,
        contaDestino: contaDestino
      };
    }
    
    return null;
  }
}
