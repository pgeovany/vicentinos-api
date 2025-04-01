import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AtualizarTipoCestaDto {
  @ApiProperty({ example: 'cm8wejfta0000gn0falnw8c2s' })
  @IsString()
  @IsNotEmpty()
  tipoCestaId: string;
}
