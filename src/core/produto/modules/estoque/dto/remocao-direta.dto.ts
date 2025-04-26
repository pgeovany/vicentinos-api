import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsPositive, IsString, Min } from 'class-validator';

export class RemocaoDiretaEstoqueDto {
  @ApiProperty({ example: 'cm8wejfta0000gn0falnw8c2s' })
  @IsNotEmpty()
  @IsString()
  produtoId: string;

  @ApiProperty({ example: 3 })
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  @Min(1)
  quantidade: number;

  @ApiProperty({ example: 'Vencimento' })
  @IsString()
  @IsOptional()
  motivo?: string;
}
