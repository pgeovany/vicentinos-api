import { Controller, Get } from '@nestjs/common';
import { TransparenciaService } from './transparencia.service';
import { ApiTags } from '@nestjs/swagger';
import { Doc } from 'src/utils/docs/doc';
import { TransparenciaResponseDto } from './doc/transparencia.response.dto';

@ApiTags('[PÚBLICO] - Transparência')
@Controller('transparencia')
export class TransparenciaController {
  constructor(private readonly transparenciaService: TransparenciaService) {}

  @Doc({
    nome: 'Buscar dados de transparência',
    descricao: 'Retorna dados sobre quantidade de produtos recebidos, familias ajudadas e etc',
    resposta: TransparenciaResponseDto,
  })
  @Get('/obter-dados')
  async obterDados() {
    return await this.transparenciaService.obterDados();
  }
}
