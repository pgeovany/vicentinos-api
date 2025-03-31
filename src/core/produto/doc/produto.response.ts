import { ApiProperty } from '@nestjs/swagger';

class EstoqueProdutoResponseDto {
  @ApiProperty({ example: 'cm8wakygc0001gn5g1jyivd3e' })
  id: string;

  @ApiProperty({ example: 'cm8wakygc0000gn5gtzv5m8eh' })
  produtoId: string;

  @ApiProperty({ example: 0 })
  quantidade: number;

  @ApiProperty({ example: '2025-03-30T23:49:20.364Z' })
  criadoEm: string;

  @ApiProperty({ example: '2025-03-30T23:49:20.364Z' })
  atualizadoEm: string;
}

export class ProdutoComEstoqueResponseDto {
  @ApiProperty({ example: 'cm8wakygc0000gn5gtzv5m8eh' })
  id: string;

  @ApiProperty({ example: 'ARROZ' })
  nome: string;

  @ApiProperty({ example: '2025-03-30T23:49:20.364Z' })
  criadoEm: string;

  @ApiProperty({ example: '2025-03-30T23:49:20.364Z' })
  atualizadoEm: string;

  @ApiProperty({ type: EstoqueProdutoResponseDto })
  estoque: EstoqueProdutoResponseDto;
}

export class ListarProdutosResponseDto {
  @ApiProperty({ example: 'Arroz' })
  nome: string;

  @ApiProperty({ example: 1 })
  pagina: number;

  @ApiProperty({ example: 15 })
  quantidade: number;

  @ApiProperty({ example: 1 })
  totalPaginas: number;

  @ApiProperty({ type: [ProdutoComEstoqueResponseDto] })
  resultado: ProdutoComEstoqueResponseDto[];
}
