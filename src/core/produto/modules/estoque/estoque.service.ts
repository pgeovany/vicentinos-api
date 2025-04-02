import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/persistencia/banco/prisma/prisma.service';
import { ProdutoService } from '../../produto.service';
import { MovimentarEstoqueDto } from './dto/movimentar-estoque.dto';
import { ENUM_STATUS_PRODUTO } from 'src/utils/enum/produto.enum';
import { AppErrorBadRequest } from 'src/utils/errors/app-errors';
import { ListarMovimentacoesEstoqueDto } from './dto/listar-movimentacoes-estoque.dto';
import { Prisma } from '@prisma/client';
import { ListarEntradasESaidas } from './dto/listar-quantidade-movimentacoes.dto';
import { ENUM_TIPO_MOVIMENTACAO_ESTOQUE, isEntrada, isSaida } from 'src/utils/enum/estoque.enum';

@Injectable()
export class EstoqueService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly produtoService: ProdutoService,
  ) {}

  /**
   * Lista produtos ordenados por necessidade, baseado na relação entre:
   * - Quantidade em estoque
   * - Média de uso nas cestas básicas
   *
   * Exemplo:
   * Se um produto aparece em média 2x por cesta e temos 10 unidades,
   * sua quantidade relativa será 5 (10/2).
   * Quanto menor a quantidade relativa, maior a necessidade do produto.
   */
  public async listarProdutosMaisNecessitados() {
    const [produtos, beneficiarios] = await Promise.all([
      this.prismaService.produto.findMany({
        where: {
          status: ENUM_STATUS_PRODUTO.ATIVO,
          estoque: { isNot: null },
        },
        select: {
          id: true,
          nome: true,
          estoque: {
            select: {
              quantidade: true,
            },
          },
        },
      }),

      this.prismaService.beneficiario.findMany({
        where: {
          status: 'ATIVO',
          tipoCestaId: { not: null },
        },
        select: {
          tipoCesta: {
            select: {
              id: true,
              produtos: true,
            },
          },
        },
      }),
    ]);

    const listaProdutos: { nome: string; quantidadeRelativa: number }[] = [];

    for (const produto of produtos) {
      const quantidadeEmCestas =
        beneficiarios?.reduce((total, beneficiario) => {
          const cesta = beneficiario.tipoCesta;

          const produtoNaCesta = cesta?.produtos.find(
            (produtoCesta) => produtoCesta.produtoId === produto.id,
          );

          return total + (produtoNaCesta?.quantidade ?? 0);
        }, 0) || 1;

      const mediaEmCestas =
        quantidadeEmCestas / (beneficiarios.length !== 0 ? beneficiarios.length : 1);

      const quantidadeRelativa = produto.estoque!.quantidade / mediaEmCestas;

      listaProdutos.push({
        nome: produto.nome,
        quantidadeRelativa,
      });
    }

    const produtosOrdenados = [...listaProdutos].sort(
      (a, b) => a.quantidadeRelativa - b.quantidadeRelativa,
    );

    return { produtos: produtosOrdenados.map((p) => p.nome) };
  }

  async movimentar(params: MovimentarEstoqueDto) {
    const { produtoId, tipo, quantidade, motivo, prisma } = params;

    const produto = await this.produtoService.buscarPorId(produtoId);

    if (isSaida(tipo) && produto.estoque!.quantidade < quantidade) {
      throw new AppErrorBadRequest('Não há itens suficientes no estoque');
    }

    if (prisma) {
      await Promise.all([
        prisma.produtoMovimentacaoEstoque.create({
          data: {
            estoqueProdutoId: produto.estoque!.id,
            tipo,
            quantidade,
            motivo,
          },
        }),
        prisma.produtoEstoque.update({
          where: { produtoId },
          data: {
            quantidade: {
              ...(isEntrada(tipo) ? { increment: quantidade } : { decrement: quantidade }),
            },
          },
        }),
      ]);

      return;
    }

    await this.prismaService.$transaction((tx) =>
      Promise.all([
        tx.produtoMovimentacaoEstoque.create({
          data: {
            estoqueProdutoId: produto.estoque!.id,
            tipo,
            quantidade,
            motivo,
          },
        }),
        tx.produtoEstoque.update({
          where: { produtoId },
          data: {
            quantidade: {
              ...(isEntrada(tipo) ? { increment: quantidade } : { decrement: quantidade }),
            },
          },
        }),
      ]),
    );
  }

  async listarMovimentacoes(filtros: ListarMovimentacoesEstoqueDto) {
    const { tipo } = filtros;
    const nome = filtros.nome ?? '';
    const pagina = filtros.pagina ? +filtros.pagina : 1;
    const quantidade = filtros.quantidade ? +filtros.quantidade : 10;
    const dataInicio = filtros.dataInicio ? filtros.dataInicio : undefined;
    const dataFim = filtros.dataFim ? filtros.dataFim : undefined;

    const where: Prisma.ProdutoMovimentacaoEstoqueWhereInput = {
      produtoEstoque: {
        produto: {
          nome: {
            contains: nome,
            mode: 'insensitive',
          },
        },
      },
      tipo: {
        notIn: [
          ENUM_TIPO_MOVIMENTACAO_ESTOQUE.ENTRADA_AJUSTE,
          ENUM_TIPO_MOVIMENTACAO_ESTOQUE.SAIDA_AJUSTE,
        ],
      },
      criadoEm: {
        gte: dataInicio,
        lte: dataFim,
      },
    };

    if (tipo) {
      where.tipo = tipo;
    }

    const movimentacoes = await this.prismaService.produtoMovimentacaoEstoque.findMany({
      where,
      include: {
        produtoEstoque: {
          select: {
            produto: true,
          },
        },
      },
      orderBy: { criadoEm: 'desc' },
      take: quantidade,
      skip: (pagina - 1) * quantidade,
    });

    const totalMovimentacoes = await this.prismaService.produtoMovimentacaoEstoque.count({ where });

    const movimentacoesFormatradas = movimentacoes?.map((movimentacao) => {
      return {
        produtoId: movimentacao.produtoEstoque.produto.id,
        produto: movimentacao.produtoEstoque.produto.nome,
        ...movimentacao,
        produtoEstoque: undefined,
      };
    });

    return {
      produto: nome,
      tipo,
      dataInicio,
      dataFim,
      pagina,
      quantidade,
      totalPaginas: Math.ceil(totalMovimentacoes / quantidade),
      resultado: movimentacoesFormatradas,
    };
  }

  async listarEntradasESaidas(filtros: ListarEntradasESaidas) {
    const nome = filtros.nome ?? '';
    const pagina = filtros.pagina ? +filtros.pagina : 1;
    const quantidade = filtros.quantidade ? +filtros.quantidade : 15;
    const dataInicio = filtros.dataInicio ? filtros.dataInicio : undefined;
    const dataFim = filtros.dataFim ? filtros.dataFim : undefined;

    const where: Prisma.ProdutoMovimentacaoEstoqueWhereInput = {
      produtoEstoque: {
        produto: {
          nome: {
            contains: nome,
            mode: 'insensitive',
          },
        },
      },
      tipo: {
        notIn: [
          ENUM_TIPO_MOVIMENTACAO_ESTOQUE.ENTRADA_AJUSTE,
          ENUM_TIPO_MOVIMENTACAO_ESTOQUE.SAIDA_AJUSTE,
        ],
      },
      criadoEm: {
        gte: dataInicio,
        lte: dataFim,
      },
    };

    const movimentacoes = await this.prismaService.produtoMovimentacaoEstoque.findMany({
      where,
      select: {
        quantidade: true,
        tipo: true,
        produtoEstoque: {
          select: {
            produto: true,
          },
        },
      },
      orderBy: { criadoEm: 'desc' },
      take: quantidade,
      skip: (pagina - 1) * quantidade,
    });

    const totalMovimentacoes = await this.prismaService.produtoMovimentacaoEstoque.count({ where });

    if (movimentacoes.length === 0) {
      return {
        produto: nome,
        dataInicio,
        dataFim,
        pagina,
        quantidade,
        totalPaginas: Math.ceil(totalMovimentacoes / quantidade),
        resultado: [],
      };
    }

    const movimentacaoProdutosMap: Record<
      string,
      { quantidade: number; tipo: ENUM_TIPO_MOVIMENTACAO_ESTOQUE; nome: string }[]
    > = {};

    movimentacoes.forEach((movimentacao) => {
      const movimentacaoProdutoId = movimentacao.produtoEstoque.produto.id;
      const nomeProduto = movimentacao.produtoEstoque.produto.nome;
      const quantidade = movimentacao.quantidade;
      const tipo = movimentacao.tipo as ENUM_TIPO_MOVIMENTACAO_ESTOQUE;

      if (movimentacaoProdutosMap[movimentacaoProdutoId]) {
        movimentacaoProdutosMap[movimentacaoProdutoId].push({
          quantidade,
          tipo,
          nome: nomeProduto,
        });
      } else {
        movimentacaoProdutosMap[movimentacaoProdutoId] = [
          {
            quantidade,
            tipo,
            nome: nomeProduto,
          },
        ];
      }
    });

    const movimentacaoTotais: {
      produtoId: string;
      nome: string;
      totalEntradas: number;
      totalSaidas: number;
    }[] = Object.entries(movimentacaoProdutosMap).map(([produtoId, movimentacoes]) => {
      const totais = movimentacoes.reduce(
        (acc, mov) => {
          if (isEntrada(mov.tipo)) {
            acc.totalEntradas += mov.quantidade;
          } else if (isSaida(mov.tipo)) {
            acc.totalSaidas += mov.quantidade;
          }
          return acc;
        },
        { totalEntradas: 0, totalSaidas: 0 },
      );

      return {
        produtoId,
        nome: movimentacoes[0].nome,
        ...totais,
      };
    });

    return {
      produto: nome,
      dataInicio,
      dataFim,
      pagina,
      quantidade,
      totalPaginas: Math.ceil(totalMovimentacoes / quantidade),
      resultado: movimentacaoTotais,
    };
  }
}
