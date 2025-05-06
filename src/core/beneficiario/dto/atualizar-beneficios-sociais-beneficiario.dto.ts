import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsBoolean, IsString } from 'class-validator';

export class AtualizarBeneficiosSociaisBeneficiarioDto {
  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  bolsaFamilia?: boolean;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  cadUnico?: boolean;

  @ApiProperty({ example: false, required: false })
  @IsOptional()
  @IsBoolean()
  loas?: boolean;

  @ApiProperty({ example: false, required: false })
  @IsOptional()
  @IsBoolean()
  carteiraIdoso?: boolean;

  @ApiProperty({ example: false, required: false })
  @IsOptional()
  @IsBoolean()
  cartaoFamiliaCarioca?: boolean;

  @ApiProperty({ example: false, required: false })
  @IsOptional()
  @IsBoolean()
  minhaCasaMinhaVida?: boolean;

  @ApiProperty({ example: false, required: false })
  @IsOptional()
  @IsBoolean()
  paif?: boolean;

  @ApiProperty({ example: false, required: false })
  @IsOptional()
  @IsBoolean()
  pronatec?: boolean;

  @ApiProperty({ example: false, required: false })
  @IsOptional()
  @IsBoolean()
  aposentadoria?: boolean;

  @ApiProperty({ example: false, required: false })
  @IsOptional()
  @IsBoolean()
  isencaoConcursoPublico?: boolean;

  @ApiProperty({ example: false, required: false })
  @IsOptional()
  @IsBoolean()
  cadastroParaEmprego?: boolean;

  @ApiProperty({ example: false, required: false })
  @IsOptional()
  @IsBoolean()
  tarifaSocialEnergiaEletrica?: boolean;

  @ApiProperty({ example: 'Vale gás', required: false })
  @IsOptional()
  @IsString()
  outrosBeneficios?: string;

  @ApiProperty({ example: 'Aguardando reavaliação do benefício', required: false })
  @IsOptional()
  @IsString()
  observacao?: string;
}
