import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

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
}
