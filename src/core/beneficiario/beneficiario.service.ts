import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/persistencia/banco/prisma/prisma.service';
import { AppErrorConflict, AppErrorNotFound } from 'src/utils/errors/app-errors';
import { AtualizarEnderecoBeneficiarioDto } from './dto/atualizar-endereco-beneficiario.dto';
import { CriarBeneficiarioDto } from './dto/criar-beneficiario.dto';
import { ENUM_STATUS_BENEFICIARIO } from 'src/utils/enum/beneficiario.enum';
import {
  AdicionarDependentesBeneficiarioDto,
  EditarDependenteDto,
} from './dto/adicionar-dependente-beneficiario.dto';
import { ListarBeneficiariosDto } from './dto/listar-beneficiarios.dto';
import { Prisma } from '@prisma/client';
import { AtualizarBeneficiosSociaisBeneficiarioDto } from './dto/atualizar-beneficios-sociais-beneficiario.dto';
import { AtualizarSaudeBeneficiarioDto } from './dto/atualizar-saude-beneficiario.dto';
import { AtualizarInteressesBeneficiarioDto } from './dto/atualizar-interesses-beneficiario.dto';
import { CriarDesligamentoBeneficiarioDto } from './dto/criar-desligamento-beneficiario.dto';
import {
  BeneficiarioComHistoricoResponseDto,
  ListarBeneficiariosResponseDto,
} from './doc/beneficiario.response.dto';

@Injectable()
export class BeneficiarioService {
  constructor(private readonly prismaService: PrismaService) {}

  private async buscarPorCpf(cpf: string) {
    const beneficiario = await this.prismaService.beneficiario.findUnique({
      where: { cpf },
    });

    return beneficiario;
  }

  private async buscarPorRg(rg: string) {
    const beneficiario = await this.prismaService.beneficiario.findUnique({
      where: { rg },
    });

    return beneficiario;
  }

  private async editar(params: CriarBeneficiarioDto) {
    const { cpf, rg } = params;
    const { beneficiarioId, ...rest } = params;

    await this.buscarPorId(beneficiarioId!);

    if (cpf) {
      const beneficiarioExistente = await this.buscarPorCpf(cpf);

      if (beneficiarioExistente && beneficiarioExistente.id !== beneficiarioId) {
        throw new AppErrorConflict('Beneficiário já cadastrado com esse CPF');
      }
    }

    if (rg) {
      const beneficiarioExistente = await this.buscarPorRg(rg);
      if (beneficiarioExistente && beneficiarioExistente.id !== beneficiarioId) {
        throw new AppErrorConflict('Beneficiário já cadastrado com esse RG');
      }
    }

    return await this.prismaService.beneficiario.update({
      where: { id: beneficiarioId },
      data: {
        ...rest,
      },
    });
  }

  private async buscarPorId(beneficiarioId: string) {
    const beneficiario = await this.prismaService.beneficiario.findUnique({
      where: {
        id: beneficiarioId,
      },
      select: {
        id: true,
        nome: true,
        cpf: true,
        rg: true,
        status: true,
        dataNascimento: true,
        telefone: true,
        endereco: true,
        tipoCesta: {
          select: {
            id: true,
            nome: true,
          },
        },
        dependentes: {
          select: {
            id: true,
            nome: true,
            parentesco: true,
          },
          orderBy: { nome: 'asc' },
        },
      },
    });

    if (!beneficiario) {
      throw new AppErrorNotFound('Beneficiário não encontrado');
    }

    return beneficiario;
  }

  async criar(params: CriarBeneficiarioDto) {
    const { cpf, rg } = params;
    const { beneficiarioId, ...rest } = params;

    if (beneficiarioId) {
      return await this.editar(params);
    }

    if (cpf) {
      const beneficiarioExistente = await this.buscarPorCpf(cpf);
      if (beneficiarioExistente) {
        throw new AppErrorConflict('Beneficiário já cadastrado com esse CPF');
      }
    }

    if (rg) {
      const beneficiarioExistente = await this.buscarPorRg(rg);
      if (beneficiarioExistente) {
        throw new AppErrorConflict('Beneficiário já cadastrado com esse RG');
      }
    }

    return await this.prismaService.beneficiario.create({
      data: {
        ...rest,
        efetivadoEm: new Date(),
        endereco: {},
        beneficiosSociais: {},
        saude: {},
        interesses: {},
      },
    });
  }

