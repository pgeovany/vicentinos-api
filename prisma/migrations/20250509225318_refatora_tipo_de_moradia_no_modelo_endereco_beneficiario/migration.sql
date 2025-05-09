/*
  Warnings:

  - You are about to drop the column `alugado` on the `endereco_beneficiario` table. All the data in the column will be lost.
  - You are about to drop the column `cedido` on the `endereco_beneficiario` table. All the data in the column will be lost.
  - You are about to drop the column `financiado` on the `endereco_beneficiario` table. All the data in the column will be lost.
  - You are about to drop the column `heranca` on the `endereco_beneficiario` table. All the data in the column will be lost.
  - You are about to drop the column `ocupacao` on the `endereco_beneficiario` table. All the data in the column will be lost.
  - You are about to drop the column `programaSocial` on the `endereco_beneficiario` table. All the data in the column will be lost.
  - You are about to drop the column `proprio` on the `endereco_beneficiario` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "endereco_beneficiario" DROP COLUMN "alugado",
DROP COLUMN "cedido",
DROP COLUMN "financiado",
DROP COLUMN "heranca",
DROP COLUMN "ocupacao",
DROP COLUMN "programaSocial",
DROP COLUMN "proprio",
ADD COLUMN     "tipo_moradia" TEXT;
