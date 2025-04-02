import { ApiProperty } from '@nestjs/swagger';

class ProdutoTransparenciaResponseDto {
  @ApiProperty({ example: 'cm8wejfta0000gn0falnw8c2s' })
  id: string;

  @ApiProperty({ example: 'ARROZ' })
  nome: string;

  @ApiProperty({ example: 5 })
  quantidadeNecessaria: number;
}

export class TransparenciaResponseDto {
  @ApiProperty({ example: 'março' })
  mes: string;

  @ApiProperty({ example: 2025 })
  ano: number;

  @ApiProperty({ example: 38 })
  familiasBeneficiadas: number;

  @ApiProperty({ example: 10 })
  atendimentosEmergenciais: number;

  @ApiProperty({ example: 400 })
  totalAlimentosRecebidos: number;

  @ApiProperty({ example: 40 })
  familiasCadastradas: number;

  @ApiProperty({ type: [ProdutoTransparenciaResponseDto] })
  produtosEmNecessidade: ProdutoTransparenciaResponseDto[];
}
