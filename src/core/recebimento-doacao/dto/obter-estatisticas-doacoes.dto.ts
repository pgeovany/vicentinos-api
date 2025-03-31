import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsOptional } from 'class-validator';
import { ReforcarISO8601 } from 'src/lib/transformers/reforcarISO8601.transformer';
import { ENUM_RECEBIMENTO_DOACAO_ORIGEM } from 'src/utils/enum/recebimento-doacao.enum';

export class ObterEstatisticasDoacoesDto {
  @ApiProperty({
    enum: ENUM_RECEBIMENTO_DOACAO_ORIGEM,
    example: ENUM_RECEBIMENTO_DOACAO_ORIGEM.MISSA_DOMINGO,
    required: false,
  })
  @IsOptional()
  @IsEnum(ENUM_RECEBIMENTO_DOACAO_ORIGEM)
  origem?: ENUM_RECEBIMENTO_DOACAO_ORIGEM;

  @ApiProperty({
    example: '2025-03-01T00:00:00.000Z',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  @ReforcarISO8601('comeco')
  dataInicio?: Date;

  @ApiProperty({
    example: '2025-03-31T00:00:00.000Z',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  @ReforcarISO8601('fim')
  dataFim?: Date;
}
