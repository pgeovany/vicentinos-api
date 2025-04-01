import { Module } from '@nestjs/common';
import { ProdutoModule } from './produto/produto.module';
import { CestaModule } from './cesta/cesta.module';
import { BeneficiarioModule } from './beneficiario/beneficiario.module';
import { RecebimentoDoacaoModule } from './recebimento-doacao/recebimento-doacao.module';
import { EstoqueModule } from './produto/modules/estoque/estoque.module';
import { DoacaoEmergencialModule } from './doacao-emergencial/doacao-emergencial.module';

@Module({
  imports: [
    ProdutoModule,
    EstoqueModule,
    CestaModule,
    BeneficiarioModule,
    RecebimentoDoacaoModule,
    DoacaoEmergencialModule,
  ],
})
export class CoreModule {}
