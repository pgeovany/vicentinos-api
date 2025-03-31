import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/persistencia/banco/prisma/prisma.service';
import { ProdutoService } from '../../produto.service';
import { MovimentarEstoqueDto } from './dto/movimentar-estoque.dto';
import { ENUM_STATUS_PRODUTO, ENUM_TIPO_MOVIMENTACAO_PRODUTO } from 'src/utils/enum/produto.enum';
import { AppErrorBadRequest } from 'src/utils/errors/app-errors';

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
    const { produtoId, tipo, quantidade, motivo } = params;

    const produto = await this.produtoService.buscarPorId(produtoId);

    if (tipo === ENUM_TIPO_MOVIMENTACAO_PRODUTO.SAIDA && produto.estoque!.quantidade < quantidade) {
      throw new AppErrorBadRequest('Não há itens suficientes no estoque');
    }

    await this.prismaService.$transaction((prisma) =>
      Promise.all([
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
              ...(tipo === ENUM_TIPO_MOVIMENTACAO_PRODUTO.ENTRADA
                ? { increment: quantidade }
                : { decrement: quantidade }),
            },
          },
        }),
      ]),
    );
  }
}
