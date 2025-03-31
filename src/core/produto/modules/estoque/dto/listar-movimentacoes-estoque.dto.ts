import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsNumberString, IsOptional, IsString } from 'class-validator';
import { ReforcarISO8601 } from 'src/lib/transformers/reforcarISO8601.transformer';
import { ENUM_TIPO_MOVIMENTACAO_PRODUTO } from 'src/utils/enum/produto.enum';

export class ListarMovimentacoesEstoqueDto {
  @ApiProperty({ example: 'cm8wejfta0000gn0falnw8c2s', required: false })
  @IsString()
  @IsOptional()
  produtoId?: string;

  @ApiProperty({ example: ENUM_TIPO_MOVIMENTACAO_PRODUTO.ENTRADA, required: false })
  @IsOptional()
  @IsEnum(ENUM_TIPO_MOVIMENTACAO_PRODUTO)
  tipo: ENUM_TIPO_MOVIMENTACAO_PRODUTO;

  @ApiProperty({ example: '1', default: '1', required: false })
  @IsNumberString()
  @IsOptional()
  pagina?: string;

  @ApiProperty({ example: '10', default: '15', required: false })
  @IsNumberString()
  @IsOptional()
  quantidade?: string;

  @ApiProperty({ example: '2024-01-01', required: false })
  @IsOptional()
  @IsDateString()
  @ReforcarISO8601()
  dataInicio?: Date;

  @ApiProperty({ example: '2024-01-01', required: false })
  @IsOptional()
  @IsDateString()
  @ReforcarISO8601()
  dataFim?: Date;
}
