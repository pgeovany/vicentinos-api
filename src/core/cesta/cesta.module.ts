import { Module } from '@nestjs/common';
import { ComposicaoCestaService } from './composicao-cesta.service';
import { CestaController } from './cesta.controller';
import { DistribuicaoCestaService } from './distribuicao-cesta.service';

@Module({
  controllers: [CestaController],
  providers: [ComposicaoCestaService, DistribuicaoCestaService],
})
export class CestaModule {}