  async buscarDetalhes(beneficiarioId: string): Promise<BeneficiarioComHistoricoResponseDto> {
    const beneficiario = await this.prismaService.beneficiario.findUnique({
      where: {
        id: beneficiarioId,
      },
      include: {
        beneficiosSociais: true,
        endereco: true,
        interesses: true,
        saude: true,
        tipoCesta: {
          select: {
            id: true,
            nome: true,
          },
        },
        dependentes: {
          orderBy: { nome: 'asc' },
        },
        historicoRecebimentos: {
          select: {
            id: true,
            tipoCestaId: true,
            nomeCesta: true,
            criadoEm: true,
          },
          orderBy: { criadoEm: 'desc' },
        },
        historicoDesligamentos: {
          select: {
            id: true,
            motivo: true,
            criadoEm: true,
          },
          orderBy: { criadoEm: 'desc' },
        },
      },
    });

    if (!beneficiario) {
      throw new AppErrorNotFound('Beneficiário não encontrado');
    }

    return beneficiario;
  }

  async listar(filtros: ListarBeneficiariosDto): Promise<ListarBeneficiariosResponseDto> {
    const pagina = filtros.pagina ? +filtros.pagina : 1;
    const quantidade = filtros.quantidade ? +filtros.quantidade : 10;
    const nome = filtros.nome ?? '';

    const where: Prisma.BeneficiarioWhereInput = {
      tipoCestaId: filtros.tipoCestaId,
      nome: {
        contains: nome,
        mode: 'insensitive',
      },
    };

    const [total, beneficiarios] = await Promise.all([
      this.prismaService.beneficiario.count({ where }),
      this.prismaService.beneficiario.findMany({
        where,
        select: {
          id: true,
          nome: true,
          status: true,
          efetivadoEm: true,
          tipoCesta: {
            select: {
              id: true,
              nome: true,
            },
          },
        },
        skip: (pagina - 1) * quantidade,
        take: quantidade,
        orderBy: { nome: 'asc' },
      }),
    ]);

    return {
      nome,
      pagina,
      quantidade,
      totalPaginas: Math.ceil(total / quantidade),
      resultado: beneficiarios,
    };
  }

  async atualizarEndereco(params: {
    beneficiarioId: string;
    data: AtualizarEnderecoBeneficiarioDto;
  }) {
    const { beneficiarioId, data } = params;

    await this.buscarPorId(beneficiarioId);

    await this.prismaService.beneficiario.update({
      where: { id: beneficiarioId },
      data: {
        endereco: {
          upsert: {
            create: data,
            update: data,
          },
        },
      },
      select: {
        id: true,
        endereco: true,
      },
    });
  }

  async atualizarBeneficiosSociais(params: {
    beneficiarioId: string;
    data: AtualizarBeneficiosSociaisBeneficiarioDto;
  }) {
    const { beneficiarioId, data } = params;

    await this.buscarPorId(beneficiarioId);

    await this.prismaService.beneficiario.update({
      where: { id: beneficiarioId },
      data: {
        beneficiosSociais: {
          upsert: {
            create: data,
            update: data,
          },
        },
      },
    });
  }

  async atualizarSaude(params: { beneficiarioId: string; data: AtualizarSaudeBeneficiarioDto }) {
    const { beneficiarioId, data } = params;

    await this.buscarPorId(beneficiarioId);

    await this.prismaService.beneficiario.update({
      where: { id: beneficiarioId },
      data: {
        saude: {
          upsert: {
            create: data,
            update: data,
          },
        },
      },
    });
  }

