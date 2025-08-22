import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ContaDocument = Conta & Document;

@Schema()
export class Conta {
  @Prop({ required: true })
  nome: string;

  @Prop({ default: 0 })
  saldo: number;
}

export const ContaSchema = SchemaFactory.createForClass(Conta);
