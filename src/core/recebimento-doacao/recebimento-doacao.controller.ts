import { Controller } from '@nestjs/common';
import { RecebimentoDoacaoService } from './recebimento-doacao.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Recebimento Doação')
@Controller('recebimento-doacao')
export class RecebimentoDoacaoController {
  constructor(private readonly recebimentoDoacaoService: RecebimentoDoacaoService) {}
}