  async atualizarInteresses(params: {
    beneficiarioId: string;
    data: AtualizarInteressesBeneficiarioDto;
  }) {
    const { beneficiarioId, data } = params;

    await this.buscarPorId(beneficiarioId);

    await this.prismaService.beneficiario.update({
      where: { id: beneficiarioId },
      data: {
        interesses: {
          upsert: {
            create: data,
            update: data,
          },
        },
      },
    });
  }

  async adicionarDependentes(params: {
    beneficiarioId: string;
    data: AdicionarDependentesBeneficiarioDto;
  }) {
    const { beneficiarioId, data } = params;
    const { dependentes } = data;

    await this.buscarPorId(beneficiarioId);

    await Promise.all(
      dependentes.map((dependente) =>
        this.prismaService.dependenteBeneficiario.create({
          data: {
            beneficiarioId,
            ...dependente,
          },
        }),
      ),
    );
  }

  async editarDependente(params: {
    beneficiarioId: string;
    dependenteId: string;
    data: EditarDependenteDto;
  }) {
    const { beneficiarioId, dependenteId, data } = params;
    const beneficiario = await this.buscarPorId(beneficiarioId);
    const dependente = beneficiario.dependentes.find((d) => d.id === dependenteId);

    if (!dependente) {
      throw new AppErrorNotFound('Dependente não encontrado');
    }

    await this.prismaService.dependenteBeneficiario.update({
      where: {
        id: dependenteId,
      },
      data,
    });
  }

  async removerDependente(params: { beneficiarioId: string; dependenteId: string }) {
    const { beneficiarioId, dependenteId } = params;
    const beneficiario = await this.buscarPorId(beneficiarioId);

    if (
      !beneficiario.dependentes.length ||
      !beneficiario.dependentes.some((dependente) => dependente.id === dependenteId)
    ) {
      throw new AppErrorNotFound('Dependente não encontrado');
    }

    await this.prismaService.dependenteBeneficiario.delete({
      where: { id: dependenteId },
    });
  }

  async atualizarTipoCesta(params: { beneficiarioId: string; tipoCestaId: string }) {
    const { beneficiarioId, tipoCestaId } = params;
    await this.buscarPorId(beneficiarioId);

    const tipoCesta = await this.prismaService.tipoCesta.findUnique({
      where: { id: tipoCestaId },
    });

    if (!tipoCesta) {
      throw new AppErrorNotFound('Tipo de cesta não encontrado');
    }

    await this.prismaService.beneficiario.update({
      where: { id: beneficiarioId },
      data: { tipoCestaId },
      select: {
        id: true,
        tipoCesta: {
          select: {
            id: true,
            nome: true,
          },
        },
      },
    });
  }

  async desligarBeneficiario(params: {
    beneficiarioId: string;
    data: CriarDesligamentoBeneficiarioDto;
  }) {
    const { beneficiarioId, data } = params;
    const beneficiario = await this.buscarPorId(beneficiarioId);

    if (beneficiario.status === ENUM_STATUS_BENEFICIARIO.INATIVO) {
      throw new AppErrorConflict('Beneficiário já está inativo');
    }

    await this.prismaService.$transaction([
      this.prismaService.beneficiario.update({
        where: { id: beneficiarioId },
        data: { status: ENUM_STATUS_BENEFICIARIO.INATIVO },
      }),
      this.prismaService.desligamentoBeneficiario.create({
        data: {
          beneficiarioId,
          motivo: data.motivo,
          dataDesligamento: new Date(),
        },
      }),
    ]);
  }

  async reativarBeneficiario(beneficiarioId: string) {
    const beneficiario = await this.buscarPorId(beneficiarioId);

    if (beneficiario.status === ENUM_STATUS_BENEFICIARIO.ATIVO) {
      throw new AppErrorConflict('Beneficiário já está ativo');
    }

    await this.prismaService.beneficiario.update({
      where: { id: beneficiarioId },
      data: {
        status: ENUM_STATUS_BENEFICIARIO.ATIVO,
        efetivadoEm: new Date(),
      },
    });
  }
}
