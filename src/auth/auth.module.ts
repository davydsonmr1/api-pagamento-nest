
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

// O decorador @Module() define a classe como um módulo do NestJS.
// O objeto de configuração dentro do decorador define as partes do módulo.
@Module({
  // A propriedade 'imports' é um array que lista os módulos que este módulo usa.
  imports: [
    // O JwtModule.register() é usado para configurar o módulo JWT.
    JwtModule.register({
      // A propriedade 'secret' é a chave secreta usada para assinar e verificar o token.
      // Em produção, este valor deve ser uma variável de ambiente, nunca fixo no código.
      secret: 'teste123',
      // 'signOptions' define as opções para o token.
      signOptions: { 
        // 'expiresIn' determina o tempo de vida do token. '60m' significa 60 minutos.
        expiresIn: '60m' 
      }, 
    }),
  ],
  // A propriedade 'providers' é um array que lista os serviços e provedores deste módulo.
  // NestJS usará esses provedores para a injeção de dependência.
  providers: [AuthService, JwtStrategy],
  // A propriedade 'controllers' lista os controladores que pertencem a este módulo.
  // Eles serão instanciados e mapeados para suas rotas.
  controllers: [AuthController]
})
// A classe AuthModule é exportada para que possa ser importada pelo AppModule (o módulo raiz da sua aplicação).
export class AuthModule {}