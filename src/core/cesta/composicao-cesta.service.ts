import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/persistencia/banco/prisma/prisma.service';
import { CriarCestaDto } from './dto/criar-cesta.dto';
import {
  AppErrorBadRequest,
  AppErrorConflict,
  AppErrorNotFound,
} from 'src/utils/errors/app-errors';
import { AdicionarProdutosCestaDto } from './dto/adicionar-produtos-cesta.dto';
import { ProdutoService } from '../produto/produto.service';

@Injectable()
export class ComposicaoCestaService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly produtoService: ProdutoService,
  ) {}

  private async validarProdutos(produtos: { produtoId: string; quantidade: number }[]) {
    const idsUnicos = Array.from(new Set(produtos.map((p) => p.produtoId)));

    if (idsUnicos.length !== produtos.length) {
      throw new AppErrorBadRequest('Lista contém produtos duplicados');
    }

    await Promise.all(idsUnicos.map((id) => this.produtoService.buscarPorId(id)));
  }

  private async buscarPorNome(nome: string) {
    return await this.prismaService.tipoCesta.findUnique({
      where: { nome },
    });
  }

  private async buscarPorId(cestaId: string) {
    const cesta = await this.prismaService.tipoCesta.findUnique({
      where: { id: cestaId },
      include: { produtos: true },
    });

    if (!cesta) {
      throw new AppErrorNotFound('Cesta não encontrada');
    }

    return cesta;
  }

  private async buscarCestaComProdutos(cestaId: string) {
    const cesta = await this.prismaService.tipoCesta.findUnique({
      where: { id: cestaId },
      include: {
        produtos: {
          select: {
            produto: {
              select: {
                id: true,
                nome: true,
              },
            },
            quantidade: true,
          },
        },
      },
    });

    if (!cesta) {
      throw new AppErrorNotFound('Cesta não encontrada');
    }

    return {
      ...cesta,
      produtos: cesta.produtos?.map((produtoCesta) => {
        return {
          id: produtoCesta.produto.id,
          nome: produtoCesta.produto.nome,
          quantidade: produtoCesta.quantidade,
        };
      }),
    };
  }

  async criar(params: CriarCestaDto) {
    const { nome, descricao } = params;

    const cestaExistente = await this.buscarPorNome(nome);

    if (cestaExistente) {
      throw new AppErrorConflict('Já existe uma cesta com esse nome');
    }

    return await this.prismaService.tipoCesta.create({
      data: {
        nome,
        descricao,
      },
    });
  }

  async listar() {
    const cestas = await this.prismaService.tipoCesta.findMany({
      include: {
        produtos: {
          select: {
            produto: {
              select: {
                id: true,
                nome: true,
              },
            },
            quantidade: true,
          },
        },
      },
    });

    if (cestas.length === 0) {
      return { cestas };
    }

    const cestasFormatadas = cestas.map((cesta) => {
      return {
        ...cesta,
        produtos: cesta.produtos?.map((produtoCesta) => {
          return {
            id: produtoCesta.produto.id,
            nome: produtoCesta.produto.nome,
            quantidade: produtoCesta.quantidade,
          };
        }),
      };
    });

    return { cestas: cestasFormatadas };
  }

  async adicionarProdutos(params: { cestaId: string; data: AdicionarProdutosCestaDto }) {
    const { cestaId, data } = params;
    const { produtos } = data;
    const cesta = await this.buscarPorId(cestaId);
    await this.validarProdutos(produtos);

    await this.prismaService.$transaction(async (prisma) => {
      const transacoes = produtos.map((novoProduto) => {
        const produtoCesta = cesta.produtos?.find((p) => p.produtoId === novoProduto.produtoId);

        if (produtoCesta) {
          return prisma.produtoCesta.update({
            where: { id: produtoCesta.id },
            data: { quantidade: novoProduto.quantidade },
          });
        }

        return prisma.produtoCesta.create({
          data: {
            tipoCestaId: cestaId,
            produtoId: novoProduto.produtoId,
            quantidade: novoProduto.quantidade,
          },
        });
      });

      await Promise.all(transacoes);
    });

    return await this.buscarCestaComProdutos(cestaId);
  }

  async removerProduto(params: { cestaId: string; produtoId: string }) {
    const { cestaId, produtoId } = params;

    const cesta = await this.buscarPorId(cestaId);

    const produtoCesta = cesta.produtos?.find((p) => p.produtoId === produtoId);

    if (!produtoCesta) {
      throw new AppErrorBadRequest('Produto não encontrado na cesta');
    }

    await this.prismaService.produtoCesta.delete({
      where: { id: produtoCesta.id },
    });

    return await this.buscarCestaComProdutos(cestaId);
  }
}
