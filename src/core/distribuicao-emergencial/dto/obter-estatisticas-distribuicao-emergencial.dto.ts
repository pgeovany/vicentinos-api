import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsOptional } from 'class-validator';
import { ReforcarISO8601 } from 'src/lib/transformers/reforcarISO8601.transformer';

export class ObterEstatisticasDistribuicaoEmergencialDto {
  @ApiProperty({ example: '2025-01-01', required: false })
  @IsOptional()
  @IsDateString()
  @ReforcarISO8601('comeco')
  dataInicio?: string;

  @ApiProperty({ example: '2025-12-31', required: false })
  @IsOptional()
  @IsDateString()
  @ReforcarISO8601('fim')
  dataFim?: string;
}
