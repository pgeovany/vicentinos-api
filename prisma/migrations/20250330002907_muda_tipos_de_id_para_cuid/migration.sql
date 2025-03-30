/*
  Warnings:

  - The primary key for the `controle_tentativa_acesso` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `usuario` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "controle_tentativa_acesso" DROP CONSTRAINT "controle_tentativa_acesso_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "controle_tentativa_acesso_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "controle_tentativa_acesso_id_seq";

-- AlterTable
ALTER TABLE "usuario" DROP CONSTRAINT "usuario_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "usuario_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "usuario_id_seq";
