import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/persistencia/banco/prisma/prisma.service';
import { ProdutoService } from '../../produto.service';
import { MovimentarEstoqueDto } from './dto/movimentar-estoque.dto';
import { ENUM_TIPO_MOVIMENTACAO_PRODUTO } from 'src/utils/enum/produto.enum';
import { AppErrorBadRequest } from 'src/utils/errors/app-errors';

@Injectable()
export class EstoqueService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly produtoService: ProdutoService,
  ) {}

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
