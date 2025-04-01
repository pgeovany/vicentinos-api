import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class ListarBeneficiariosDto {
  @ApiProperty({ example: 'Maria', required: false })
  @IsOptional()
  @IsString()
  nome?: string;

  @ApiProperty({ example: '1', required: false })
  @IsNumberString()
  @IsOptional()
  pagina?: string;

  @ApiProperty({ example: '10', required: false })
  @IsNumberString()
  @IsOptional()
  quantidade?: string;
}
