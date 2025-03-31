import { ApiProperty } from '@nestjs/swagger';

class ItemDoacaoResponseDto {
  @ApiProperty({ example: 'cm8wejfta0000gn0falnw8c2s' })
  id: string;

  @ApiProperty({ example: 'ARROZ' })
  nome: string;

  @ApiProperty({ example: 8 })
  quantidade: number;
}

export class RecebimentoDoacaoResponseDto {
  @ApiProperty({ example: 'cm8xa42540000gn04gsk3vjqu' })
  id: string;

  @ApiProperty({ example: 'MISSA_DOMINGO' })
  origem: string;

  @ApiProperty({ example: '2025-03-31T16:23:58.169Z' })
  criadoEm: Date;

  @ApiProperty({ type: [ItemDoacaoResponseDto] })
  itens: ItemDoacaoResponseDto[];
}

export class ListarRecebimentoDoacoesResponseDto {
  @ApiProperty({ example: 'MISSA_DOMINGO' })
  origem?: string;

  @ApiProperty({ example: 1 })
  pagina: number;

  @ApiProperty({ example: 15 })
  quantidade: number;

  @ApiProperty({ example: 1 })
  totalPaginas: number;

  @ApiProperty({ type: [RecebimentoDoacaoResponseDto] })
  resultado: RecebimentoDoacaoResponseDto[];
}

class TotalPorOrigem {
  @ApiProperty({ example: 'MISSA_DOMINGO' })
  origem: string;

  @ApiProperty({ example: 42 })
  total: number;
}

class ProdutoDoacaoEstatisticaResponseDto {
  @ApiProperty({ example: 'ARROZ' })
  nome: string;

  @ApiProperty({ example: 150 })
  quantidade: number;
}

export class EstatisticasDoacoesResponseDto {
  @ApiProperty({ example: '2023-12-31T03:00:00.000Z' })
  dataInicio?: string;

  @ApiProperty({ example: '2025-10-01T02:59:59.999Z' })
  dataFim?: string;

  @ApiProperty({ example: 100 })
  totalDoacoes: number;

  @ApiProperty({ example: 450 })
  totalItensDoados: number;

  @ApiProperty({ example: 4.5 })
  mediaItensPorDoacao: number;

  @ApiProperty({ type: [TotalPorOrigem] })
  totalPorOrigem: TotalPorOrigem[];

  @ApiProperty({ type: [ProdutoDoacaoEstatisticaResponseDto] })
  produtos: ProdutoDoacaoEstatisticaResponseDto[];
}
