
import { Injectable } from '@nestjs/common';

@Injectable()
export class PagamentoService {
	private saldo: number = 0;

	adicionarValor(valor: number): number {
		this.saldo += valor;
		return this.saldo;
	}

	obterSaldo(): number {
		return this.saldo;
	}
}
