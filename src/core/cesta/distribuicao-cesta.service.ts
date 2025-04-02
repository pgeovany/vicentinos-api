import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/persistencia/banco/prisma/prisma.service';
import { startOfMonth, endOfMonth } from 'date-fns';
import { ListarDistribuicoesPendentesDto } from './dto/listar-distribuicoes-pendentes.dto';
import { ENUM_STATUS_BENEFICIARIO } from 'src/utils/enum/beneficiario.enum';
import { Prisma } from '@prisma/client';

@Injectable()
export class DistribuicaoCestaService {
  constructor(private readonly prismaService: PrismaService) {}

  private async buscarBeneficiariosJaContemplados(params: { dataInicio: Date; dataFim: Date }) {
    const { dataInicio, dataFim } = params;

    const beneficiariosJaContempladosNoMes =
      await this.prismaService.historicoDistribuicao.findMany({
        where: {
          criadoEm: {
            gte: dataInicio,
            lte: dataFim,
          },
        },
        select: {
          beneficiarioId: true,
        },
      });

    return beneficiariosJaContempladosNoMes.map((d) => d.beneficiarioId!);
  }

  async listarDistribuicoesPendentes(filtros: ListarDistribuicoesPendentesDto) {
    const { nome } = filtros;
    const hoje = new Date();
    const dataInicio = startOfMonth(hoje);
    const dataFim = endOfMonth(hoje);

    const pagina = filtros.pagina ? +filtros.pagina : 1;
    const quantidade = filtros.quantidade ? +filtros.quantidade : 15;

    const beneficiariosJaContempladosNoMes = await this.buscarBeneficiariosJaContemplados({
      dataInicio,
      dataFim,
    });

    const where: Prisma.BeneficiarioWhereInput = {
      id: {
        notIn: beneficiariosJaContempladosNoMes,
      },
      nome: {
        contains: nome,
        mode: 'insensitive',
      },
      status: ENUM_STATUS_BENEFICIARIO.ATIVO,
      tipoCestaId: { not: null },
    };

    const [beneficiariosPendentes, totalBeneficiarios, beneficiariosRestantes] = await Promise.all([
      this.prismaService.beneficiario.findMany({
        where,
        select: {
          id: true,
          nome: true,
          tipoCesta: {
            select: {
              id: true,
              nome: true,
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
          },
        },
        orderBy: { nome: 'asc' },
        skip: (pagina - 1) * quantidade,
        take: quantidade,
      }),
      this.prismaService.beneficiario.count({ where }),
      this.prismaService.beneficiario.count({
        where: {
          id: {
            notIn: beneficiariosJaContempladosNoMes,
          },
          status: ENUM_STATUS_BENEFICIARIO.ATIVO,
          tipoCestaId: { not: null },
        },
      }),
    ]);

    return {
      pagina,
      quantidade,
      totalPaginas: Math.ceil(totalBeneficiarios / quantidade),
      beneficiariosRestantes,
      beneficiarios: beneficiariosPendentes.map((b) => ({
        id: b.id,
        nome: b.nome,
        tipoCesta: {
          id: b.tipoCesta!.id,
          nome: b.tipoCesta!.nome,
          produtos: b.tipoCesta!.produtos.map((p) => ({
            id: p.produto.id,
            nome: p.produto.nome,
            quantidade: p.quantidade,
          })),
        },
      })),
    };
  }
}
