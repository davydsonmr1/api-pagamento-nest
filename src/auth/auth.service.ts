// src/auth/auth.service.ts

// Importa a classe Injectable do pacote @nestjs/common.
// O decorador @Injectable() é usado para marcar classes que podem ser gerenciadas pelo sistema de injeção de dependência do Nest.
import { Injectable } from '@nestjs/common';

// Importa o JwtService do pacote @nestjs/jwt.
// O JwtService é um provedor que lida com a criação e validação de JSON Web Tokens (JWTs).
import { JwtService } from '@nestjs/jwt';

// O decorador @Injectable() marca esta classe como um provedor,
// permitindo que ela seja injetada em outros componentes da aplicação, como controladores.
@Injectable()
// A classe AuthService é exportada para ser usada em outros arquivos.
export class AuthService {
  // O construtor é executado quando a classe é criada.
  // Ele usa a injeção de dependência do Nest para obter uma instância do JwtService.
  // 'private readonly' garante que esta instância só possa ser usada dentro desta classe e não possa ser reatribuída.
  constructor(private readonly jwtService: JwtService) { }

  // Este método valida as credenciais de um usuário.
  // Ele recebe um nome de usuário (username) e uma senha (password) como strings.
  // Ele retorna um valor booleano (true ou false).
  validateUser(username: string, password: string): any {
  // Lista de usuários simulados
  const users = [
    { username: 'teste', password: 'teste', id: 1 },
    { username: 'gleison', password: '1234', id: 2 },
    { username: 'ana', password: 'abcd', id: 3 }
  ];

  // Busca usuário válido
  const user = users.find(u => u.username === username && u.password === password);
  return user || false;
}

  // Comentário indicando a função do método a seguir: gerar o token JWT.
  // A palavra-chave 'async' indica que este método é assíncrono.
  async login(user: any) {
    // Cria o 'payload' do token, que são os dados que o token irá carregar.
    // Aqui, ele inclui o nome de usuário e o ID do usuário (sub é um padrão JWT para o ID).
    const payload = { username: user.username, sub: user.id };

    // Retorna um objeto com uma propriedade 'token'.
    return {
      // Usa o método 'sign()' do JwtService para assinar o payload e gerar o token.
      token: this.jwtService.sign(payload),
    };
  }
}