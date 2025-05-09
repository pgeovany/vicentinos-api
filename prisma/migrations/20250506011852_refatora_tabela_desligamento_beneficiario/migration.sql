/*
  Warnings:

  - Made the column `beneficiario_id` on table `desligamento_beneficiario` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "desligamento_beneficiario" DROP CONSTRAINT "desligamento_beneficiario_beneficiario_id_fkey";

-- AlterTable
ALTER TABLE "desligamento_beneficiario" ALTER COLUMN "beneficiario_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "desligamento_beneficiario" ADD CONSTRAINT "desligamento_beneficiario_beneficiario_id_fkey" FOREIGN KEY ("beneficiario_id") REFERENCES "beneficiario"("id") ON DELETE CASCADE ON UPDATE CASCADE;
