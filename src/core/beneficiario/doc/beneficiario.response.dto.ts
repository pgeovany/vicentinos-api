import { ApiProperty } from '@nestjs/swagger';

class EnderecoResponseDto {
  @ApiProperty({ example: 'cm8wejfta0000gn0falnw8c2s' })
  id: string;

  @ApiProperty({ example: 'cm8wejfta0000gn0falnw8c2s' })
  beneficiarioId: string;

  @ApiProperty({ example: 'Rua das Flores' })
  rua?: string | null;

  @ApiProperty({ example: '123' })
  numero?: string | null;

  @ApiProperty({ example: 'Centro' })
  bairro?: string | null;

  @ApiProperty({ example: 'São Paulo' })
  cidade?: string | null;

  @ApiProperty({ example: '12345-678' })
  cep?: string | null;

  @ApiProperty({ example: 'Apto 123' })
  complemento?: string | null;

  @ApiProperty({ example: 'Próximo à padaria' })
  pontoReferencia?: string | null;

  @ApiProperty({ example: 3 })
  numeroComodos: number;

  @ApiProperty({ example: true })
  proprio: boolean;

  @ApiProperty({ example: false })
  financiado: boolean;

  @ApiProperty({ example: false })
  alugado: boolean;

  @ApiProperty({ example: false })
  cedido: boolean;

  @ApiProperty({ example: false })
  heranca: boolean;

  @ApiProperty({ example: false })
  programaSocial: boolean;

  @ApiProperty({ example: false })
  ocupacao: boolean;

  @ApiProperty({ example: true })
  banheiro: boolean;

  @ApiProperty({ example: true })
  aguaEncanada: boolean;

  @ApiProperty({ example: true })
  energiaEletrica: boolean;

  @ApiProperty({ example: true })
  esgoto: boolean;
}

class BeneficiosSociaisResponseDto {
  @ApiProperty({ example: 'cm8wejfta0000gn0falnw8c2s' })
  id: string;

  @ApiProperty({ example: 'cm8wejfta0000gn0falnw8c2s' })
  beneficiarioId: string;

  @ApiProperty({ example: true })
  bolsaFamilia: boolean;

  @ApiProperty({ example: true })
  cadUnico: boolean;

  @ApiProperty({ example: false })
  loas: boolean;

  @ApiProperty({ example: false })
  carteiraIdoso: boolean;

  @ApiProperty({ example: false })
  cartaoFamiliaCarioca: boolean;

  @ApiProperty({ example: false })
  minhaCasaMinhaVida: boolean;

  @ApiProperty({ example: false })
  paif: boolean;

  @ApiProperty({ example: false })
  pronatec: boolean;

  @ApiProperty({ example: false })
  aposentadoria: boolean;

  @ApiProperty({ example: false })
  isencaoConcursoPublico: boolean;

  @ApiProperty({ example: false })
  cadastroParaEmprego: boolean;

  @ApiProperty({ example: false })
  tarifaSocialEnergiaEletrica: boolean;

  @ApiProperty({ example: 'Vale gás' })
  outrosBeneficios: string | null;

  @ApiProperty({ example: 'Aguardando reavaliação do benefício' })
  observacao: string | null;
}

class SaudeResponseDto {
  @ApiProperty({ example: 'cm8wejfta0000gn0falnw8c2s' })
  id: string;

  @ApiProperty({ example: 'cm8wejfta0000gn0falnw8c2s' })
  beneficiarioId: string;

  @ApiProperty({ example: true })
  cartaoSUS: boolean | null;

  @ApiProperty({ example: '123456789012345' })
  numeroCartaoSUS: string | null;

  @ApiProperty({ example: 'Clínica da Família Santa Maria' })
  clinicaFamilia: string | null;

  @ApiProperty({ example: 'Posto de Saúde Central' })
  postoSaude: string | null;

  @ApiProperty({ example: true })
  tratamentoHospitalar: boolean | null;

  @ApiProperty({ example: 'Hospital São Lucas' })
  hospital: string | null;

  @ApiProperty({ example: 'Tratamento para hipertensão' })
  tratamentoSaude: string | null;

