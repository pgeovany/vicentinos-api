import { Module } from '@nestjs/common';
import { DistribuicaoEmergencialService } from './distribuicao-emergencial.service';
import { DistribuicaoEmergencialController } from './distribuicao-emergencial.controller';
import { EstoqueModule } from '../produto/modules/estoque/estoque.module';
import { ProdutoModule } from '../produto/produto.module';

@Module({
  controllers: [DistribuicaoEmergencialController],
  providers: [DistribuicaoEmergencialService],
  imports: [ProdutoModule, EstoqueModule],
})
export class DistribuicaoEmergencialModule {}
