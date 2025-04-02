import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/persistencia/banco/prisma/prisma.service';
import { ProdutoService } from '../produto/produto.service';
import { EstoqueService } from '../produto/modules/estoque/estoque.service';
import { AppErrorBadRequest } from 'src/utils/errors/app-errors';
import { SalvarDistribuicaoEmergencialDto } from './dto/salvar-distribuicao-emergencial.dto';
import { ENUM_TIPO_MOVIMENTACAO_ESTOQUE } from 'src/utils/enum/estoque.enum';

@Injectable()
export class DistribuicaoEmergencialService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly produtoService: ProdutoService,
    private readonly estoqueService: EstoqueService,
  ) {}

  async validarProdutos(produtos: { produtoId: string; quantidade: number }[]) {
    const idsUnicos = Array.from(new Set(produtos.map((p) => p.produtoId)));

    if (idsUnicos.length !== produtos.length) {
      throw new AppErrorBadRequest('Lista contém produtos duplicados');
    }

    await Promise.all(idsUnicos.map((id) => this.produtoService.buscarPorId(id)));
  }

  async salvar(params: SalvarDistribuicaoEmergencialDto) {
    const { itens, beneficiario, motivo } = params;

    await this.validarProdutos(itens);

    const distribuicao = await this.prismaService.$transaction(async (prisma) => {
      const distribuicao = await prisma.distribuicaoEmergencial.create({
        data: {
          beneficiario,
          motivo,
        },
      });

      await prisma.itemDistribuicaoEmergencial.createMany({
        data: itens.map((item) => ({
          distribuicaoEmergencialId: distribuicao.id,
          produtoId: item.produtoId,
          quantidade: item.quantidade,
        })),
      });

      await Promise.all([
        itens.map((item) =>
          this.estoqueService.movimentar({
            motivo,
            produtoId: item.produtoId,
            quantidade: item.quantidade,
            tipo: ENUM_TIPO_MOVIMENTACAO_ESTOQUE.SAIDA_EMERGENCIAL,
          }),
        ),
      ]);

      return distribuicao;
    });

    const doacaoAtualizada = await this.prismaService.distribuicaoEmergencial.findUnique({
      where: { id: distribuicao.id },
      select: {
        id: true,
        beneficiario: true,
        motivo: true,
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
      beneficiario: doacaoAtualizada!.beneficiario ?? '',
      motivo: doacaoAtualizada!.motivo ?? '',
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
