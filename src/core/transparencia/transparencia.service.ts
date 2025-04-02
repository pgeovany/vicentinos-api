import { Injectable } from '@nestjs/common';
import { endOfMonth, startOfMonth, subMonths, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { PrismaService } from 'src/persistencia/banco/prisma/prisma.service';
import { ENUM_STATUS_BENEFICIARIO } from 'src/utils/enum/beneficiario.enum';
import { EstoqueService } from '../produto/modules/estoque/estoque.service';

@Injectable()
export class TransparenciaService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly estoqueService: EstoqueService,
  ) {}

  async obterDados() {
    const hoje = new Date();
    const mesAnterior = subMonths(hoje, 1);
    const dataInicio = startOfMonth(mesAnterior);
    const dataFim = endOfMonth(mesAnterior);

    const [totalDistribuicoes, totalEmergenciais, doacoesRecebidas, totalBeneficiarios] =
      await Promise.all([
        this.prismaService.historicoDistribuicao.count({
          where: {
            criadoEm: {
              gte: dataInicio,
              lte: dataFim,
            },
          },
        }),
        this.prismaService.distribuicaoEmergencial.count({
          where: {
            criadoEm: {
              gte: dataInicio,
              lte: dataFim,
            },
          },
        }),
        this.prismaService.recebimentoDoacao.findMany({
          where: {
            criadoEm: {
              gte: dataInicio,
              lte: dataFim,
            },
          },
          select: {
            itens: {
              select: {
                quantidade: true,
              },
            },
          },
        }),
        this.prismaService.beneficiario.count({
          where: {
            status: ENUM_STATUS_BENEFICIARIO.ATIVO,
          },
        }),
      ]);

    const dadosEstoque = await this.estoqueService.analisarEstoque();

    const produtosEmNecessidade =
      dadosEstoque.produtos
        ?.filter((produto) => !produto.suficiente)
        ?.map((p) => {
          const quantidadeNaoReservada = p.quantidadeReservada - p.quantidadeDisponivel;
          const quantidadeNecessaria = quantidadeNaoReservada > 0 ? quantidadeNaoReservada : 0;
          return {
            id: p.id,
            nome: p.nome,
            quantidadeNecessaria,
          };
        })
        ?.sort((a, b) => b.quantidadeNecessaria - a.quantidadeNecessaria) ?? [];

    const totalAlimentosRecebidos = doacoesRecebidas.reduce(
      (total, doacao) =>
        total + doacao.itens.reduce((itemTotal, item) => itemTotal + item.quantidade, 0),
      0,
    );

    return {
      mes: format(mesAnterior, 'MMMM', { locale: ptBR }),
      ano: mesAnterior.getFullYear(),
      familiasBeneficiadas: totalDistribuicoes,
      atendimentosEmergenciais: totalEmergenciais,
      totalAlimentosRecebidos,
      familiasCadastradas: totalBeneficiarios,
      produtosEmNecessidade: produtosEmNecessidade.slice(0, 5),
    };
  }
}
