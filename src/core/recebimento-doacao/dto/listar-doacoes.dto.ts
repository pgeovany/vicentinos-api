import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsNumberString, IsOptional } from 'class-validator';
import { ReforcarISO8601 } from 'src/lib/transformers/reforcarISO8601.transformer';
import { ENUM_RECEBIMENTO_DOACAO_ORIGEM } from 'src/utils/enum/recebimento-doacao.enum';

export class ListarDoacoesDto {
  @ApiProperty({
    example: ENUM_RECEBIMENTO_DOACAO_ORIGEM.MISSA_DOMINGO,
    enum: ENUM_RECEBIMENTO_DOACAO_ORIGEM,
    required: false,
  })
  @IsOptional()
  @IsEnum(ENUM_RECEBIMENTO_DOACAO_ORIGEM)
  origem?: ENUM_RECEBIMENTO_DOACAO_ORIGEM;

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
