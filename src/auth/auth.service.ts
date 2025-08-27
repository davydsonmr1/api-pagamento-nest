// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'; // Importe o serviço JWT

@Injectable()
export class AuthService {
  // O constructor injeta o JwtService, tornando-o disponível na classe.
  constructor(private readonly jwtService: JwtService) {}

  // Método que simula a validação de um usuário.
  // IMPORTANTE: Em produção, você faria a validação real aqui.
  async validateUser(username: string, password: string): Promise<any> {
    // Simplesmente para o nosso exemplo.
    const user = { username: 'user1', password: 'password1' };
    
    // Compara as credenciais.
    if (user.username === username && user.password === password) {
      // Se for válido, retorna os dados do usuário.
      const { password, ...result } = user;
      return result;
    }
    // Se não for válido, não retorna nada.
    return null;
  }

  // Método para gerar o token JWT.
  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}