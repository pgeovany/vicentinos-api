import { ApiProperty } from '@nestjs/swagger';

class ItemCestaResponseDto {
  @ApiProperty({ example: 'cm8zbgjap0000gnfh9hmk13gd' })
  id: string;

  @ApiProperty({ example: 'ARROZ' })
  nome: string;

  @ApiProperty({ example: 3 })
  quantidade: number;
}

class TipoCestaDistribuicaoDto {
  @ApiProperty({ example: 'cm8zd745v0001gnulkfa94u9o' })
  id: string;

  @ApiProperty({ example: 'M' })
  nome: string;

  @ApiProperty({ type: [ItemCestaResponseDto] })
  produtos: ItemCestaResponseDto[];
}

class BeneficiarioDistribuicaoDto {
  @ApiProperty({ example: 'cm8wgx5zp000egn92u2409jlc' })
  id: string;

  @ApiProperty({ example: 'João' })
  nome: string;

  @ApiProperty({ type: TipoCestaDistribuicaoDto })
  tipoCesta: TipoCestaDistribuicaoDto;
}

export class CestaResponseDto {
  @ApiProperty({ example: 'cm8zbgjap0000gnfh9hmk13gd' })
  id: string;

  @ApiProperty({ example: 'G' })
  nome: string;

  @ApiProperty({ example: 'ATIVO' })
  status: string;

  @ApiProperty({
    example: 'Cesta básica média',
    description: 'Descrição detalhada do tipo de cesta',
  })
  descricao: string;

  @ApiProperty({ example: '2025-04-02T02:37:12.242Z' })
  criadoEm: string;

  @ApiProperty({ example: '2025-04-02T02:37:12.242Z' })
  atualizadoEm: string;

  @ApiProperty({ type: [ItemCestaResponseDto] })
  produtos: ItemCestaResponseDto[];
}

export class ListarTiposCestasResponseDto {
  @ApiProperty({ type: [CestaResponseDto] })
  cestas: CestaResponseDto[];
}

export class ListarDistribuicoesPendentesResponseDto {
  @ApiProperty({ example: 1 })
  pagina: number;

  @ApiProperty({ example: 15 })
  quantidade: number;

  @ApiProperty({ example: 1 })
  totalPaginas: number;

  @ApiProperty({ example: 3 })
  beneficiariosRestantes: number;

  @ApiProperty({ type: [BeneficiarioDistribuicaoDto] })
  beneficiarios: BeneficiarioDistribuicaoDto[];
}

class BeneficiarioHistoricoDistribuicaoDto {
  @ApiProperty({ example: 'cm8wgxj13000ggn923ull87q6' })
  id: string;

  @ApiProperty({ example: 'José' })
  nome: string;
}

class TipoCestaHistoricoDistribuicaoDto {
  @ApiProperty({ example: 'cm8zd77x90002gnul6aj5w4qp' })
  id: string;

  @ApiProperty({ example: 'G' })
  nome: string;
}

class DistribuicaoHistoricoDto {
  @ApiProperty({ example: 'cm8zfalwb0001gnitrwq8qy02' })
  id: string;

  @ApiProperty({ example: '2025-04-02T04:24:34.139Z' })
  criadoEm: string;

  @ApiProperty({ type: BeneficiarioHistoricoDistribuicaoDto })
  beneficiario: BeneficiarioHistoricoDistribuicaoDto;

  @ApiProperty({ type: TipoCestaHistoricoDistribuicaoDto })
  tipoCesta: TipoCestaHistoricoDistribuicaoDto;
}

export class ListarHistoricoDistribuicoesResponseDto {
  @ApiProperty({ example: '', description: 'Nome usado no filtro' })
  nome: string;

  @ApiProperty({ example: 1 })
  pagina: number;

  @ApiProperty({ example: 15 })
  quantidade: number;

  @ApiProperty({ example: 1 })
  totalPaginas: number;

  @ApiProperty({ example: 2 })
  total: number;

  @ApiProperty({ type: [DistribuicaoHistoricoDto] })
  distribuicoes: DistribuicaoHistoricoDto[];
}
