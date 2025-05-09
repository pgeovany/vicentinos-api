import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { BeneficiarioService } from './beneficiario.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AtualizarEnderecoBeneficiarioDto } from './dto/atualizar-endereco-beneficiario.dto';
import { AtualizarTipoCestaDto } from './dto/atualizar-tipo-cesta-beneficiario.dto';
import { CriarBeneficiarioDto } from './dto/criar-beneficiario.dto';
import {
  AdicionarDependentesBeneficiarioDto,
  EditarDependenteDto,
} from './dto/adicionar-dependente-beneficiario.dto';
import { ListarBeneficiariosDto } from './dto/listar-beneficiarios.dto';
import { Doc } from 'src/utils/docs/doc';
import {
  BeneficiarioComHistoricoResponseDto,
  CriarBeneficiarioResponseDto,
  ListarBeneficiariosResponseDto,
} from './doc/beneficiario.response.dto';
import { CriarDesligamentoBeneficiarioDto } from './dto/criar-desligamento-beneficiario.dto';
import { AtualizarBeneficiosSociaisBeneficiarioDto } from './dto/atualizar-beneficios-sociais-beneficiario.dto';
import { AtualizarSaudeBeneficiarioDto } from './dto/atualizar-saude-beneficiario.dto';
import { AtualizarInteressesBeneficiarioDto } from './dto/atualizar-interesses-beneficiario.dto';

@ApiTags('Beneficiário')
@UseGuards(JwtAuthGuard)
@Controller('beneficiario')
export class BeneficiarioController {
  constructor(private readonly beneficiarioService: BeneficiarioService) {}

  @Doc({
    nome: 'Listar beneficiários',
    descricao: 'Lista todos os beneficiários com paginação e filtros',
    resposta: ListarBeneficiariosResponseDto,
  })
  @Get('/')
  async listar(@Query() filtros: ListarBeneficiariosDto) {
    return await this.beneficiarioService.listar(filtros);
  }

  @Doc({
    nome: 'Buscar beneficiário por id',
    descricao:
      'Retorna todos os detalhes do beneficiário, inclusive histórico de recebimentos de cesta',
    resposta: BeneficiarioComHistoricoResponseDto,
  })
  @Get('/:beneficiarioId')
  async buscarDetalhes(@Param('beneficiarioId') beneficiarioId: string) {
    return await this.beneficiarioService.buscarDetalhes(beneficiarioId);
  }

  @Doc({
    nome: 'Criar beneficiário',
    descricao:
      'Cria um novo beneficiário com dados básicos. Caso beneficiarioId seja enviado, atualiza os dados do beneficiário',
    resposta: CriarBeneficiarioResponseDto,
  })
  @Post('/')
  async criar(@Body() dto: CriarBeneficiarioDto) {
    return await this.beneficiarioService.criar(dto);
  }

  @Doc({
    nome: 'Atualizar endereço',
    descricao: 'Atualiza o endereço de um beneficiário',
  })
  @Put('/:beneficiarioId/endereco')
  async atualizarEndereco(
    @Param('beneficiarioId') beneficiarioId: string,
    @Body() data: AtualizarEnderecoBeneficiarioDto,
  ) {
    return await this.beneficiarioService.atualizarEndereco({ beneficiarioId, data });
  }

  @Doc({
    nome: 'Atualizar benefícios sociais',
    descricao: 'Atualiza as informações de benefícios sociais do beneficiário',
  })
  @Put('/:beneficiarioId/beneficios-sociais')
  async atualizarBeneficiosSociais(
    @Param('beneficiarioId') beneficiarioId: string,
    @Body() data: AtualizarBeneficiosSociaisBeneficiarioDto,
  ) {
    return await this.beneficiarioService.atualizarBeneficiosSociais({ beneficiarioId, data });
  }

  @Doc({
    nome: 'Atualizar informações de saúde',
    descricao: 'Atualiza as informações de saúde do beneficiário',
  })
  @Put('/:beneficiarioId/saude')
  async atualizarSaude(
    @Param('beneficiarioId') beneficiarioId: string,
    @Body() data: AtualizarSaudeBeneficiarioDto,
  ) {
    return await this.beneficiarioService.atualizarSaude({ beneficiarioId, data });
  }

  @Doc({
    nome: 'Atualizar interesses',
    descricao: 'Atualiza as informações de interesses do beneficiário',
  })
  @Put('/:beneficiarioId/interesses')
  async atualizarInteresses(
    @Param('beneficiarioId') beneficiarioId: string,
    @Body() data: AtualizarInteressesBeneficiarioDto,
  ) {
    return await this.beneficiarioService.atualizarInteresses({ beneficiarioId, data });
  }

  @Doc({
    nome: 'Adicionar dependentes',
    descricao: 'Adiciona um ou mais dependentes ao beneficiário',
  })
  @Post('/:beneficiarioId/dependentes')
  async adicionarDependentes(
    @Param('beneficiarioId') beneficiarioId: string,
    @Body() data: AdicionarDependentesBeneficiarioDto,
  ) {
    return await this.beneficiarioService.adicionarDependentes({ beneficiarioId, data });
  }

  @Doc({
    nome: 'Editar dependente',
  })
  @Put('/:beneficiarioId/dependentes/:dependenteId')
  async editarDependente(
    @Param('beneficiarioId') beneficiarioId: string,
    @Param('dependenteId') dependenteId: string,
    @Body() data: EditarDependenteDto,
  ) {
    return await this.beneficiarioService.editarDependente({ beneficiarioId, dependenteId, data });
  }

  @Doc({
    nome: 'Remover dependente',
  })
  @Delete('/:beneficiarioId/dependentes/:dependenteId')
  async removerMembro(
    @Param('beneficiarioId') beneficiarioId: string,
    @Param('dependenteId') dependenteId: string,
  ) {
    return await this.beneficiarioService.removerDependente({
      beneficiarioId,
      dependenteId,
    });
  }

  @Doc({
    nome: 'Atualizar tipo de cesta',
    descricao: 'Define ou atualiza o tipo de cesta do beneficiário',
  })
  @Put('/:beneficiarioId/tipo-cesta')
  async atualizarTipoCesta(
    @Param('beneficiarioId') beneficiarioId: string,
    @Body() data: AtualizarTipoCestaDto,
  ) {
    return await this.beneficiarioService.atualizarTipoCesta({
      beneficiarioId,
      tipoCestaId: data.tipoCestaId,
    });
  }

  @Doc({
    nome: 'Reativar beneficiário',
    descricao: 'Ativa um beneficiário que estava inativo',
  })
  @Put('/:beneficiarioId/ativar')
  async reativarBeneficiario(@Param('beneficiarioId') beneficiarioId: string) {
    return await this.beneficiarioService.reativarBeneficiario(beneficiarioId);
  }

  @Doc({
    nome: 'Inativar beneficiário',
    descricao: 'Desativa o cadastro do beneficiário',
  })
  @Delete('/:beneficiarioId/inativar')
  async desligarBeneficiario(
    @Param('beneficiarioId') beneficiarioId: string,
    @Body() data: CriarDesligamentoBeneficiarioDto,
  ) {
    return await this.beneficiarioService.desligarBeneficiario({ beneficiarioId, data });
  }
}
