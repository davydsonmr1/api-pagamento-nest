
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class SaldoService {
	private saldo: number = 0;

	adicionarValor(valor: number): number {
		if (valor <= 0) {
			throw new HttpException('O valor a adicionar deve ser maior que zero', HttpStatus.BAD_REQUEST);
		}
		this.saldo += valor;
		return this.saldo;
	}

	obterSaldo(): number {
		return this.saldo;
	}
}
