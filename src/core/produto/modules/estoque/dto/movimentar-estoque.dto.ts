import { IsIn, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ENUM_TIPO_MOVIMENTACAO_PRODUTO } from 'src/utils/enum/produto.enum';

export class MovimentarEstoqueDto {
  @IsNotEmpty()
  @IsString()
  produtoId: string;

  @IsNotEmpty()
  @IsIn([ENUM_TIPO_MOVIMENTACAO_PRODUTO.ENTRADA, ENUM_TIPO_MOVIMENTACAO_PRODUTO.SAIDA])
  tipo: ENUM_TIPO_MOVIMENTACAO_PRODUTO.ENTRADA | ENUM_TIPO_MOVIMENTACAO_PRODUTO.SAIDA;

  @IsNotEmpty()
  @IsInt()
  quantidade: number;

  @IsString()
  @IsOptional()
  motivo?: string;
}
