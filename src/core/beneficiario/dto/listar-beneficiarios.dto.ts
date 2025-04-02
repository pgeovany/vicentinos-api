import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class ListarBeneficiariosDto {
  @ApiProperty({ example: 'Maria', required: false })
  @IsOptional()
  @IsString()
  nome?: string;

  @ApiProperty({ example: 'cm8zd745v0001gnulkfa94u9o', required: false })
  @IsOptional()
  @IsString()
  tipoCestaId?: string;

  @ApiProperty({ example: '1', required: false })
  @IsNumberString()
  @IsOptional()
  pagina?: string;

  @ApiProperty({ example: '10', required: false })
  @IsNumberString()
  @IsOptional()
  quantidade?: string;
}
