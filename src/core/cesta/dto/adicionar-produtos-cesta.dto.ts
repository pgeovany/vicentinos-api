import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsInt, Min, ValidateNested, ArrayNotEmpty } from 'class-validator';

class ProdutoCestaDto {
  @ApiProperty({ example: 'cm8wejfta0000gn0falnw8c2s' })
  @IsString()
  @IsNotEmpty()
  produtoId: string;

  @ApiProperty({ example: 5 })
  @IsInt()
  @Min(1)
  quantidade: number;
}

export class AdicionarProdutosCestaDto {
  @ApiProperty({ type: [ProdutoCestaDto] })
  @ValidateNested({ each: true })
  @Type(() => ProdutoCestaDto)
  @ArrayNotEmpty()
  produtos: ProdutoCestaDto[];
}
