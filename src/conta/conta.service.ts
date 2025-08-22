import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Conta, ContaDocument } from './conta.schema';
import { HttpException, HttpStatus } from '@nestjs/common';

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
    const conta = await this.contaModel.findById(id).exec();
    if (!conta) {
      throw new HttpException('Conta não encontrada', HttpStatus.NOT_FOUND);
    }
    return conta;
  }

  
  async depositar(id, valor) {
    
    const conta = await this.contaModel.findById(id).exec();
    
    
    if (!conta) {
      throw new HttpException('Conta não encontrada', HttpStatus.NOT_FOUND);
    }
      
    if (valor <= 0) {
      throw new HttpException('O valor do depósito deve ser maior que zero', HttpStatus.BAD_REQUEST);
    }
    
    conta.saldo = conta.saldo + valor;
    return await conta.save();
  }

  async transferir(idOrigem, idDestino, valor) {
    
    const contaOrigem = await this.contaModel.findById(idOrigem).exec();
    if (!contaOrigem) {
      throw new HttpException('Conta de origem não encontrada', HttpStatus.NOT_FOUND);
    }
    
    const contaDestino = await this.contaModel.findById(idDestino).exec();
    if (!contaDestino) {
      throw new HttpException('Conta de destino não encontrada', HttpStatus.NOT_FOUND);
    }
    
    if (valor <= 0) {
      throw new HttpException('O valor da transferência deve ser maior que zero', HttpStatus.BAD_REQUEST);
    }
    
    if (contaOrigem.saldo < valor) {
      throw new HttpException('Saldo insuficiente', HttpStatus.BAD_REQUEST);
    }
    
    contaOrigem.saldo = contaOrigem.saldo - valor;
    contaDestino.saldo = contaDestino.saldo + valor;
    
    await contaOrigem.save();
    await contaDestino.save();
    
    return {
      contaOrigem: contaOrigem,
      contaDestino: contaDestino
    };
  }

  async deletarConta(id) {
    const conta = await this.contaModel.findById(id).exec();
    
    if (!conta) {
      throw new HttpException('Conta não encontrada', HttpStatus.NOT_FOUND);
    }

    if (conta.saldo > 0) {
      throw new HttpException('Não é possível deletar conta com saldo positivo. Transfira o saldo antes de deletar.', HttpStatus.BAD_REQUEST);
    }
    
    const resultado = await this.contaModel.findByIdAndDelete(id).exec();
    return resultado;
  }
}
