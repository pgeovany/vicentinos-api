-- AlterTable
ALTER TABLE "usuario" ALTER COLUMN "email" SET DATA TYPE TEXT,
ALTER COLUMN "senha" SET DATA TYPE TEXT,
ALTER COLUMN "nome" SET DATA TYPE TEXT;

-- CreateTable
CREATE TABLE "produto" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3),

    CONSTRAINT "produto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "produto_estoque" (
    "id" TEXT NOT NULL,
    "produto_id" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL DEFAULT 0,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3),

    CONSTRAINT "produto_estoque_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "produto_movimentacao_estoque" (
    "id" TEXT NOT NULL,
    "estoque_produto_id" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL DEFAULT 0,
    "tipo" TEXT NOT NULL,
    "motivo" TEXT,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3),

    CONSTRAINT "produto_movimentacao_estoque_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recebimento_doacao" (
    "id" TEXT NOT NULL,
    "data_doacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "origem" TEXT NOT NULL,
    "observacao" TEXT,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3),

    CONSTRAINT "recebimento_doacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "item_recebimento" (
    "id" TEXT NOT NULL,
    "doacao_id" TEXT NOT NULL,
    "produto_id" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL,

    CONSTRAINT "item_recebimento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "distribuicao_emergencial" (
    "id" TEXT NOT NULL,
    "data_distribuicao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "beneficiario" TEXT,
    "motivo" TEXT,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3),

    CONSTRAINT "distribuicao_emergencial_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "item_distribuicao_emergencial" (
    "id" TEXT NOT NULL,
    "distribuicao_emergencial_id" TEXT NOT NULL,
    "produto_id" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL,

    CONSTRAINT "item_distribuicao_emergencial_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tipo_cesta" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3),

    CONSTRAINT "tipo_cesta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "produto_cesta" (
    "id" TEXT NOT NULL,
    "produto_id" TEXT NOT NULL,
    "tipo_cesta_id" TEXT NOT NULL,
    "nomeProduto" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL DEFAULT 0,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3),

    CONSTRAINT "produto_cesta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "beneficiario" (
    "id" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'ATIVO',
    "motivoDesativacao" TEXT,
    "nome" TEXT NOT NULL,
    "cpf" TEXT,
    "data_nascimento" TIMESTAMP(3),
    "telefone" TEXT,
    "email" TEXT,
    "tipo_cesta_id" TEXT NOT NULL,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3),

    CONSTRAINT "beneficiario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "endereco_beneficiario" (
    "id" TEXT NOT NULL,
    "beneficiario_id" TEXT NOT NULL,
    "rua" TEXT,
    "numero" TEXT,
    "bairro" TEXT,
    "cidade" TEXT,
    "cep" TEXT,
    "complemento" TEXT,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3),

    CONSTRAINT "endereco_beneficiario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "membros_beneficiario" (
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

    CONSTRAINT "membros_beneficiario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "historico_distribuicao" (
    "id" TEXT NOT NULL,
    "tipo_cesta_id" TEXT NOT NULL,
    "beneficiario_id" TEXT NOT NULL,
    "data_distribuicao" TIMESTAMP(3) NOT NULL,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3),

    CONSTRAINT "historico_distribuicao_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "produto_nome_key" ON "produto"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "produto_estoque_produto_id_key" ON "produto_estoque"("produto_id");

-- CreateIndex
CREATE UNIQUE INDEX "tipo_cesta_nome_key" ON "tipo_cesta"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "beneficiario_cpf_key" ON "beneficiario"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "endereco_beneficiario_beneficiario_id_key" ON "endereco_beneficiario"("beneficiario_id");

-- CreateIndex
CREATE UNIQUE INDEX "membros_beneficiario_cpf_key" ON "membros_beneficiario"("cpf");

-- AddForeignKey
ALTER TABLE "produto_estoque" ADD CONSTRAINT "produto_estoque_produto_id_fkey" FOREIGN KEY ("produto_id") REFERENCES "produto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "produto_movimentacao_estoque" ADD CONSTRAINT "produto_movimentacao_estoque_estoque_produto_id_fkey" FOREIGN KEY ("estoque_produto_id") REFERENCES "produto_estoque"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_recebimento" ADD CONSTRAINT "item_recebimento_doacao_id_fkey" FOREIGN KEY ("doacao_id") REFERENCES "recebimento_doacao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_recebimento" ADD CONSTRAINT "item_recebimento_produto_id_fkey" FOREIGN KEY ("produto_id") REFERENCES "produto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_distribuicao_emergencial" ADD CONSTRAINT "item_distribuicao_emergencial_distribuicao_emergencial_id_fkey" FOREIGN KEY ("distribuicao_emergencial_id") REFERENCES "distribuicao_emergencial"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_distribuicao_emergencial" ADD CONSTRAINT "item_distribuicao_emergencial_produto_id_fkey" FOREIGN KEY ("produto_id") REFERENCES "produto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "produto_cesta" ADD CONSTRAINT "produto_cesta_produto_id_fkey" FOREIGN KEY ("produto_id") REFERENCES "produto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "produto_cesta" ADD CONSTRAINT "produto_cesta_tipo_cesta_id_fkey" FOREIGN KEY ("tipo_cesta_id") REFERENCES "tipo_cesta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "beneficiario" ADD CONSTRAINT "beneficiario_tipo_cesta_id_fkey" FOREIGN KEY ("tipo_cesta_id") REFERENCES "tipo_cesta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "endereco_beneficiario" ADD CONSTRAINT "endereco_beneficiario_beneficiario_id_fkey" FOREIGN KEY ("beneficiario_id") REFERENCES "beneficiario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "membros_beneficiario" ADD CONSTRAINT "membros_beneficiario_beneficiario_id_fkey" FOREIGN KEY ("beneficiario_id") REFERENCES "beneficiario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "historico_distribuicao" ADD CONSTRAINT "historico_distribuicao_tipo_cesta_id_fkey" FOREIGN KEY ("tipo_cesta_id") REFERENCES "tipo_cesta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "historico_distribuicao" ADD CONSTRAINT "historico_distribuicao_beneficiario_id_fkey" FOREIGN KEY ("beneficiario_id") REFERENCES "beneficiario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
