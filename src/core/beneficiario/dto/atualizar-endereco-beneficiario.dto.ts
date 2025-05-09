import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsInt, IsBoolean, IsNotEmpty } from 'class-validator';

export class AtualizarEnderecoBeneficiarioDto {
  @ApiProperty({ example: 'Rua das Flores', required: false })
  @IsOptional()
  @IsString()
  rua?: string;

  @ApiProperty({ example: '123', required: false })
  @IsOptional()
  @IsString()
  numero?: string;

  @ApiProperty({ example: 'Centro', required: false })
  @IsOptional()
  @IsString()
  bairro?: string;

  @ApiProperty({ example: 'São Paulo', required: false })
  @IsOptional()
  @IsString()
  cidade?: string;

  @ApiProperty({ example: '12345-678', required: false })
  @IsOptional()
  @IsString()
  cep?: string;

  @ApiProperty({ example: 'Apto 123', required: false })
  @IsOptional()
  @IsString()
  complemento?: string;

  @ApiProperty({ example: 'Próximo à padaria', required: false })
  @IsOptional()
  @IsString()
  pontoReferencia?: string;

  @ApiProperty({ example: 3 })
  @IsNotEmpty()
  @IsInt()
  numeroComodos: number;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  proprio?: boolean;

  @ApiProperty({ example: false, required: false })
  @IsOptional()
  @IsBoolean()
  financiado?: boolean;

  @ApiProperty({ example: false, required: false })
  @IsOptional()
  @IsBoolean()
  alugado?: boolean;

  @ApiProperty({ example: false, required: false })
  @IsOptional()
  @IsBoolean()
  cedido?: boolean;

  @ApiProperty({ example: false, required: false })
  @IsOptional()
  @IsBoolean()
  heranca?: boolean;

  @ApiProperty({ example: false, required: false })
  @IsOptional()
  @IsBoolean()
  programaSocial?: boolean;

  @ApiProperty({ example: false, required: false })
  @IsOptional()
  @IsBoolean()
  ocupacao?: boolean;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  banheiro?: boolean;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  aguaEncanada?: boolean;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  energiaEletrica?: boolean;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  esgoto?: boolean;
}
