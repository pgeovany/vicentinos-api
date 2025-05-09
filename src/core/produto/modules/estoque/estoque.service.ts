import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/persistencia/banco/prisma/prisma.service';
import { ProdutoService } from '../../produto.service';
import { MovimentarEstoqueDto } from './dto/movimentar-estoque.dto';
import { AppErrorBadRequest } from 'src/utils/errors/app-errors';
import { ListarMovimentacoesEstoqueDto } from './dto/listar-movimentacoes-estoque.dto';
import { Prisma } from '@prisma/client';
import { ListarEntradasESaidas } from './dto/listar-quantidade-movimentacoes.dto';
import { ENUM_TIPO_MOVIMENTACAO_ESTOQUE, isEntrada, isSaida } from 'src/utils/enum/estoque.enum';
import { ENUM_STATUS_BENEFICIARIO } from 'src/utils/enum/beneficiario.enum';
import { RemocaoDiretaEstoqueDto } from './dto/remocao-direta.dto';
import { endOfDay, startOfDay } from 'date-fns';

@Injectable()
export class EstoqueService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly produtoService: ProdutoService,
  ) {}

  public async listarProdutosMaisNecessitados() {
    const estoque = await this.analisarEstoque();

    return { produtos: estoque?.produtos?.map((produto) => produto.nome) ?? [] };
  }

  async movimentar(params: MovimentarEstoqueDto) {
    const { produtoId, tipo, quantidade, motivo, prisma } = params;

    const produto = await this.produtoService.buscarPorId(produtoId);

    if (isSaida(tipo) && produto.estoque!.quantidade < quantidade) {
      throw new AppErrorBadRequest('Não há itens suficientes no estoque');
    }

    try {
      const dbClient = prisma || this.prismaService;

      await Promise.all([
        dbClient.produtoMovimentacaoEstoque.create({
          data: {
            estoqueProdutoId: produto.estoque!.id,
            tipo,
            quantidade,
            motivo,
          },
        }),
        dbClient.produtoEstoque.update({
          where: { produtoId },
          data: {
            quantidade: {
              ...(isEntrada(tipo) ? { increment: quantidade } : { decrement: quantidade }),
            },
          },
        }),
      ]);
    } catch (error) {
      if (error.message?.includes('transaction')) {
        throw new AppErrorBadRequest('Erro na transação. Por favor, tente novamente.');
      }
      throw error;
    }
  }

  async listarMovimentacoes(filtros: ListarMovimentacoesEstoqueDto) {
    const { tipo } = filtros;
    const nome = filtros.nome ?? '';
    const pagina = filtros.pagina ? +filtros.pagina : 1;
    const quantidade = filtros.quantidade ? +filtros.quantidade : 10;
    const dataInicio = filtros.dataInicio ? startOfDay(filtros.dataInicio) : undefined;
    const dataFim = filtros.dataFim ? endOfDay(filtros.dataFim) : undefined;

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
      where.tipo = {
        contains: tipo,
        mode: 'insensitive',
      };
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
    const dataInicio = filtros.dataInicio ? startOfDay(filtros.dataInicio) : undefined;
    const dataFim = filtros.dataFim ? endOfDay(filtros.dataFim) : undefined;

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

  async analisarEstoque() {
    const produtos = await this.prismaService.produto.findMany({
      select: {
        id: true,
        nome: true,
        estoque: {
          select: {
            quantidade: true,
          },
        },
      },
    });

    const beneficiariosAtivos = await this.prismaService.beneficiario.findMany({
      where: {
        status: ENUM_STATUS_BENEFICIARIO.ATIVO,
        tipoCestaId: { not: null },
      },
      select: {
        tipoCesta: {
          select: {
            produtos: {
              select: {
                produtoId: true,
                quantidade: true,
              },
            },
          },
        },
      },
    });

    const produtosReservados = new Map<
      string,
      { nome: string; reservado: number; disponivel: number }
    >();

    produtos.forEach((produto) => {
      produtosReservados.set(produto.id, {
        nome: produto.nome,
        reservado: 0,
        disponivel: produto.estoque?.quantidade ?? 0,
      });
    });

    beneficiariosAtivos.forEach((beneficiario) => {
      beneficiario.tipoCesta?.produtos.forEach((produtoCesta) => {
        const atual = produtosReservados.get(produtoCesta.produtoId);

        if (atual) {
          atual.reservado += produtoCesta.quantidade;
        }
      });
    });

    const analise = Array.from(produtosReservados.entries()).map(([id, dados]) => ({
      id,
      nome: dados.nome,
      quantidadeReservada: dados.reservado,
      quantidadeDisponivel: dados.disponivel,
      saldo: dados.disponivel - dados.reservado,
      suficiente: dados.disponivel >= dados.reservado,
    }));

    return {
      produtos: [...analise].sort((a, b) => a.saldo - b.saldo),
      totais: {
        produtosInsuficientes: analise.filter((p) => !p.suficiente).length,
        produtosSuficientes: analise.filter((p) => p.suficiente).length,
      },
    };
  }

  async remocaoDireta(params: RemocaoDiretaEstoqueDto) {
    const { produtoId, quantidade, motivo } = params;

    await this.movimentar({
      produtoId,
      quantidade,
      tipo: ENUM_TIPO_MOVIMENTACAO_ESTOQUE.SAIDA_MANUAL,
      motivo,
    });
  }
}
