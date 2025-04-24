import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsNumberString, IsOptional, IsString, Max, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class ListarHistoricoDistribuicoesDto {
  @ApiProperty({ example: 4, description: 'Mês (0-12)' })
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(12)
  @Transform(({ value }) => +value)
  mes: number;

  @ApiProperty({ example: 2025 })
  @IsNotEmpty()
  @IsInt()
  @Min(2020)
  @Transform(({ value }) => +value)
  ano: number;

  @ApiProperty({ example: 'Maria', required: false })
  @IsOptional()
  @IsString()
  nome?: string;

  @ApiProperty({ example: 'cm8zd745v0001gnulkfa94u9o', required: false })
  @IsOptional()
  @IsString()
  tipoCestaId?: string;

  @ApiProperty({ example: '1', default: '1', required: false })
  @IsNumberString()
  @IsOptional()
  pagina?: string;

  @ApiProperty({ example: '10', default: '15', required: false })
  @IsNumberString()
  @IsOptional()
  quantidade?: string;
}
