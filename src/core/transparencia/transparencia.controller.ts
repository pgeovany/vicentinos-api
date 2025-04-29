import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { TransparenciaService } from './transparencia.service';
import { ApiTags } from '@nestjs/swagger';
import { Doc } from 'src/utils/docs/doc';
import { TransparenciaResponseDto } from './doc/transparencia.response.dto';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';

@ApiTags('[PÚBLICO] - Transparência')
@UseInterceptors(CacheInterceptor)
@Controller('transparencia')
export class TransparenciaController {
  constructor(private readonly transparenciaService: TransparenciaService) {}

  @Doc({
    nome: 'Buscar dados de transparência',
    descricao: 'Retorna dados sobre quantidade de produtos recebidos, familias ajudadas e etc',
    resposta: TransparenciaResponseDto,
    auth: false,
  })
  @Get('/obter-dados')
  @CacheKey('familias-ajudadas-ultimo-mes')
  @CacheTTL(60 * 60 * 24) // 24 horas
  async obterDados() {
    return await this.transparenciaService.obterDados();
  }
}
