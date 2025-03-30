import { Module } from '@nestjs/common';
import { RecebimentoDoacaoService } from './recebimento-doacao.service';
import { RecebimentoDoacaoController } from './recebimento-doacao.controller';

@Module({
  controllers: [RecebimentoDoacaoController],
  providers: [RecebimentoDoacaoService],
})
export class RecebimentoDoacaoModule {}
