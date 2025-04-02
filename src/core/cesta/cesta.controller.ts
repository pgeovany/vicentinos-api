import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ComposicaoCestaService } from './composicao-cesta.service';
import { DistribuicaoCestaService } from './distribuicao-cesta.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CriarCestaDto } from './dto/criar-cesta.dto';
import { Doc } from 'src/utils/docs/doc';
import {
  CestaResponseDto,
  ListarDistribuicoesPendentesResponseDto,
  ListarHistoricoDistribuicoesResponseDto,
  ListarTiposCestasResponseDto,
} from './doc/cesta.response.dto';
import { AdicionarProdutosCestaDto } from './dto/adicionar-produtos-cesta.dto';
import { ListarDistribuicoesPendentesDto } from './dto/listar-distribuicoes-pendentes.dto';
import { ListarHistoricoDistribuicoesDto } from './dto/listar-historico-distribuicoes.dto';

@ApiTags('Cesta')
@UseGuards(JwtAuthGuard)
@Controller('cesta')
export class CestaController {
  constructor(
    private readonly composicaoCestaService: ComposicaoCestaService,
    private readonly distribuicaoCestaService: DistribuicaoCestaService,
  ) {}

  @Doc({
    nome: 'Criar cesta',
    descricao: 'Cria um novo tipo de cesta',
    resposta: CestaResponseDto,
  })
  @Post('/criar')
  async criarCesta(@Body() params: CriarCestaDto) {
    return await this.composicaoCestaService.criar(params);
  }

  @Doc({
    nome: 'Listar tipos de cesta',
    descricao: 'Lista todos os tipos de cesta do sistema',
    resposta: ListarTiposCestasResponseDto,
  })
  @Get('/tipos-cesta')
  async listar() {
    return await this.composicaoCestaService.listar();
  }

  @Doc({
    nome: 'Adicionar produtos',
    descricao:
      'Adiciona produtos à cesta, caso o produto já esteja na cesta, atualiza a quantidade',
    resposta: CestaResponseDto,
  })
  @Put('/:cestaId/produtos')
  async adicionarProdutos(
    @Param('cestaId') cestaId: string,
    @Body() data: AdicionarProdutosCestaDto,
  ) {
    return await this.composicaoCestaService.adicionarProdutos({ cestaId, data });
  }

  @Doc({
    nome: 'Remover produto',
    descricao: 'Remove um produto da cesta',
    resposta: CestaResponseDto,
  })
  @Delete('/:cestaId/produto/:produtoId')
  async removerProduto(@Param('cestaId') cestaId: string, @Param('produtoId') produtoId: string) {
    return await this.composicaoCestaService.removerProduto({ cestaId, produtoId });
  }

  @Doc({
    nome: 'Listar distribuições pendentes',
    descricao: 'Lista todas as distribuições pendentes do mês',
    resposta: ListarDistribuicoesPendentesResponseDto,
  })
  @Get('/distribuicoes-pendentes')
  async listarDistribuicoesPendentesDto(@Query() filtros: ListarDistribuicoesPendentesDto) {
    return await this.distribuicaoCestaService.listarDistribuicoesPendentes(filtros);
  }

  @Doc({
    nome: 'Entregar cesta',
    descricao: 'Entrega a cesta para o beneficiário, atualizando o estoque e o histórico',
  })
  @Post('/entregar/:beneficiarioId')
  async entregar(@Param('beneficiarioId') beneficiarioId: string) {
    return await this.distribuicaoCestaService.entregar(beneficiarioId);
  }

  @Doc({
    nome: 'Listar histórico de distribuições',
    descricao: 'Lista o histórico de distribuições com filtros',
    resposta: ListarHistoricoDistribuicoesResponseDto,
  })
  @Get('/historico-distribuicoes')
  async listarHistoricoDistribuicoes(@Query() filtros: ListarHistoricoDistribuicoesDto) {
    return await this.distribuicaoCestaService.listarHistoricoDistribuicoes(filtros);
  }
}
