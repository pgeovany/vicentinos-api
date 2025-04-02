import { Prisma } from '@prisma/client';
import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ENUM_TIPO_MOVIMENTACAO_ESTOQUE } from 'src/utils/enum/estoque.enum';

export class MovimentarEstoqueDto {
  @IsNotEmpty()
  @IsString()
  produtoId: string;

  @IsNotEmpty()
  @IsEnum(ENUM_TIPO_MOVIMENTACAO_ESTOQUE)
  tipo: ENUM_TIPO_MOVIMENTACAO_ESTOQUE;

  @IsNotEmpty()
  @IsInt()
  quantidade: number;

  @IsString()
  @IsOptional()
  motivo?: string;

  @IsOptional()
  prisma?: Prisma.TransactionClient;
}
