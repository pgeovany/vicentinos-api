import { Body, Controller, Delete, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ComposicaoCestaService } from './composicao-cesta.service';
import { DistribuicaoCestaService } from './distribuicao-cesta.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CriarCestaDto } from './dto/criar-cesta.dto';
import { Doc } from 'src/utils/docs/doc';
import { CestaResponseDto } from './doc/cesta.response.dto';
import { AdicionarProdutosCestaDto } from './dto/adicionar-produtos-cesta.dto';

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
}
