import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsEmail,
  IsDateString,
  IsPhoneNumber,
  IsNotEmpty,
} from 'class-validator';
import { ReforcarISO8601 } from 'src/lib/transformers/reforcarISO8601.transformer';
import { SanitizarStringNumerica } from 'src/lib/transformers/sanitizarStringNumerica.transformer';
import { IsCPF } from 'src/lib/validators/documentoFiscal.validator';

export class CriarBeneficiarioDto {
  @ApiProperty({ example: 'jklasdjfkl32jm' })
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

  @ApiProperty({ example: '1990-01-01', required: false })
  @IsOptional()
  @IsDateString()
  @ReforcarISO8601()
  dataNascimento?: Date;

  @ApiProperty({ example: '(11) 99999-9999', required: false })
  @IsOptional()
  @IsPhoneNumber('BR')
  telefone?: string;

  @ApiProperty({ example: 'maria@email.com', required: false })
  @IsOptional()
  @IsEmail()
  email?: string;
}
