import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CriarProdutoDto {
  @ApiProperty({ example: 'ARROZ' })
  @IsString()
  @IsNotEmpty()
  nome: string;
}

export class EditarProdutoDto extends CriarProdutoDto {}
