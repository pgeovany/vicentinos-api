import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsEmail,
  IsDateString,
  IsPhoneNumber,
  IsNotEmpty,
  IsBoolean,
  IsEnum,
} from 'class-validator';
import { ReforcarISO8601 } from 'src/lib/transformers/reforcarISO8601.transformer';
import { SanitizarStringNumerica } from 'src/lib/transformers/sanitizarStringNumerica.transformer';
import { IsCPF } from 'src/lib/validators/documentoFiscal.validator';
import {
  ENUM_ESTADO_CIVIL_BENEFICIARIO,
  ENUM_SEXO_BENEFICIARIO,
} from 'src/utils/enum/beneficiario.enum';

export class CriarBeneficiarioDto {
  @ApiProperty({ example: 'jklasdjfkl32jm', required: false })
  @IsString()
  @IsOptional()
  beneficiarioId?: string;

  @ApiProperty({ example: 'Maria da Silva' })
  @IsString()
  @IsNotEmpty()
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

  @ApiProperty({ example: ENUM_SEXO_BENEFICIARIO.MASCULINO })
  @IsEnum(ENUM_SEXO_BENEFICIARIO)
  @IsNotEmpty()
  sexo: ENUM_SEXO_BENEFICIARIO;

  @ApiProperty({ example: '1990-01-01', required: false })
  @IsOptional()
  @IsDateString()
  @ReforcarISO8601()
  dataNascimento?: Date;

  @ApiProperty({ example: '(11) 99999-9999', required: false })
  @IsOptional()
  @IsPhoneNumber('BR')
  telefone?: string;

  @ApiProperty({ example: ENUM_ESTADO_CIVIL_BENEFICIARIO.CASADO, required: false })
  @IsEnum(ENUM_ESTADO_CIVIL_BENEFICIARIO)
  @IsNotEmpty()
  @IsString()
  estadoCivil: ENUM_ESTADO_CIVIL_BENEFICIARIO;

  @ApiProperty({ example: 'Professora', required: false })
  @IsOptional()
  @IsString()
  profissao?: string;

  @ApiProperty({ example: 'Até 1 salário mínimo', required: false })
  @IsOptional()
  @IsString()
  rendaMensal?: string;

  @ApiProperty({ example: false, required: false })
  @IsOptional()
  @IsBoolean()
  pessoaComDeficiencia?: boolean;
}
