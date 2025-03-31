-- DropForeignKey
ALTER TABLE "beneficiario" DROP CONSTRAINT "beneficiario_tipo_cesta_id_fkey";

-- DropForeignKey
ALTER TABLE "endereco_beneficiario" DROP CONSTRAINT "endereco_beneficiario_beneficiario_id_fkey";

-- DropForeignKey
ALTER TABLE "historico_distribuicao" DROP CONSTRAINT "historico_distribuicao_beneficiario_id_fkey";

-- DropForeignKey
ALTER TABLE "historico_distribuicao" DROP CONSTRAINT "historico_distribuicao_tipo_cesta_id_fkey";

-- DropForeignKey
ALTER TABLE "item_distribuicao_emergencial" DROP CONSTRAINT "item_distribuicao_emergencial_distribuicao_emergencial_id_fkey";

-- DropForeignKey
ALTER TABLE "item_distribuicao_emergencial" DROP CONSTRAINT "item_distribuicao_emergencial_produto_id_fkey";

-- DropForeignKey
ALTER TABLE "item_recebimento" DROP CONSTRAINT "item_recebimento_doacao_id_fkey";

-- DropForeignKey
ALTER TABLE "item_recebimento" DROP CONSTRAINT "item_recebimento_produto_id_fkey";

-- DropForeignKey
ALTER TABLE "membros_beneficiario" DROP CONSTRAINT "membros_beneficiario_beneficiario_id_fkey";

-- DropForeignKey
ALTER TABLE "produto_cesta" DROP CONSTRAINT "produto_cesta_produto_id_fkey";

-- DropForeignKey
ALTER TABLE "produto_cesta" DROP CONSTRAINT "produto_cesta_tipo_cesta_id_fkey";

-- DropForeignKey
ALTER TABLE "produto_estoque" DROP CONSTRAINT "produto_estoque_produto_id_fkey";

-- DropForeignKey
ALTER TABLE "produto_movimentacao_estoque" DROP CONSTRAINT "produto_movimentacao_estoque_estoque_produto_id_fkey";

-- AlterTable
ALTER TABLE "beneficiario" ALTER COLUMN "tipo_cesta_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "historico_distribuicao" ALTER COLUMN "tipo_cesta_id" DROP NOT NULL,
ALTER COLUMN "beneficiario_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "produto_estoque" ADD CONSTRAINT "produto_estoque_produto_id_fkey" FOREIGN KEY ("produto_id") REFERENCES "produto"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "produto_movimentacao_estoque" ADD CONSTRAINT "produto_movimentacao_estoque_estoque_produto_id_fkey" FOREIGN KEY ("estoque_produto_id") REFERENCES "produto_estoque"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_recebimento" ADD CONSTRAINT "item_recebimento_doacao_id_fkey" FOREIGN KEY ("doacao_id") REFERENCES "recebimento_doacao"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_recebimento" ADD CONSTRAINT "item_recebimento_produto_id_fkey" FOREIGN KEY ("produto_id") REFERENCES "produto"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_distribuicao_emergencial" ADD CONSTRAINT "item_distribuicao_emergencial_distribuicao_emergencial_id_fkey" FOREIGN KEY ("distribuicao_emergencial_id") REFERENCES "distribuicao_emergencial"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_distribuicao_emergencial" ADD CONSTRAINT "item_distribuicao_emergencial_produto_id_fkey" FOREIGN KEY ("produto_id") REFERENCES "produto"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "produto_cesta" ADD CONSTRAINT "produto_cesta_produto_id_fkey" FOREIGN KEY ("produto_id") REFERENCES "produto"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "produto_cesta" ADD CONSTRAINT "produto_cesta_tipo_cesta_id_fkey" FOREIGN KEY ("tipo_cesta_id") REFERENCES "tipo_cesta"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "beneficiario" ADD CONSTRAINT "beneficiario_tipo_cesta_id_fkey" FOREIGN KEY ("tipo_cesta_id") REFERENCES "tipo_cesta"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "endereco_beneficiario" ADD CONSTRAINT "endereco_beneficiario_beneficiario_id_fkey" FOREIGN KEY ("beneficiario_id") REFERENCES "beneficiario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "membros_beneficiario" ADD CONSTRAINT "membros_beneficiario_beneficiario_id_fkey" FOREIGN KEY ("beneficiario_id") REFERENCES "beneficiario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "historico_distribuicao" ADD CONSTRAINT "historico_distribuicao_tipo_cesta_id_fkey" FOREIGN KEY ("tipo_cesta_id") REFERENCES "tipo_cesta"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "historico_distribuicao" ADD CONSTRAINT "historico_distribuicao_beneficiario_id_fkey" FOREIGN KEY ("beneficiario_id") REFERENCES "beneficiario"("id") ON DELETE SET NULL ON UPDATE CASCADE;
