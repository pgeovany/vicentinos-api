import { Body, Controller, Get, Put, Query, UseGuards } from '@nestjs/common';
import { EstoqueService } from './estoque.service';
import { ApiTags } from '@nestjs/swagger';
import { Doc } from 'src/utils/docs/doc';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ListarMovimentacoesEstoqueDto } from './dto/listar-movimentacoes-estoque.dto';
import {
  AnalisarEstoqueResponseDto,
  ListarMovimentacaoTotaisResponseDto,
  ListarMovimentacoesEstoqueResponseDto,
} from './doc/estoque.response.dto';
import { ListarEntradasESaidas } from './dto/listar-quantidade-movimentacoes.dto';
import { RemocaoDiretaEstoqueDto } from './dto/remocao-direta.dto';

@ApiTags('Produto/Estoque')
@UseGuards(JwtAuthGuard)
@Controller('estoque')
export class EstoqueController {
  constructor(private readonly estoqueService: EstoqueService) {}

  @Doc({
    nome: 'Listar movimentações estoque',
    resposta: ListarMovimentacoesEstoqueResponseDto,
  })
  @Get('/movimentacoes')
  async listarMovimentacoes(@Query() filtros: ListarMovimentacoesEstoqueDto) {
    return await this.estoqueService.listarMovimentacoes(filtros);
  }

  @Doc({
    nome: 'Listar total entradas e saídas',
    descricao: 'Lista a quantidade total de entradas e saídas dos produtos, com filtros',
    resposta: ListarMovimentacaoTotaisResponseDto,
  })
  @Get('/entradas-saidas')
  async listarEntradasESaidas(@Query() filtros: ListarEntradasESaidas) {
    return await this.estoqueService.listarEntradasESaidas(filtros);
  }

  @Doc({
    nome: 'Análise de estoque',
    descricao: 'Retorna análise de produtos reservados vs disponíveis em estoque',
    resposta: AnalisarEstoqueResponseDto,
  })
  @Get('/analise-estoque')
  async analisarEstoque() {
    return await this.estoqueService.analisarEstoque();
  }

  @Doc({
    nome: 'Remoção direta de estoque',
    descricao: 'Apenas para ser utilizado em casos excepcionais, como vencimento de produtos',
  })
  @Put('/remocao-direta')
  async remocaoDireta(@Body() params: RemocaoDiretaEstoqueDto) {
    return await this.estoqueService.remocaoDireta(params);
  }
}
