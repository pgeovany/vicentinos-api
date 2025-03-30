import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CriarProdutoDto } from './dto/criar-produto.dto';
import { Doc } from 'src/utils/docs/doc';
import { ProdutoComEstoqueResponseDto } from './doc/produto.response';

@ApiTags('Produto')
@UseGuards(JwtAuthGuard)
@Controller('produto')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Doc({
    nome: 'Criar Produto',
    descricao: 'Cria um novo produto com estoque vazio.\n\nOBS: O nome do produto deve ser único.',
    resposta: ProdutoComEstoqueResponseDto,
  })
  @Post('/')
  async criar(@Body() data: CriarProdutoDto) {
    return await this.produtoService.criar(data);
  }
}
