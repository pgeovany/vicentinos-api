import { ApiProperty } from '@nestjs/swagger';

class EnderecoResponseDto {
  @ApiProperty({ example: 'Rua das Flores' })
  rua: string;

  @ApiProperty({ example: '123' })
  numero: string;

  @ApiProperty({ example: 'Centro' })
  bairro: string;

  @ApiProperty({ example: 'São Paulo' })
  cidade: string;

  @ApiProperty({ example: '12345-678', required: false })
  cep?: string;

  @ApiProperty({ example: 'Apto 123', required: false })
  complemento?: string;
}

class DependenteResponseDto {
  @ApiProperty({ example: 'cm8wejfta0000gn0falnw8c2s' })
  id: string;

  @ApiProperty({ example: 'João da Silva' })
  nome: string;

  @ApiProperty({ example: 'Filho' })
  parentesco: string;
}

class TipoCestaResponseDto {
  @ApiProperty({ example: 'cm8wejfta0000gn0falnw8c2s' })
  id: string;

  @ApiProperty({ example: 'Cesta Básica' })
  nome: string;
}

class HistoricoRecebimentosBeneficiarioResponseDto {
  @ApiProperty({ example: 'cm8wejfta0000gn0falnw8c2s' })
  id: string;

  @ApiProperty({ example: 'cm8wejfta0000gn0falnw8c2s' })
  tipoCestaId: string;

  @ApiProperty({ example: 'G' })
  nomeCesta: string;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  criadoEm: string;
}

export class BeneficiarioResponseDto {
  @ApiProperty({ example: 'cm8wejfta0000gn0falnw8c2s' })
  id: string;

  @ApiProperty({ example: 'Maria da Silva' })
  nome: string;

  @ApiProperty({ example: '123.456.789-00' })
  cpf: string;

  @ApiProperty({ example: '1990-01-01T00:00:00.000Z' })
  dataNascimento: string;

  @ApiProperty({ example: '(11) 99999-9999' })
  telefone: string;

  @ApiProperty({ example: 'maria@email.com' })
  email: string;

  @ApiProperty({ example: '2025-01-01T00:00:00.000Z' })
  criadoEm: Date;

  @ApiProperty({ type: EnderecoResponseDto })
  endereco: EnderecoResponseDto;

  @ApiProperty({ type: TipoCestaResponseDto })
  tipoCesta: TipoCestaResponseDto;

  @ApiProperty({ type: [DependenteResponseDto] })
  dependentes: DependenteResponseDto[];
}

export class BeneficiarioComHistoricoResponseDto extends BeneficiarioResponseDto {
  @ApiProperty({ type: [HistoricoRecebimentosBeneficiarioResponseDto] })
  historicoRecebimentos: HistoricoRecebimentosBeneficiarioResponseDto[];
}

export class ListarBeneficiariosResponseDto {
  @ApiProperty({ example: 'Maria' })
  nome?: string;

  @ApiProperty({ example: 1 })
  pagina: number;

  @ApiProperty({ example: 10 })
  quantidade: number;

  @ApiProperty({ example: 5 })
  totalPaginas: number;

  @ApiProperty({ type: [BeneficiarioResponseDto] })
  resultado: BeneficiarioResponseDto[];
}
