/*
  Warnings:

  - You are about to drop the column `data_distribuicao` on the `historico_distribuicao` table. All the data in the column will be lost.
  - Added the required column `nomeCesta` to the `historico_distribuicao` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "historico_distribuicao" DROP COLUMN "data_distribuicao",
ADD COLUMN     "nomeCesta" TEXT NOT NULL;
