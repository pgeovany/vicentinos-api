-- AlterTable
ALTER TABLE "tipo_cesta" ADD COLUMN     "descricao" TEXT,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'ATIVO';
