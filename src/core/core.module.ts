import { Module } from '@nestjs/common';
import { ProdutoModule } from './produto/produto.module';
import { CestaModule } from './cesta/cesta.module';
import { BeneficiarioModule } from './beneficiario/beneficiario.module';
import { RecebimentoDoacaoModule } from './recebimento-doacao/recebimento-doacao.module';

@Module({
  imports: [ProdutoModule, CestaModule, BeneficiarioModule, RecebimentoDoacaoModule],
})
export class CoreModule {}
