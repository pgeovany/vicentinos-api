import { Body, Controller, Post } from '@nestjs/common';
import { RecebimentoDoacaoService } from './recebimento-doacao.service';
import { ApiTags } from '@nestjs/swagger';
import { SalvarDoacaoDto } from './dto/salvar-doacao.dto';
import { Doc } from 'src/utils/docs/doc';
import { RecebimentoDoacaoResponseDto } from './doc/recebimento-doacao.response.dto';

@ApiTags('Recebimento Doação')
@Controller('recebimento-doacao')
export class RecebimentoDoacaoController {
  constructor(private readonly recebimentoDoacaoService: RecebimentoDoacaoService) {}

  @Doc({
    nome: 'Salvar doação',
    descricao: 'Salva uma nova doação recebida',
    resposta: RecebimentoDoacaoResponseDto,
  })
  @Post('/')
  async salvar(@Body() params: SalvarDoacaoDto) {
    return await this.recebimentoDoacaoService.salvar(params);
  }
}
