import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { BeneficiarioService } from './beneficiario.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AtualizarEnderecoBeneficiarioDto } from './dto/atualizar-endereco-beneficiario.dto';
import { AtualizarTipoCestaDto } from './dto/atualizar-tipo-cesta-beneficiario.dto';
import { CriarBeneficiarioDto } from './dto/criar-beneficiario.dto';
import { AdicionarDependentesBeneficiarioDto } from './dto/adicionar-dependente-beneficiario.dto';
import { ListarBeneficiariosDto } from './dto/listar-beneficiarios.dto';
import { Doc } from 'src/utils/docs/doc';
import {
  BeneficiarioComHistoricoResponseDto,
  BeneficiarioResponseDto,
  ListarBeneficiariosResponseDto,
} from './doc/beneficiario.response.dto';

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
    resposta: BeneficiarioResponseDto,
  })
  @Post('/')
  async criar(@Body() dto: CriarBeneficiarioDto) {
    return await this.beneficiarioService.criar(dto);
  }

  @Doc({
    nome: 'Atualizar endereço',
    descricao: 'Atualiza o endereço de um beneficiário',
    resposta: BeneficiarioResponseDto,
  })
  @Put('/:beneficiarioId/endereco')
  async atualizarEndereco(
    @Param('beneficiarioId') beneficiarioId: string,
    @Body() data: AtualizarEnderecoBeneficiarioDto,
  ) {
    return await this.beneficiarioService.atualizarEndereco({ beneficiarioId, data });
  }

  @Doc({
    nome: 'Adicionar dependentes',
    descricao: 'Adiciona um ou mais dependentes ao beneficiário',
    resposta: BeneficiarioResponseDto,
  })
  @Post('/:beneficiarioId/dependentes')
  async adicionarDependentes(
    @Param('beneficiarioId') beneficiarioId: string,
    @Body() data: AdicionarDependentesBeneficiarioDto,
  ) {
    return await this.beneficiarioService.adicionarDependentes({ beneficiarioId, data });
  }

  @Doc({
    nome: 'Remover dependente',
    descricao: 'Remove um dependente do beneficiário',
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
    resposta: BeneficiarioResponseDto,
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
}
