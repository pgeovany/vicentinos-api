import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  IsOptional,
  IsDateString,
  IsPhoneNumber,
  IsEmail,
  IsNotEmpty,
  IsArray,
  ValidateNested,
  IsEnum,
} from 'class-validator';
import { ReforcarISO8601 } from 'src/lib/transformers/reforcarISO8601.transformer';
import { SanitizarStringNumerica } from 'src/lib/transformers/sanitizarStringNumerica.transformer';
import { IsCPF } from 'src/lib/validators/documentoFiscal.validator';
import { ENUM_SEXO_BENEFICIARIO } from 'src/utils/enum/beneficiario.enum';

class DependenteBeneficiarioDto {
  @ApiProperty({ example: 'João da Silva' })
  @IsString()
  nome: string;

  @ApiProperty({ example: '123.456.789-00', required: false })
  @IsOptional()
  @SanitizarStringNumerica()
  @IsCPF()
  cpf?: string;

  @ApiProperty({ example: '22.444.111-9', required: false })
  @IsOptional()
  @SanitizarStringNumerica()
  rg?: string;

  @ApiProperty({ example: '123456789', required: false })
  @IsOptional()
  @IsString()
  certidaoNascimento?: string;

  @ApiProperty({ example: '1990-01-01', required: false })
  @IsOptional()
  @IsDateString()
  @ReforcarISO8601()
  dataNascimento?: Date;

  @ApiProperty({ example: '(11) 99999-9999', required: false })
  @IsOptional()
  @IsPhoneNumber('BR')
  telefone?: string;

  @ApiProperty({ example: 'joao@email.com', required: false })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ example: 'Filho', required: false })
  @IsString()
  @IsNotEmpty()
  parentesco: string;

  @ApiProperty({ example: 'ENSINO_MEDIO', required: false })
  @IsOptional()
  @IsString()
  escolaridade?: string;

  @ApiProperty({ example: ENUM_SEXO_BENEFICIARIO.MASCULINO })
  @IsEnum(ENUM_SEXO_BENEFICIARIO)
  @IsNotEmpty()
  sexo: ENUM_SEXO_BENEFICIARIO;

  @ApiProperty({ example: 'Até 1 salário mínimo', required: false })
  @IsOptional()
  @IsString()
  rendaMensal?: string;

  @ApiProperty({ example: 'Formal', required: false })
  @IsOptional()
  @IsString()
  trabalho?: string;

  @ApiProperty({ example: 'Observações sobre o dependente', required: false })
  @IsOptional()
  @IsString()
  observacao?: string;
}

export class AdicionarDependentesBeneficiarioDto {
  @ApiProperty({ type: [DependenteBeneficiarioDto] })
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DependenteBeneficiarioDto)
  dependentes: DependenteBeneficiarioDto[];
}

export class EditarDependenteDto extends PartialType(DependenteBeneficiarioDto) {}
