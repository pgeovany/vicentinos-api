import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from 'src/persistencia/banco/prisma/prisma.service';
import { ENUM_TIPO_MOVIMENTACAO_ESTOQUE, isEntrada, isSaida } from 'src/utils/enum/estoque.enum';

@Injectable()
export class EstoqueCronService {
  constructor(private readonly prismaService: PrismaService) {}

  private async corrigirEstoque(params: {
    produtoId: string;
    estoqueProdutoId: string;
    quantidadeCalculada: number;
  }) {
    const { produtoId, estoqueProdutoId, quantidadeCalculada } = params;
    const estoqueAtual = await this.prismaService.produtoEstoque.findUnique({
      where: { produtoId },
      select: { quantidade: true },
    });

    const quantidadeAtual = estoqueAtual?.quantidade ?? 0;
    const diferencaQuantidade = quantidadeCalculada - quantidadeAtual;

    await this.prismaService.$transaction([
      this.prismaService.produtoEstoque.update({
        where: { produtoId },
        data: { quantidade: quantidadeCalculada },
      }),
      this.prismaService.produtoMovimentacaoEstoque.create({
        data: {
          estoqueProdutoId,
          tipo:
            diferencaQuantidade >= 0
              ? ENUM_TIPO_MOVIMENTACAO_ESTOQUE.ENTRADA_AJUSTE
              : ENUM_TIPO_MOVIMENTACAO_ESTOQUE.SAIDA_AJUSTE,
          quantidade: diferencaQuantidade,
          motivo: `Correção automática: ${diferencaQuantidade >= 0 ? 'Incremento' : 'Decremento'} de ${Math.abs(diferencaQuantidade)} unidades`,
        },
      }),
    ]);
  }

  private async verificarQuantidade(params: {
    produtoId: string;
    estoqueProdutoId: string;
  }): Promise<boolean> {
    const { produtoId, estoqueProdutoId } = params;

    const [estoqueAtual, movimentacoes] = await Promise.all([
      this.prismaService.produtoEstoque.findUnique({
        where: { produtoId },
        select: { quantidade: true },
      }),
      this.prismaService.produtoMovimentacaoEstoque.findMany({
        where: {
          produtoEstoque: { produtoId },
        },
        select: {
          tipo: true,
          quantidade: true,
        },
      }),
    ]);

    const quantidadeEstoque = estoqueAtual?.quantidade ?? 0;

    const quantidadeCalculada = movimentacoes.reduce((total, mov) => {
      const tipoMovimentacao = mov.tipo as ENUM_TIPO_MOVIMENTACAO_ESTOQUE;

      if (isEntrada(tipoMovimentacao)) {
        return total + mov.quantidade;
      }

      if (isSaida(tipoMovimentacao)) {
        return total - mov.quantidade;
      }

      return total;
    }, 0);

    if (quantidadeEstoque !== quantidadeCalculada) {
      console.error(`Discrepância no estoque do produto ${produtoId}:`, {
        quantidadeEstoque,
        quantidadeCalculada,
        totalMovimentacoes: movimentacoes.length,
      });

      await this.corrigirEstoque({
        produtoId,
        estoqueProdutoId,
        quantidadeCalculada,
      });

      return false;
    }

    console.log(`Estoque correto para produto ${produtoId}:`, {
      quantidade: quantidadeEstoque,
      totalMovimentacoes: movimentacoes.length,
    });

    return true;
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async verificarECorrigirEstoques() {
    const produtos = await this.prismaService.produto.findMany({
      where: { status: 'ATIVO' },
      select: {
        id: true,
        estoque: {
          select: { id: true },
        },
      },
    });

    for (const produto of produtos) {
      if (produto.estoque) {
        await this.verificarQuantidade({
          produtoId: produto.id,
          estoqueProdutoId: produto.estoque.id,
        });
      }
    }
  }
}
