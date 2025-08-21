import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Conta, ContaDocument } from './conta.schema';

@Injectable()
export class ContaService {
  
  constructor(@InjectModel(Conta.name) private contaModel: Model<ContaDocument>) {}

 
  async criarConta(nome) {
    
    const novaConta = new this.contaModel({
      nome: nome,
      saldo: 0
    });

   
    return await novaConta.save();
  }

  
  async listarContas() {
    return await this.contaModel.find().exec();
  }

  
  async buscarConta(id) {
    return await this.contaModel.findById(id).exec();
  }

  
  async depositar(id, valor) {
    
    const conta = await this.contaModel.findById(id).exec();
    
    
    if (conta) {
      
      conta.saldo = conta.saldo + valor;
      return await conta.save();
    }

    
    return null;
  }

  async transferir(idOrigem, idDestino, valor) {
    
    const contaOrigem = await this.contaModel.findById(idOrigem).exec();
    const contaDestino = await this.contaModel.findById(idDestino).exec();

    
    if (contaOrigem && contaDestino && contaOrigem.saldo >= valor) {
      
      contaOrigem.saldo = contaOrigem.saldo - valor;
      contaDestino.saldo = contaDestino.saldo + valor;
      
      await contaOrigem.save();
      await contaDestino.save();
      
      return {
        contaOrigem: contaOrigem,
        contaDestino: contaDestino
      };
    }
    
    return null;
  }
}
