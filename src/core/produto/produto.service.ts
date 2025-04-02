import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/persistencia/banco/prisma/prisma.service';
import { CriarProdutoDto, EditarProdutoDto } from './dto/criar-produto.dto';
import { AppErrorConflict, AppErrorNotFound } from 'src/utils/errors/app-errors';
import { ENUM_STATUS_PRODUTO } from 'src/utils/enum/produto.enum';
import { ListarProdutosDto } from './dto/listar-produtos-dto';
import { Prisma } from '@prisma/client';

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
      where: {
        id: produtoId,
        status: ENUM_STATUS_PRODUTO.ATIVO,
      },
      include: { estoque: true },
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
      include: { estoque: true },
    });
  }

  async listar(filtros: ListarProdutosDto) {
    const pagina = filtros.pagina ? +filtros.pagina : 1;
    const quantidade = filtros.quantidade ? +filtros.quantidade : 15;
    const nome = filtros.nome ?? '';

    const where: Prisma.ProdutoWhereInput = {
      status: ENUM_STATUS_PRODUTO.ATIVO,
      nome: {
        contains: nome,
        mode: 'insensitive',
      },
    };

    const [produtos, totalProdutos] = await Promise.all([
      this.prismaService.produto.findMany({
        where,
        include: { estoque: true },
        take: quantidade,
        skip: (pagina - 1) * quantidade,
        orderBy: { nome: 'asc' },
      }),
      this.prismaService.produto.count({ where }),
    ]);

    return {
      nome,
      pagina,
      quantidade,
      totalPaginas: Math.ceil(totalProdutos / quantidade),
      resultado: produtos,
    };
  }

  async editar(params: { produtoId: string; data: EditarProdutoDto }) {
    const { produtoId, data } = params;

    const produtoExistente = await this.buscarPorNome(data.nome);

    if (produtoExistente && produtoExistente.id !== produtoId) {
      throw new AppErrorConflict('Já existe um produto com esse nome');
    }

    return await this.prismaService.produto.update({
      where: { id: produtoId },
      data: { nome: data.nome },
      include: { estoque: true },
    });
  }

  async alterarStatus(params: { produtoId: string; status: ENUM_STATUS_PRODUTO }) {
    const { produtoId, status } = params;

    const produto = await this.prismaService.produto.findUnique({
      where: { id: produtoId },
      include: { estoque: true },
    });

    if (!produto) {
      throw new AppErrorNotFound('Produto não encontrado');
    }

    if ((produto.status as ENUM_STATUS_PRODUTO) === status) {
      return produto;
    }

    return await this.prismaService.produto.update({
      where: { id: produtoId },
      data: { status },
      include: { estoque: true },
    });
  }
}
