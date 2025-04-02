import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/persistencia/banco/prisma/prisma.service';
import { startOfMonth, endOfMonth } from 'date-fns';
import { ListarDistribuicoesPendentesDto } from './dto/listar-distribuicoes-pendentes.dto';
import { ENUM_STATUS_BENEFICIARIO } from 'src/utils/enum/beneficiario.enum';
import { Prisma } from '@prisma/client';
import { ListarHistoricoDistribuicoesDto } from './dto/listar-historico-distribuicoes.dto';

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

  async listarHistoricoDistribuicoes(filtros: ListarHistoricoDistribuicoesDto) {
    const { tipoCestaId, mes, ano } = filtros;
    const nome = filtros.nome ?? '';
    const dataInicio = startOfMonth(new Date(ano, mes - 1));
    const dataFim = endOfMonth(new Date(ano, mes - 1));
    const pagina = filtros.pagina ? +filtros.pagina : 1;
    const quantidade = filtros.quantidade ? +filtros.quantidade : 15;

    const where: Prisma.HistoricoDistribuicaoWhereInput = {
      tipoCestaId,
      criadoEm: {
        gte: dataInicio,
        lte: dataFim,
      },
      beneficiario: {
        nome: {
          contains: nome,
          mode: 'insensitive',
        },
      },
    };

    const [distribuicoes, total] = await Promise.all([
      this.prismaService.historicoDistribuicao.findMany({
        where,
        select: {
          id: true,
          criadoEm: true,
          beneficiario: {
            select: {
              id: true,
              nome: true,
            },
          },
          tipoCesta: {
            select: {
              id: true,
              nome: true,
            },
          },
        },
        orderBy: [{ beneficiario: { nome: 'asc' } }, { criadoEm: 'desc' }],
        skip: (pagina - 1) * quantidade,
        take: quantidade,
      }),
      this.prismaService.historicoDistribuicao.count({ where }),
    ]);

    return {
      nome,
      pagina,
      quantidade,
      totalPaginas: Math.ceil(total / quantidade),
      total,
      distribuicoes: distribuicoes.map((d) => ({
        id: d.id,
        criadoEm: d.criadoEm,
        beneficiario: {
          id: d.beneficiario!.id,
          nome: d.beneficiario!.nome,
        },
        tipoCesta: {
          id: d.tipoCesta!.id,
          nome: d.tipoCesta!.nome,
        },
      })),
    };
  }
}
