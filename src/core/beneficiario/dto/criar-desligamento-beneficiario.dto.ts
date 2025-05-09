import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CriarDesligamentoBeneficiarioDto {
  @ApiProperty({ example: 'Mudança para outra cidade' })
  @IsString()
  @IsNotEmpty()
  motivo: string;
}
