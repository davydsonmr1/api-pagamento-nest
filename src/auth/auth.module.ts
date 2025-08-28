import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: 'teste123',
      signOptions: { expiresIn: '60m' }, 
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
