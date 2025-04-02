/*
  Warnings:

  - You are about to drop the column `nomeProduto` on the `produto_cesta` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "produto_cesta" DROP COLUMN "nomeProduto",
ALTER COLUMN "quantidade" DROP DEFAULT;
