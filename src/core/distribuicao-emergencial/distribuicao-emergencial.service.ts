import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/persistencia/banco/prisma/prisma.service';
import { ProdutoService } from '../produto/produto.service';
import { EstoqueService } from '../produto/modules/estoque/estoque.service';
import { AppErrorBadRequest } from 'src/utils/errors/app-errors';
import { SalvarDistribuicaoEmergencialDto } from './dto/salvar-distribuicao-emergencial.dto';
import { ENUM_TIPO_MOVIMENTACAO_ESTOQUE } from 'src/utils/enum/estoque.enum';
import { ListarDistribuicoesEmergenciaisDto } from './dto/listar-distribuicao-emergencial.dto';
import { Prisma } from '@prisma/client';
import { ObterEstatisticasDistribuicaoEmergencialDto } from './dto/obter-estatisticas-distribuicao-emergencial.dto';

@Injectable()
export class DistribuicaoEmergencialService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly produtoService: ProdutoService,
    private readonly estoqueService: EstoqueService,
  ) {}

  async validarProdutos(produtos: { produtoId: string; quantidade: number }[]) {
    const idsUnicos = Array.from(new Set(produtos.map((p) => p.produtoId)));

    if (idsUnicos.length !== produtos.length) {
      throw new AppErrorBadRequest('Lista contém produtos duplicados');
    }

    await Promise.all(idsUnicos.map((id) => this.produtoService.buscarPorId(id)));
  }

  async salvar(params: SalvarDistribuicaoEmergencialDto) {
    const { itens, beneficiario, motivo } = params;

    await this.validarProdutos(itens);

    const distribuicao = await this.prismaService.$transaction(async (prisma) => {
      const distribuicao = await prisma.distribuicaoEmergencial.create({
        data: {
          beneficiario,
          motivo,
        },
      });

      await prisma.itemDistribuicaoEmergencial.createMany({
        data: itens.map((item) => ({
          distribuicaoEmergencialId: distribuicao.id,
          produtoId: item.produtoId,
          quantidade: item.quantidade,
        })),
      });

      await Promise.all([
        itens.map((item) =>
          this.estoqueService.movimentar({
            motivo,
            produtoId: item.produtoId,
            quantidade: item.quantidade,
            tipo: ENUM_TIPO_MOVIMENTACAO_ESTOQUE.SAIDA_EMERGENCIAL,
          }),
        ),
      ]);

      return distribuicao;
    });

    const doacaoAtualizada = await this.prismaService.distribuicaoEmergencial.findUnique({
      where: { id: distribuicao.id },
      select: {
        id: true,
        beneficiario: true,
        motivo: true,
        criadoEm: true,
        itens: {
          select: {
            produtoId: true,
            quantidade: true,
            produto: {
              select: {
                nome: true,
              },
            },
          },
        },
      },
    });

    return {
      id: doacaoAtualizada!.id,
      beneficiario: doacaoAtualizada!.beneficiario ?? null,
      motivo: doacaoAtualizada!.motivo ?? null,
      criadoEm: doacaoAtualizada!.criadoEm,
      itens: doacaoAtualizada!.itens.map((item) => {
        return {
          id: item.produtoId,
          nome: item.produto.nome,
          quantidade: item.quantidade,
        };
      }),
    };
  }

  async listar(filtros: ListarDistribuicoesEmergenciaisDto) {
    const pagina = filtros.pagina ? +filtros.pagina : 1;
    const quantidade = filtros.quantidade ? +filtros.quantidade : 10;
    const dataInicio = filtros.dataInicio ? filtros.dataInicio : undefined;
    const dataFim = filtros.dataFim ? filtros.dataFim : undefined;

    const where: Prisma.DistribuicaoEmergencialWhereInput = {
      criadoEm: {
        gte: dataInicio,
        lte: dataFim,
      },
    };

    const [distribuicao, totalDistribuicoes] = await Promise.all([
      this.prismaService.distribuicaoEmergencial.findMany({
        where,
        select: {
          id: true,
          beneficiario: true,
          motivo: true,
          criadoEm: true,
          itens: {
            select: {
              produtoId: true,
              quantidade: true,
              produto: {
                select: {
                  nome: true,
                },
              },
            },
          },
        },
        orderBy: { criadoEm: 'desc' },
        skip: (pagina - 1) * quantidade,
        take: quantidade,
      }),
      this.prismaService.distribuicaoEmergencial.count({ where }),
    ]);

    const distribuicoesFormatadas = distribuicao.map((distribuicao) => {
      return {
        id: distribuicao.id,
        beneficiario: distribuicao.beneficiario,
        motivo: distribuicao.motivo,
        criadoEm: distribuicao.criadoEm,
        itens: distribuicao.itens.map((item) => {
          return {
            id: item.produtoId,
            nome: item.produto.nome,
            quantidade: item.quantidade,
          };
        }),
      };
    });

    return {
      dataInicio,
      dataFim,
      pagina,
      quantidade,
      totalPaginas: Math.ceil(totalDistribuicoes / quantidade),
      resultado: distribuicoesFormatadas,
    };
  }

  async obterEstatisticas(params: ObterEstatisticasDistribuicaoEmergencialDto) {
    const dataInicio = params.dataInicio ?? undefined;
    const dataFim = params.dataFim ?? undefined;

    const where: Prisma.DistribuicaoEmergencialWhereInput = {
      criadoEm: {
        gte: dataInicio,
        lte: dataFim,
      },
    };

    const [totalDistribuicoes, produtosDistribuidos, totalItens] = await Promise.all([
      this.prismaService.distribuicaoEmergencial.count({ where }),

      this.prismaService.itemDistribuicaoEmergencial.groupBy({
        by: ['produtoId'],
        where: {
          distribuicao: where,
        },
        _sum: {
          quantidade: true,
        },
      }),

      this.prismaService.itemDistribuicaoEmergencial.aggregate({
        where: {
          distribuicao: where,
        },
        _sum: {
          quantidade: true,
        },
      }),
    ]);

    const produtos = await this.prismaService.produto.findMany({
      where: {
        id: {
          in: produtosDistribuidos.map((p) => p.produtoId),
        },
      },
      select: {
        id: true,
        nome: true,
      },
    });

    return {
      dataInicio,
      dataFim,
      totalDistribuicoes,
      totalItensDistribuidos: totalItens._sum.quantidade ?? 0,
      mediaItensPorDistribuicao: totalDistribuicoes
        ? (totalItens._sum.quantidade ?? 0) / totalDistribuicoes
        : 0,
      quantidadePorProduto: produtosDistribuidos
        .map((p) => ({
          nome: produtos.find((prod) => prod.id === p.produtoId)?.nome ?? '',
          quantidade: p._sum.quantidade ?? 0,
        }))
        .sort((a, b) => b.quantidade - a.quantidade),
    };
  }
}
