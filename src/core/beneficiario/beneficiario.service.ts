import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/persistencia/banco/prisma/prisma.service';
import { AppErrorConflict, AppErrorNotFound } from 'src/utils/errors/app-errors';
import { AtualizarEnderecoBeneficiarioDto } from './dto/atualizar-endereco-beneficiario.dto';
import { CriarBeneficiarioDto } from './dto/criar-beneficiario.dto';
import { ENUM_STATUS_BENEFICIARIO } from 'src/utils/enum/beneficiario.enum';
import { AdicionarDependentesBeneficiarioDto } from './dto/adicionar-dependente-beneficiario.dto';
import { ListarBeneficiariosDto } from './dto/listar-beneficiarios.dto';
import { Prisma } from '@prisma/client';

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
      select: {
        id: true,
        nome: true,
        cpf: true,
        dataNascimento: true,
        telefone: true,
        email: true,
      },
    });
  }

  private async buscarPorId(beneficiarioId: string) {
    const beneficiario = await this.prismaService.beneficiario.findUnique({
      where: {
        id: beneficiarioId,
        status: ENUM_STATUS_BENEFICIARIO.ATIVO,
      },
      select: {
        id: true,
        nome: true,
        cpf: true,
        rg: true,
        dataNascimento: true,
        telefone: true,
        email: true,
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

  async buscarDetalhes(beneficiarioId: string) {
    const beneficiario = await this.prismaService.beneficiario.findUnique({
      where: {
        id: beneficiarioId,
        status: ENUM_STATUS_BENEFICIARIO.ATIVO,
      },
      select: {
        id: true,
        nome: true,
        cpf: true,
        rg: true,
        dataNascimento: true,
        telefone: true,
        email: true,
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
        historicoRecebimentos: {
          select: {
            id: true,
            tipoCestaId: true,
            nomeCesta: true,
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
        endereco: {},
      },
      select: {
        id: true,
        nome: true,
        cpf: true,
        dataNascimento: true,
        telefone: true,
        email: true,
      },
    });
  }

  async listar(filtros: ListarBeneficiariosDto) {
    const pagina = filtros.pagina ? +filtros.pagina : 1;
    const quantidade = filtros.quantidade ? +filtros.quantidade : 10;
    const nome = filtros.nome ?? '';

    const where: Prisma.BeneficiarioWhereInput = {
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
          cpf: true,
          rg: true,
          dataNascimento: true,
          telefone: true,
          email: true,
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
        skip: (pagina - 1) * quantidade,
        take: quantidade,
        orderBy: { nome: 'asc' },
      }),
    ]);

    return {
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

    return await this.buscarPorId(beneficiarioId);
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

    return await this.buscarPorId(beneficiarioId);
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

    return await this.buscarPorId(beneficiarioId);
  }
}
