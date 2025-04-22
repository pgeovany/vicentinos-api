import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CriarCestaDto {
  @ApiProperty({ example: 'M' })
  @IsString()
  @IsNotEmpty()
  nome: string;

  @ApiProperty({ example: 'Cesta básica média', required: false })
  @IsString()
  @IsOptional()
  descricao?: string;
}
