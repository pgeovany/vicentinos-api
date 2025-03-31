import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsIn, IsNumberString, IsOptional, IsString } from 'class-validator';
import { ReforcarISO8601 } from 'src/lib/transformers/reforcarISO8601.transformer';

export class ListarMovimentacoesEstoqueDto {
  @ApiProperty({ example: 'ARROZ', required: false })
  @IsString()
  @IsOptional()
  nome?: string;

  @ApiProperty({ example: 'ENTRADA', enum: ['ENTRADA', 'SAIDA'], required: false })
  @IsOptional()
  @IsIn(['ENTRADA', 'SAIDA'])
  tipo?: 'ENTRADA' | 'SAIDA';

  @ApiProperty({ example: '1', default: '1', required: false })
  @IsNumberString()
  @IsOptional()
  pagina?: string;

  @ApiProperty({ example: '10', default: '15', required: false })
  @IsNumberString()
  @IsOptional()
  quantidade?: string;

  @ApiProperty({ example: '2025-03-01T00:00:00.000Z', required: false })
  @IsOptional()
  @IsDateString()
  @ReforcarISO8601('comeco')
  dataInicio?: Date;

  @ApiProperty({ example: '2025-03-31T00:00:00.000Z', required: false })
  @IsOptional()
  @IsDateString()
  @ReforcarISO8601('fim')
  dataFim?: Date;
}