  @ApiProperty({ example: 'Losartana, Atenolol' })
  medicamentos: string | null;

  @ApiProperty({ example: 'Necessita de consulta com cardiologista' })
  observacao: string | null;
}

class InteressesResponseDto {
  @ApiProperty({ example: 'cm8wejfta0000gn0falnw8c2s' })
  id: string;

  @ApiProperty({ example: 'cm8wejfta0000gn0falnw8c2s' })
  beneficiarioId: string;

  // Palestras
  @ApiProperty({ example: true })
  programasSociais: boolean;

  @ApiProperty({ example: false })
  violenciaDomestica: boolean;

  @ApiProperty({ example: false })
  dependenciaQuimica: boolean;

  @ApiProperty({ example: true })
  meioAmbiente: boolean;

  @ApiProperty({ example: true })
  documentacaoPessoal: boolean;

  @ApiProperty({ example: true })
  saudeGeral: boolean;

  @ApiProperty({ example: false })
  empreendedorismo: boolean;

  @ApiProperty({ example: true })
  sustentabilidade: boolean;

  // Cursos
  @ApiProperty({ example: false })
  pinturaEmTecido: boolean;

  @ApiProperty({ example: true })
  bijuteria: boolean;

  @ApiProperty({ example: false })
  cestaria: boolean;

  @ApiProperty({ example: true })
  costura: boolean;

  @ApiProperty({ example: true })
  bordado: boolean;

  @ApiProperty({ example: false })
  croche: boolean;

  @ApiProperty({ example: false })
  trico: boolean;

  @ApiProperty({ example: false })
  teatro: boolean;

  @ApiProperty({ example: true })
  reciclagem: boolean;

  @ApiProperty({ example: true })
  informatica: boolean;

  @ApiProperty({ example: true })
  cursos: boolean;

  @ApiProperty({ example: false })
  alfabetizacao: boolean;
}

class DependenteResponseDto {
  @ApiProperty({ example: 'cm8wejfta0000gn0falnw8c2s' })
  id: string;

  @ApiProperty({ example: 'cm8wejfta0000gn0falnw8c2s' })
  beneficiarioId: string;

  @ApiProperty({ example: 'João da Silva' })
  nome: string;

  @ApiProperty({ example: '123.456.789-00' })
  cpf?: string | null;

  @ApiProperty({ example: '22.444.111-9' })
  rg?: string | null;

  @ApiProperty({ example: '123456789' })
  certidaoNascimento?: string | null;

  @ApiProperty({ example: 'Filho' })
  parentesco: string;

  @ApiProperty({ example: 'ENSINO_MEDIO' })
  escolaridade: string | null;

  @ApiProperty({ example: 'MASCULINO' })
  sexo: string;

  @ApiProperty({ example: '2015-01-01' })
  dataNascimento?: Date | null;

  @ApiProperty({ example: '1500' })
  rendaMensal: string | null;

  @ApiProperty({ example: 'Vendedor' })
  trabalho: string | null;

  @ApiProperty({ example: 'Observações sobre o dependente' })
  observacao: string | null;
}

class DesligamentoResponseDto {
  @ApiProperty({ example: 'cm8wejfta0000gn0falnw8c2s' })
  id: string;

  @ApiProperty({ example: 'Mudança para outra cidade' })
  motivo: string | null;

  @ApiProperty({ example: '2025-05-01T00:00:00.000Z' })
  criadoEm: Date;
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
  tipoCestaId?: string | null;

  @ApiProperty({ example: 'Cesta Básica Família' })
  nomeCesta?: string | null;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  criadoEm: Date;
}

class BeneficiarioNaListaResponseDto {
  @ApiProperty({ example: 'cm8wejfta0000gn0falnw8c2s' })
  id: string;

  @ApiProperty({ example: 'Maria da Silva' })
  nome: string;

  @ApiProperty({ example: 'ATIVO' })
  status: string;

  @ApiProperty({ example: '2025-01-01T00:00:00.000Z' })
  efetivadoEm?: Date | null;

  @ApiProperty({ type: TipoCestaResponseDto })
  tipoCesta?: TipoCestaResponseDto | null;
}

