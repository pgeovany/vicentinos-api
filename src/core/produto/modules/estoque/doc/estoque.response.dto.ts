import { ApiProperty } from '@nestjs/swagger';

class MovimentacaoEstoqueResponseDto {
  @ApiProperty({ example: 'cm8wixc8k0001gnldve58i5k5' })
  id: string;

  @ApiProperty({ example: 'cm8wejfta0000gn0falnw8c2s' })
  produtoId: string;

  @ApiProperty({ example: 'ARROZ' })
  produto: string;

  @ApiProperty({ example: 'cm8wejftb0001gn0f7ns3g9hm' })
  estoqueProdutoId: string;

  @ApiProperty({ example: 10 })
  quantidade: number;

  @ApiProperty({ example: 'ENTRADA' })
  tipo: string;

  @ApiProperty({
    example: 'Correção automática: Decremento de 9 unidades',
    description: 'Motivo da movimentação',
    required: false,
  })
  motivo?: string;

  @ApiProperty({ example: '2025-03-31T03:42:55.028Z' })
  criadoEm: string;

  @ApiProperty({ example: '2025-03-31T03:42:55.028Z' })
  atualizadoEm: string;
}

export class ListarMovimentacoesEstoqueResponseDto {
  @ApiProperty({ example: 'cm8wejfta0000gn0falnw8c2s' })
  produtoId?: string;

  @ApiProperty({ example: 'ENTRADA' })
  tipo?: string;

  @ApiProperty({ example: '2023-12-31T03:00:00.000Z' })
  dataInicio?: string;

  @ApiProperty({ example: '2025-10-01T02:59:59.999Z' })
  dataFim?: string;

  @ApiProperty({ example: 1 })
  pagina: number;

  @ApiProperty({ example: 10 })
  quantidade: number;

  @ApiProperty({ example: 5 })
  totalPaginas: number;

  @ApiProperty({ type: [MovimentacaoEstoqueResponseDto] })
  resultado: MovimentacaoEstoqueResponseDto[];
}

export class ListarProdutosMaisNecessitadosResponseDto {
  @ApiProperty({ type: [String], example: ['ARROZ'] })
  produtos: string[];
}
