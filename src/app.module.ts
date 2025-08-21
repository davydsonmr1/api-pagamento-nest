import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthController } from './health/health.controller';
import { SaldoModule } from './saldo/saldo.module';
import { ContaModule } from './conta/conta.module';
import { PagamentoModule } from './pagamento/pagamento.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    SaldoModule, 
    ContaModule, 
    PagamentoModule
  ],
  controllers: [AppController, HealthController],
  providers: [AppService],
})
export class AppModule {}
