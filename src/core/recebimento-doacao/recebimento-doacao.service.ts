import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/persistencia/banco/prisma/prisma.service';
import { EstoqueService } from '../produto/modules/estoque/estoque.service';
import { SalvarDoacaoDto } from './dto/salvar-doacao.dto';
import { ProdutoService } from '../produto/produto.service';
import { AppErrorBadRequest } from 'src/utils/errors/app-errors';
import { ENUM_TIPO_MOVIMENTACAO_ESTOQUE } from 'src/utils/enum/estoque.enum';
import { ListarDoacoesDto } from './dto/listar-doacoes.dto';
import { Prisma } from '@prisma/client';
import { ObterEstatisticasDoacoesDto } from './dto/obter-estatisticas-doacoes.dto';

@Injectable()
export class RecebimentoDoacaoService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly estoqueService: EstoqueService,
    private readonly produtoService: ProdutoService,
  ) {}

  async validarProdutos(produtos: { produtoId: string; quantidade: number }[]) {
    const idsUnicos = Array.from(new Set(produtos.map((p) => p.produtoId)));

    if (idsUnicos.length !== produtos.length) {
      throw new AppErrorBadRequest('Lista contém produtos duplicados');
    }

    await Promise.all(idsUnicos.map((id) => this.produtoService.buscarPorId(id)));
  }

  async salvar(params: SalvarDoacaoDto) {
    const { origem, itens } = params;

    await this.validarProdutos(itens);

    const doacao = await this.prismaService.$transaction(async (prisma) => {
      const doacao = await prisma.recebimentoDoacao.create({
        data: {
          origem,
        },
        select: {
          id: true,
          origem: true,
          observacao: true,
          criadoEm: true,
        },
      });

      await prisma.itemRecebimento.createMany({
        data: itens.map((item) => ({
          doacaoId: doacao.id,
          produtoId: item.produtoId,
          quantidade: item.quantidade,
        })),
      });

      for (const item of itens) {
        await this.estoqueService.movimentar({
          prisma,
          produtoId: item.produtoId,
          quantidade: item.quantidade,
          tipo: ENUM_TIPO_MOVIMENTACAO_ESTOQUE.ENTRADA_DOACAO,
        });
      }

      return doacao;
    });

    const doacaoAtualizada = await this.prismaService.recebimentoDoacao.findUnique({
      where: { id: doacao.id },
      select: {
        id: true,
        origem: true,
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
      origem: doacaoAtualizada!.origem,
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

  async listar(filtros: ListarDoacoesDto) {
    const origem = filtros.origem ?? undefined;
    const pagina = filtros.pagina ? +filtros.pagina : 1;
    const quantidade = filtros.quantidade ? +filtros.quantidade : 10;
    const dataInicio = filtros.dataInicio ? filtros.dataInicio : undefined;
    const dataFim = filtros.dataFim ? filtros.dataFim : undefined;

    const where: Prisma.RecebimentoDoacaoWhereInput = {
      origem,
      criadoEm: {
        gte: dataInicio,
        lte: dataFim,
      },
    };

    const [doacoes, totalDoacoes] = await Promise.all([
      this.prismaService.recebimentoDoacao.findMany({
        where,
        select: {
          id: true,
          origem: true,
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
      this.prismaService.recebimentoDoacao.count({ where }),
    ]);

    const doacoesFormatadas = doacoes.map((doacao) => {
      return {
        id: doacao.id,
        origem: doacao.origem,
        criadoEm: doacao.criadoEm,
        itens: doacao.itens.map((item) => {
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
      origem,
      pagina,
      quantidade,
      totalPaginas: Math.ceil(totalDoacoes / quantidade),
      resultado: doacoesFormatadas,
    };
  }

  async obterEstatisticas(params: ObterEstatisticasDoacoesDto) {
    const origem = params.origem ?? undefined;
    const dataInicio = params.dataInicio ? params.dataInicio : undefined;
    const dataFim = params.dataFim ? params.dataFim : undefined;

    const where: Prisma.RecebimentoDoacaoWhereInput = {
      origem,
      criadoEm: {
        gte: dataInicio,
        lte: dataFim,
      },
    };

    const [totalDoacoes, doacoesPorOrigem, produtosMaisDoados, totalItens] = await Promise.all([
      this.prismaService.recebimentoDoacao.count({ where }),

      this.prismaService.recebimentoDoacao.groupBy({
        by: ['origem'],
        where,
        _count: true,
      }),

      this.prismaService.itemRecebimento.groupBy({
        by: ['produtoId'],
        where: {
          recebimento: where,
        },
        _sum: {
          quantidade: true,
        },
      }),

      this.prismaService.itemRecebimento.aggregate({
        where: {
          recebimento: where,
        },
        _sum: {
          quantidade: true,
        },
      }),
    ]);

    const produtos = await this.prismaService.produto.findMany({
      where: {
        id: {
          in: produtosMaisDoados.map((p) => p.produtoId),
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
      totalDoacoes,
      totalItensDoados: totalItens._sum.quantidade ?? 0,
      mediaItensPorDoacao: totalDoacoes ? (totalItens._sum.quantidade ?? 0) / totalDoacoes : 0,
      totalPorOrigem: doacoesPorOrigem.map((d) => ({
        origem: d.origem,
        total: d._count,
      })),
      quantidadePorProduto: produtosMaisDoados
        .map((p) => ({
          nome: produtos.find((prod) => prod.id === p.produtoId)?.nome ?? '',
          quantidade: p._sum.quantidade ?? 0,
        }))
        .sort((a, b) => b.quantidade - a.quantidade),
    };
  }
}
