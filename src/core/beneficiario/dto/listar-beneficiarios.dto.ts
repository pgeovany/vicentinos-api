import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumberString, IsOptional, IsString } from 'class-validator';
import { ENUM_STATUS_BENEFICIARIO } from 'src/utils/enum/beneficiario.enum';

export class ListarBeneficiariosDto {
  @ApiProperty({ example: 'Maria', required: false })
  @IsOptional()
  @IsString()
  nome?: string;

  @ApiProperty({ example: 'cm8zd745v0001gnulkfa94u9o', required: false })
  @IsOptional()
  @IsString()
  tipoCestaId?: string;

  @ApiProperty({
    example: ENUM_STATUS_BENEFICIARIO.ATIVO,
    required: false,
    enum: ENUM_STATUS_BENEFICIARIO,
  })
  @IsOptional()
  @IsEnum(ENUM_STATUS_BENEFICIARIO)
  status?: ENUM_STATUS_BENEFICIARIO;

  @ApiProperty({ example: '1', required: false })
  @IsNumberString()
  @IsOptional()
  pagina?: string;

  @ApiProperty({ example: '10', required: false })
  @IsNumberString()
  @IsOptional()
  quantidade?: string;
}
