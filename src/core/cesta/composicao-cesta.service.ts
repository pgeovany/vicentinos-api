import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/persistencia/banco/prisma/prisma.service';
import { CriarCestaDto } from './dto/criar-cesta.dto';
import { AppErrorConflict } from 'src/utils/errors/app-errors';

@Injectable()
export class ComposicaoCestaService {
  constructor(private readonly prismaService: PrismaService) {}

  private async buscarPorNome(nome: string) {
    return await this.prismaService.tipoCesta.findUnique({
      where: { nome },
    });
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
}
