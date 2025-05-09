import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsInt, IsBoolean, IsNotEmpty, IsEnum } from 'class-validator';
import { ENUM_TIPO_MORADIA_BENEFICIARIO } from 'src/utils/enum/beneficiario.enum';

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

  @ApiProperty({
    example: ENUM_TIPO_MORADIA_BENEFICIARIO.PROPRIO,
    required: false,
    enum: ENUM_TIPO_MORADIA_BENEFICIARIO,
  })
  @IsOptional()
  @IsEnum(ENUM_TIPO_MORADIA_BENEFICIARIO)
  tipoMoradia?: string;

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
