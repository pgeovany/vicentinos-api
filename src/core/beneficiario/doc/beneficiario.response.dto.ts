import { ApiProperty } from '@nestjs/swagger';

class EnderecoResponseDto {
  @ApiProperty({ example: 'cm8wejfta0000gn0falnw8c2s' })
  id: string;

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

  @ApiProperty({ example: 'Próximo à padaria', required: false })
  pontoReferencia?: string;

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
  outrosBeneficios: string;

  @ApiProperty({ example: 'Aguardando reavaliação do benefício' })
  observacao: string;
}

class SaudeResponseDto {
  @ApiProperty({ example: 'cm8wejfta0000gn0falnw8c2s' })
  id: string;

  @ApiProperty({ example: true })
  cartaoSUS: boolean;

  @ApiProperty({ example: '123456789012345' })
  numeroCartaoSUS: string;

  @ApiProperty({ example: 'Clínica da Família Santa Maria' })
  clinicaFamilia: string;

  @ApiProperty({ example: 'Posto de Saúde Central' })
  postoSaude: string;

  @ApiProperty({ example: true })
  tratamentoHospitalar: boolean;

  @ApiProperty({ example: 'Hospital São Lucas' })
  hospital: string;

  @ApiProperty({ example: 'Tratamento para hipertensão' })
  tratamentoSaude: string;

  @ApiProperty({ example: 'Losartana, Atenolol' })
  medicamentos: string;

  @ApiProperty({ example: 'Necessita de consulta com cardiologista' })
  observacao: string;
}

class InteressesResponseDto {
  @ApiProperty({ example: 'cm8wejfta0000gn0falnw8c2s' })
  id: string;

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

  @ApiProperty({ example: 'João da Silva' })
  nome: string;

  @ApiProperty({ example: '123.456.789-00' })
  cpf?: string;

  @ApiProperty({ example: '22.444.111-9' })
  rg?: string;

  @ApiProperty({ example: '123456789' })
  certidaoNascimento?: string;

  @ApiProperty({ example: 'Filho' })
  parentesco: string;

  @ApiProperty({ example: 'ENSINO_MEDIO' })
  escolaridade: string;

  @ApiProperty({ example: 'MASCULINO' })
  sexo: string;

  @ApiProperty({ example: '2015-01-01' })
  dataNascimento?: Date;

  @ApiProperty({ example: '1500' })
  rendaMensal: string;

  @ApiProperty({ example: 'Vendedor' })
  trabalho: string;

  @ApiProperty({ example: 'Observações sobre o dependente' })
  observacao: string;
}

class DesligamentoResponseDto {
  @ApiProperty({ example: 'cm8wejfta0000gn0falnw8c2s' })
  id: string;

  @ApiProperty({ example: 'Mudança para outra cidade' })
  motivo: string;

  @ApiProperty({ example: '2025-05-01T00:00:00.000Z' })
  dataDesligamento: Date;

  @ApiProperty({ example: '2025-05-01T00:00:00.000Z' })
  criadoEm: Date;
}

class TipoCestaResponseDto {
  @ApiProperty({ example: 'cm8wejfta0000gn0falnw8c2s' })
  id: string;

  @ApiProperty({ example: 'Cesta Básica' })
  nome: string;

  @ApiProperty({ example: 'ATIVO' })
  status: string;

  @ApiProperty({ example: 'Cesta para família de até 4 pessoas' })
  descricao: string;
}

class HistoricoRecebimentosBeneficiarioResponseDto {
  @ApiProperty({ example: 'cm8wejfta0000gn0falnw8c2s' })
  id: string;

  @ApiProperty({ example: 'cm8wejfta0000gn0falnw8c2s' })
  tipoCestaId: string;

  @ApiProperty({ example: 'Cesta Básica Família' })
  nomeCesta: string;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  criadoEm: string;
}

export class BeneficiarioResponseDto {
  @ApiProperty({ example: 'cm8wejfta0000gn0falnw8c2s' })
  id: string;

  @ApiProperty({ example: 'Maria da Silva' })
  nome: string;

  @ApiProperty({ example: 'ATIVO' })
  status: string;

  @ApiProperty({ example: '123.456.789-00' })
  cpf: string;

  @ApiProperty({ example: '22.444.111-9' })
  rg: string;

  @ApiProperty({ example: 'F' })
  sexo: string;

  @ApiProperty({ example: '1990-01-01T00:00:00.000Z' })
  dataNascimento: string;

  @ApiProperty({ example: '(11) 99999-9999' })
  telefone: string;

  @ApiProperty({ example: 'CASADO' })
  estadoCivil: string;

  @ApiProperty({ example: 'Professora' })
  profissao: string;

  @ApiProperty({ example: 'Até 1 salário mínimo' })
  rendaMensal: string;

  @ApiProperty({ example: false })
  pessoaComDeficiencia: boolean;

  @ApiProperty({ example: '2025-01-01T00:00:00.000Z' })
  criadoEm: Date;

  @ApiProperty({ example: '2025-01-01T00:00:00.000Z' })
  atualizadoEm: Date;

  @ApiProperty({ type: EnderecoResponseDto, required: false })
  endereco?: EnderecoResponseDto;

  @ApiProperty({ type: BeneficiosSociaisResponseDto, required: false })
  beneficiosSociais?: BeneficiosSociaisResponseDto;

  @ApiProperty({ type: SaudeResponseDto, required: false })
  saude?: SaudeResponseDto;

  @ApiProperty({ type: InteressesResponseDto, required: false })
  interesses?: InteressesResponseDto;

  @ApiProperty({ type: TipoCestaResponseDto, required: false })
  tipoCesta?: TipoCestaResponseDto;

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

  @ApiProperty({ type: [BeneficiarioResponseDto] })
  resultado: BeneficiarioResponseDto[];
}
