import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/persistencia/banco/prisma/prisma.service';
import { CriarProdutoDto, EditarProdutoDto } from './dto/criar-produto.dto';
import { AppErrorConflict, AppErrorNotFound } from 'src/utils/errors/app-errors';

@Injectable()
export class ProdutoService {
  constructor(private readonly prismaService: PrismaService) {}

  private async buscarPorNome(nome: string) {
    return await this.prismaService.produto.findUnique({
      where: { nome },
    });
  }

  async buscarPorId(produtoId: string) {
    const produto = await this.prismaService.produto.findUnique({
      where: { id: produtoId },
      include: {
        estoque: true,
      },
    });

    if (!produto) {
      throw new AppErrorNotFound('Produto não encontrado');
    }

    return produto;
  }

  async criar(params: CriarProdutoDto) {
    const { nome } = params;

    const produtoExistente = await this.buscarPorNome(nome);

    if (produtoExistente) {
      throw new AppErrorConflict('Este produto já existe');
    }

    return await this.prismaService.produto.create({
      data: {
        nome,
        estoque: {
          create: {},
        },
      },
      include: {
        estoque: true,
      },
    });
  }

  async editar(params: { produtoId: string; data: EditarProdutoDto }) {
    const { produtoId, data } = params;

    const produtoExistente = await this.buscarPorNome(data.nome);

    if (produtoExistente && produtoExistente.id !== produtoId) {
      throw new AppErrorConflict('Já existe um produto com esse nome');
    }

    return await this.prismaService.produto.update({
      where: { id: produtoId },
      data: {
        nome: data.nome,
      },
      include: {
        estoque: true,
      },
    });
  }
}
