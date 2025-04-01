import { ApiProperty } from '@nestjs/swagger';
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
} from 'class-validator';
import { ReforcarISO8601 } from 'src/lib/transformers/reforcarISO8601.transformer';
import { SanitizarStringNumerica } from 'src/lib/transformers/sanitizarStringNumerica.transformer';
import { IsCPF } from 'src/lib/validators/documentoFiscal.validator';

class DependenteBeneficiarioDto {
  @ApiProperty({ example: 'João da Silva' })
  @IsString()
  nome: string;

  @ApiProperty({ example: '123.456.789-00', required: false })
  @IsOptional()
  @SanitizarStringNumerica()
  @IsCPF()
  cpf?: string;

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
  @IsOptional()
  @IsString()
  parentesco?: string;
}

export class AdicionarDependentesBeneficiarioDto {
  @ApiProperty({ type: [DependenteBeneficiarioDto] })
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DependenteBeneficiarioDto)
  dependentes: DependenteBeneficiarioDto[];
}
