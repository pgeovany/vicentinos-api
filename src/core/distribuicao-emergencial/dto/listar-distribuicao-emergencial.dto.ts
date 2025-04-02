import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsOptional, IsDateString } from 'class-validator';
import { ReforcarISO8601 } from 'src/lib/transformers/reforcarISO8601.transformer';

export class ListarDistribuicoesEmergenciaisDto {
  @ApiProperty({ example: '1', default: '1', required: false })
  @IsNumberString()
  @IsOptional()
  pagina?: string;

  @ApiProperty({ example: '10', default: '15', required: false })
  @IsNumberString()
  @IsOptional()
  quantidade?: string;

  @ApiProperty({ example: '2025-01-01', required: false })
  @IsOptional()
  @IsDateString()
  @ReforcarISO8601('comeco')
  dataInicio?: Date;

  @ApiProperty({ example: '2025-07-01', required: false })
  @IsOptional()
  @IsDateString()
  @ReforcarISO8601('fim')
  dataFim?: Date;
}
