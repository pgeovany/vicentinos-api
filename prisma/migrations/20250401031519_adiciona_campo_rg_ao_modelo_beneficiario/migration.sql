/*
  Warnings:

  - A unique constraint covering the columns `[rg]` on the table `beneficiario` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "dependente_beneficiario_cpf_key";

-- AlterTable
ALTER TABLE "beneficiario" ADD COLUMN     "rg" TEXT;

-- AlterTable
ALTER TABLE "dependente_beneficiario" ADD COLUMN     "rg" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "beneficiario_rg_key" ON "beneficiario"("rg");
