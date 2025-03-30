import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/persistencia/banco/prisma/prisma.service';
import { CriarProdutoDto } from './dto/criar-produto.dto';
import { AppErrorConflict } from 'src/utils/errors/app-errors';

@Injectable()
export class ProdutoService {
  constructor(private readonly prismaService: PrismaService) {}

  async criar(params: CriarProdutoDto) {
    const { nome } = params;

    const produtoExistente = await this.prismaService.produto.findUnique({
      where: { nome },
    });

    if (produtoExistente) {
      throw new AppErrorConflict('Este produto já existe');
    }

    const produto = await this.prismaService.produto.create({
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

    return {
      ...produto,
      estoque: produto.estoque[0],
    };
  }
}
