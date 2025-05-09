/*
  Warnings:

  - You are about to drop the column `email` on the `beneficiario` table. All the data in the column will be lost.
  - You are about to drop the column `motivoDesativacao` on the `beneficiario` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `dependente_beneficiario` table. All the data in the column will be lost.
  - You are about to drop the column `telefone` on the `dependente_beneficiario` table. All the data in the column will be lost.
  - Added the required column `sexo` to the `dependente_beneficiario` table without a default value. This is not possible if the table is not empty.
  - Made the column `parentesco` on table `dependente_beneficiario` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `numero_comodos` to the `endereco_beneficiario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "beneficiario" DROP COLUMN "email",
DROP COLUMN "motivoDesativacao",
ADD COLUMN     "estado_civil" TEXT,
ADD COLUMN     "pessoa_com_deficiencia" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "profissao" TEXT;

-- AlterTable
ALTER TABLE "dependente_beneficiario" DROP COLUMN "email",
DROP COLUMN "telefone",
ADD COLUMN     "certidao_nascimento" TEXT,
ADD COLUMN     "escolaridade" TEXT,
ADD COLUMN     "observacao" TEXT,
ADD COLUMN     "rendaMensal" TEXT,
ADD COLUMN     "sexo" TEXT NOT NULL,
ADD COLUMN     "trabalho" TEXT,
ALTER COLUMN "parentesco" SET NOT NULL;

-- AlterTable
ALTER TABLE "endereco_beneficiario" ADD COLUMN     "agua_encanada" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "alugado" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "banheiro" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "cedido" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "energia_eletrica" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "esgoto" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "financiado" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "heranca" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "numero_comodos" INTEGER NOT NULL,
ADD COLUMN     "ocupacao" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "ponto_referencia" TEXT,
ADD COLUMN     "programaSocial" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "proprio" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "beneficios_sociais_beneficiario" (
    "id" TEXT NOT NULL,
    "beneficiario_id" TEXT NOT NULL,
    "bolsa_familia" BOOLEAN NOT NULL DEFAULT false,
    "cad_unico" BOOLEAN NOT NULL DEFAULT false,
    "loas" BOOLEAN NOT NULL DEFAULT false,
    "carteira_idoso" BOOLEAN NOT NULL DEFAULT false,
    "cartao_familia_carioca" BOOLEAN NOT NULL DEFAULT false,
    "minha_casa_minha_vida" BOOLEAN NOT NULL DEFAULT false,
    "paif" BOOLEAN NOT NULL DEFAULT false,
    "pronatec" BOOLEAN NOT NULL DEFAULT false,
    "aposentadoria" BOOLEAN NOT NULL DEFAULT false,
    "isencao_concurso_publico" BOOLEAN NOT NULL DEFAULT false,
    "cadastro_para_emprego" BOOLEAN NOT NULL DEFAULT false,
    "tarifa_social_energia_eletrica" BOOLEAN NOT NULL DEFAULT false,
    "outros_beneficios" TEXT,
    "observacao" TEXT,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3),

    CONSTRAINT "beneficios_sociais_beneficiario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "saude_beneficiario" (
    "id" TEXT NOT NULL,
    "beneficiario_id" TEXT NOT NULL,
    "cartaoSUS" BOOLEAN,
    "numeroCartaoSUS" TEXT,
    "clinicaFamilia" TEXT,
    "postoSaude" TEXT,
    "tratamentoHospitalar" BOOLEAN,
    "hospital" TEXT,
    "tratamentoSaude" TEXT,
    "medicamentos" TEXT,
    "observacao" TEXT,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3),

    CONSTRAINT "saude_beneficiario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "interesses_beneficiario" (
    "id" TEXT NOT NULL,
    "beneficiario_id" TEXT NOT NULL,
    "programas_sociais" BOOLEAN NOT NULL DEFAULT false,
    "violencia_domestica" BOOLEAN NOT NULL DEFAULT false,
    "dependencia_quimica" BOOLEAN NOT NULL DEFAULT false,
    "meio_ambiente" BOOLEAN NOT NULL DEFAULT false,
    "documentacao_pessoal" BOOLEAN NOT NULL DEFAULT false,
    "saude_geral" BOOLEAN NOT NULL DEFAULT false,
    "empreendedorismo" BOOLEAN NOT NULL DEFAULT false,
    "sustentabilidade" BOOLEAN NOT NULL DEFAULT false,
    "pintura_em_tecido" BOOLEAN NOT NULL DEFAULT false,
    "bijuteria" BOOLEAN NOT NULL DEFAULT false,
    "cestaria" BOOLEAN NOT NULL DEFAULT false,
    "costura" BOOLEAN NOT NULL DEFAULT false,
    "bordado" BOOLEAN NOT NULL DEFAULT false,
    "croche" BOOLEAN NOT NULL DEFAULT false,
    "trico" BOOLEAN NOT NULL DEFAULT false,
    "teatro" BOOLEAN NOT NULL DEFAULT false,
    "reciclagem" BOOLEAN NOT NULL DEFAULT false,
    "informatica" BOOLEAN NOT NULL DEFAULT false,
    "cursos" BOOLEAN NOT NULL DEFAULT false,
    "alfabetizacao" BOOLEAN NOT NULL DEFAULT false,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3),

    CONSTRAINT "interesses_beneficiario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "desligamento_beneficiario" (
    "id" TEXT NOT NULL,
    "beneficiario_id" TEXT,
    "motivo" TEXT,
    "data_desligamento" TIMESTAMP(3),
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3),

    CONSTRAINT "desligamento_beneficiario_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "beneficios_sociais_beneficiario_beneficiario_id_key" ON "beneficios_sociais_beneficiario"("beneficiario_id");

-- CreateIndex
CREATE UNIQUE INDEX "saude_beneficiario_beneficiario_id_key" ON "saude_beneficiario"("beneficiario_id");

-- CreateIndex
CREATE UNIQUE INDEX "interesses_beneficiario_beneficiario_id_key" ON "interesses_beneficiario"("beneficiario_id");

-- AddForeignKey
ALTER TABLE "beneficios_sociais_beneficiario" ADD CONSTRAINT "beneficios_sociais_beneficiario_beneficiario_id_fkey" FOREIGN KEY ("beneficiario_id") REFERENCES "beneficiario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "saude_beneficiario" ADD CONSTRAINT "saude_beneficiario_beneficiario_id_fkey" FOREIGN KEY ("beneficiario_id") REFERENCES "beneficiario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "interesses_beneficiario" ADD CONSTRAINT "interesses_beneficiario_beneficiario_id_fkey" FOREIGN KEY ("beneficiario_id") REFERENCES "beneficiario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "desligamento_beneficiario" ADD CONSTRAINT "desligamento_beneficiario_beneficiario_id_fkey" FOREIGN KEY ("beneficiario_id") REFERENCES "beneficiario"("id") ON DELETE SET NULL ON UPDATE CASCADE;
