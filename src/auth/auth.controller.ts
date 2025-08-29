
import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';


@Controller('v1/auth')
// A classe AuthController é exportada para ser usada no módulo principal da aplicação.
export class AuthController {
  // O construtor injeta uma instância de AuthService.
  // 'private readonly' garante que o serviço só pode ser usado aqui e não pode ser alterado.
  constructor(private readonly authService: AuthService) {}
  // O decorador @Post() mapeia este método para uma requisição POST na rota base, resultando em POST /v1/auth.
  @Post()
  // O decorador @HttpCode(HttpStatus.OK) define o código de status de sucesso da resposta como 200 OK.
  @HttpCode(HttpStatus.OK)
  
  // O método 'login' é assíncrono porque ele precisa 'await' (aguardar) a resposta do AuthService.
  // O decorador @Body() injeta o corpo da requisição HTTP na variável 'body'.
  async login(@Body() body: { usuario: string; password: string }) {
    // A palavra-chave 'await' espera a conclusão do método validateUser antes de continuar.
    // Ele chama o método validateUser do serviço para verificar as credenciais do usuário.
    const user = await this.authService.validateUser(body.usuario, body.password);
    // Se a validação for bem-sucedida (se 'user' tiver um valor e não for null/undefined)...
    if (user) {
      // ... ele chama o método 'login' do serviço para gerar o token.
      // E retorna o token para o cliente.
      return this.authService.login(user);
    }
    // Se a validação falhar (se 'user' for null)...
    // ... ele retorna um objeto com o código de status de não autorizado e uma mensagem de erro.
    return {
      statusCode: HttpStatus.UNAUTHORIZED,
      message: 'Credenciais inválidas',
    };
  }
}