/*
  Warnings:

  - Added the required column `sexo` to the `beneficiario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "beneficiario" ADD COLUMN     "rendaMensal" TEXT,
ADD COLUMN     "sexo" TEXT NOT NULL;
