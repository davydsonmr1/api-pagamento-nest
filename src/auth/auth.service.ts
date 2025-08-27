
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'; // Importe o serviço JWT

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}
  async validateUser(username: string, password: string): Promise<any> {

    const user = { username: 'user1', password: 'password1' };
    if (user.username === username && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
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