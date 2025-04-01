/*
  Warnings:

  - You are about to drop the `membros_beneficiario` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "membros_beneficiario" DROP CONSTRAINT "membros_beneficiario_beneficiario_id_fkey";

-- DropTable
DROP TABLE "membros_beneficiario";

-- CreateTable
CREATE TABLE "dependente_beneficiario" (
    "id" TEXT NOT NULL,
    "beneficiario_id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "cpf" TEXT,
    "data_nascimento" TIMESTAMP(3),
    "telefone" TEXT,
    "email" TEXT,
    "parentesco" TEXT,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3),

    CONSTRAINT "dependente_beneficiario_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "dependente_beneficiario_cpf_key" ON "dependente_beneficiario"("cpf");

-- AddForeignKey
ALTER TABLE "dependente_beneficiario" ADD CONSTRAINT "dependente_beneficiario_beneficiario_id_fkey" FOREIGN KEY ("beneficiario_id") REFERENCES "beneficiario"("id") ON DELETE CASCADE ON UPDATE CASCADE;
