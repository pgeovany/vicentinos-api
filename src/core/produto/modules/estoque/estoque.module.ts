import { Module } from '@nestjs/common';
import { EstoqueService } from './estoque.service';
import { EstoqueController } from './estoque.controller';
import { ProdutoModule } from '../../produto.module';
import { EstoqueCronService } from './estoque-cron.service';

@Module({
  controllers: [EstoqueController],
  providers: [EstoqueService, EstoqueCronService],
  imports: [ProdutoModule],
  exports: [EstoqueService],
})
export class EstoqueModule {}
