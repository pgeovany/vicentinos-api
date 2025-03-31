import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumberString, IsDateString } from 'class-validator';
import { ReforcarISO8601 } from 'src/lib/transformers/reforcarISO8601.transformer';

export class ListarEntradasESaidas {
  @ApiProperty({ example: 'ARROZ', required: false })
  @IsString()
  @IsOptional()
  nome?: string;

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
