
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'; 

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}
  async validateUser(username: string, password: string): Promise<any> {

    const user = { username: 'teste', password: 'teste' };
    if (user.username === username && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  //  gerar o token JWT.
  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}