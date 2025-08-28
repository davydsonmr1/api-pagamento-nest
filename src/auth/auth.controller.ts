
import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';


@Controller('v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: any) {
    const user = await this.authService.validateUser(body.usuario, body.password);
    if (user) {
      return this.authService.login(user);
    }
    return {
      statusCode: HttpStatus.UNAUTHORIZED,
      message: 'Credenciais inválidas',
    };
  }
}