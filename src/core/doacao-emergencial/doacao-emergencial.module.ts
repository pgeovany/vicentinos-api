import { Module } from '@nestjs/common';
import { DoacaoEmergencialService } from './doacao-emergencial.service';
import { DoacaoEmergencialController } from './doacao-emergencial.controller';
import { EstoqueModule } from '../produto/modules/estoque/estoque.module';
import { ProdutoModule } from '../produto/produto.module';

@Module({
  controllers: [DoacaoEmergencialController],
  providers: [DoacaoEmergencialService],
  imports: [ProdutoModule, EstoqueModule],
})
export class DoacaoEmergencialModule {}