export class BeneficiarioResponseDto {
  @ApiProperty({ example: 'cm8wejfta0000gn0falnw8c2s' })
  id: string;

  @ApiProperty({ example: 'Maria da Silva' })
  nome: string;

  @ApiProperty({ example: 'ATIVO' })
  status: string;

  @ApiProperty({ example: '123.456.789-00' })
  cpf: string | null;

  @ApiProperty({ example: '22.444.111-9' })
  rg: string | null;

  @ApiProperty({ example: 'F' })
  sexo: string;

  @ApiProperty({ example: '1990-01-01T00:00:00.000Z' })
  dataNascimento: Date | null;

  @ApiProperty({ example: '(11) 99999-9999' })
  telefone: string | null;

  @ApiProperty({ example: 'CASADO' })
  estadoCivil: string | null;

  @ApiProperty({ example: 'Professora' })
  profissao: string | null;

  @ApiProperty({ example: 'Até 1 salário mínimo' })
  rendaMensal: string | null;

  @ApiProperty({ example: 'cm8wejfta0000gn0falnw8c2f' })
  tipoCestaId: string | null;

  @ApiProperty({ example: false })
  pessoaComDeficiencia: boolean;

  @ApiProperty({ example: '2025-01-01T00:00:00.000Z' })
  efetivadoEm?: Date | null;

  @ApiProperty({ example: '2025-01-01T00:00:00.000Z' })
  criadoEm: Date;

  @ApiProperty({ example: '2025-01-01T00:00:00.000Z' })
  atualizadoEm: Date | null;

  @ApiProperty({ type: EnderecoResponseDto })
  endereco?: EnderecoResponseDto | null;

  @ApiProperty({ type: BeneficiosSociaisResponseDto })
  beneficiosSociais?: BeneficiosSociaisResponseDto | null;

  @ApiProperty({ type: SaudeResponseDto })
  saude?: SaudeResponseDto | null;

  @ApiProperty({ type: InteressesResponseDto })
  interesses?: InteressesResponseDto | null;

  @ApiProperty({ type: TipoCestaResponseDto })
  tipoCesta?: TipoCestaResponseDto | null;

  @ApiProperty({ type: [DependenteResponseDto] })
  dependentes: DependenteResponseDto[];

  @ApiProperty({ type: [DesligamentoResponseDto] })
  historicoDesligamentos: DesligamentoResponseDto[];
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

  @ApiProperty({ type: [BeneficiarioNaListaResponseDto] })
  resultado: BeneficiarioNaListaResponseDto[];
}

export class CriarBeneficiarioResponseDto {
  @ApiProperty({ example: 'cm8wejfta0000gn0falnw8c2s' })
  id: string;

  @ApiProperty({ example: 'Maria da Silva' })
  nome: string;

  @ApiProperty({ example: 'ATIVO' })
  status: string;

  @ApiProperty({ example: '123.456.789-00' })
  cpf: string | null;

  @ApiProperty({ example: '22.444.111-9' })
  rg: string | null;

  @ApiProperty({ example: 'F' })
  sexo: string;

  @ApiProperty({ example: '1990-01-01T00:00:00.000Z' })
  dataNascimento: Date | null;

  @ApiProperty({ example: '(11) 99999-9999' })
  telefone: string | null;

  @ApiProperty({ example: 'CASADO' })
  estadoCivil: string | null;

  @ApiProperty({ example: 'Professora' })
  profissao: string | null;

  @ApiProperty({ example: 'Até 1 salário mínimo' })
  rendaMensal: string | null;

  @ApiProperty({ example: 'cm8wejfta0000gn0falnw8c2f' })
  tipoCestaId: string | null;

  @ApiProperty({ example: false })
  pessoaComDeficiencia: boolean;

  @ApiProperty({ example: '2025-01-01T00:00:00.000Z' })
  efetivadoEm?: Date | null;

  @ApiProperty({ example: '2025-01-01T00:00:00.000Z' })
  criadoEm: Date;

  @ApiProperty({ example: '2025-01-01T00:00:00.000Z' })
  atualizadoEm: Date | null;
}
