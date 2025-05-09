import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsBoolean, IsString } from 'class-validator';

export class AtualizarSaudeBeneficiarioDto {
  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  cartaoSUS?: boolean;

  @ApiProperty({ example: '1234567890', required: false })
  @IsOptional()
  @IsString()
  numeroCartaoSUS?: string;

  @ApiProperty({ example: 'Clínica da Família Santa Maria', required: false })
  @IsOptional()
  @IsString()
  clinicaFamilia?: string;

  @ApiProperty({ example: 'Posto de Saúde Central', required: false })
  @IsOptional()
  @IsString()
  postoSaude?: string;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  tratamentoHospitalar?: boolean;

  @ApiProperty({ example: 'Hospital São Lucas', required: false })
  @IsOptional()
  @IsString()
  hospital?: string;

  @ApiProperty({ example: 'Tratamento para hipertensão', required: false })
  @IsOptional()
  @IsString()
  tratamentoSaude?: string;

  @ApiProperty({ example: 'Losartana, Atenolol', required: false })
  @IsOptional()
  @IsString()
  medicamentos?: string;

  @ApiProperty({ example: 'Necessita de consulta com cardiologista', required: false })
  @IsOptional()
  @IsString()
  observacao?: string;
}
