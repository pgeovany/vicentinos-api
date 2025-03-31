import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/persistencia/banco/prisma/prisma.service';
import { EstoqueService } from '../produto/modules/estoque/estoque.service';
import { SalvarDoacaoDto } from './dto/salvar-doacao.dto';
import { ProdutoService } from '../produto/produto.service';
import { AppErrorBadRequest } from 'src/utils/errors/app-errors';
import { ENUM_TIPO_MOVIMENTACAO_ESTOQUE } from 'src/utils/enum/estoque.enum';

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

      await Promise.all([
        itens.map((item) =>
          this.estoqueService.movimentar({
            produtoId: item.produtoId,
            quantidade: item.quantidade,
            tipo: ENUM_TIPO_MOVIMENTACAO_ESTOQUE.ENTRADA_DOACAO,
          }),
        ),
      ]);

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
}
