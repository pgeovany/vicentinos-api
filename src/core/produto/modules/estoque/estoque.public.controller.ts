import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { EstoqueService } from './estoque.service';
import { ApiTags } from '@nestjs/swagger';
import { Doc } from 'src/utils/docs/doc';
import { ListarProdutosMaisNecessitadosResponseDto } from './doc/estoque.response.dto';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';

@ApiTags('[PÚBLICO] - Produto/Estoque')
@UseInterceptors(CacheInterceptor)
@Controller('public/estoque')
export class EstoquePublicController {
  constructor(private readonly estoqueService: EstoqueService) {}

  @Doc({
    nome: 'Listar produtos mais necessitados',
    descricao:
      'Retorna a lista dos produtos mais necessitados, de acordo com as quantidades em estoque e quantidades reservadas.',
    resposta: ListarProdutosMaisNecessitadosResponseDto,
  })
  @Get('/')
  @CacheKey('produtos-mais-necessitados')
  @CacheTTL(1 * 60 * 1000) // 1 minuto
  async listarProdutosMaisNecessitados() {
    return await this.estoqueService.listarProdutosMaisNecessitados();
  }
}
