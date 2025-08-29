
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'; 

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}
  validateUser(username: string, password: string): boolean {
    const user = { username: 'teste', password: 'teste' };
    const userId = 1; 
      if (user.username === username && user.password === password) {
      return true;
    }
    return false;
  }

  //  gerar o token JWT.
  async login(user: any) {
    const payload = { username: user.username , sub: 1 };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}