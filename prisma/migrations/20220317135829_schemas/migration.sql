-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('admin', 'user');

-- CreateEnum
CREATE TYPE "Rarity" AS ENUM ('common', 'rare', 'epic', 'legendary', 'superlegendary');

-- CreateEnum
CREATE TYPE "ChestType" AS ENUM ('characters', 'weapons');

-- CreateEnum
CREATE TYPE "SaleType" AS ENUM ('char', 'weapon', 'both');

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "wallet" TEXT,
    "role" "UserRole" NOT NULL DEFAULT E'user',
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "mcm" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "weapons" (
    "id" UUID NOT NULL,
    "owner_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "rarity" "Rarity" NOT NULL,
    "type" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "base_atk_physical" INTEGER NOT NULL,
    "base_atk_magical" INTEGER NOT NULL,
    "base_def_physical" INTEGER NOT NULL,
    "base_def_magical" INTEGER NOT NULL,
    "base_speed" INTEGER NOT NULL,
    "base_health" INTEGER NOT NULL,
    "base_crit_chance" INTEGER NOT NULL,
    "actual_atk_physical" INTEGER NOT NULL,
    "actual_atk_magical" INTEGER NOT NULL,
    "actual_def_physical" INTEGER NOT NULL,
    "actual_def_magical" INTEGER NOT NULL,
    "actual_speed" INTEGER NOT NULL,
    "actual_health" INTEGER NOT NULL,
    "actual_crit_chance" INTEGER NOT NULL,
    "energy" INTEGER NOT NULL,
    "level" INTEGER NOT NULL,
    "character_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "weapons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chests" (
    "id" UUID NOT NULL,
    "owner_id" UUID NOT NULL,
    "rarity" "Rarity" NOT NULL,
    "type" "ChestType" NOT NULL,
    "influencer" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "chests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "characters" (
    "id" UUID NOT NULL,
    "owner_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "rarity" "Rarity" NOT NULL,
    "type" TEXT NOT NULL,
    "image" TEXT,
    "base_atk_physical" INTEGER NOT NULL,
    "base_atk_magical" INTEGER NOT NULL,
    "base_def_physical" INTEGER NOT NULL,
    "base_def_magical" INTEGER NOT NULL,
    "base_speed" INTEGER NOT NULL,
    "base_health" INTEGER NOT NULL,
    "base_crit_chance" INTEGER NOT NULL,
    "actual_atk_physical" INTEGER NOT NULL,
    "actual_atk_magical" INTEGER NOT NULL,
    "actual_def_physical" INTEGER NOT NULL,
    "actual_def_magical" INTEGER NOT NULL,
    "actual_speed" INTEGER NOT NULL,
    "actual_health" INTEGER NOT NULL,
    "actual_crit_chance" INTEGER NOT NULL,
    "energy" INTEGER NOT NULL,
    "level" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "characters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sales" (
    "id" UUID NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "type" "SaleType" NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "char_quantity" INTEGER NOT NULL,
    "char_common_rate" INTEGER NOT NULL,
    "char_rare_rate" INTEGER NOT NULL,
    "char_epic_rate" INTEGER NOT NULL,
    "char_legendary_rate" INTEGER NOT NULL,
    "char_super_legendary_rate" INTEGER NOT NULL,
    "weap_quantity" INTEGER NOT NULL,
    "weap_common_rate" INTEGER NOT NULL,
    "weap_rare_rate" INTEGER NOT NULL,
    "weap_epic_rate" INTEGER NOT NULL,
    "weap_legendary_rate" INTEGER NOT NULL,
    "weap_super_legendary_rate" INTEGER NOT NULL,

    CONSTRAINT "sales_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_wallet_key" ON "users"("wallet");

-- CreateIndex
CREATE UNIQUE INDEX "weapons_character_id_key" ON "weapons"("character_id");

-- AddForeignKey
ALTER TABLE "weapons" ADD CONSTRAINT "weapons_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "weapons" ADD CONSTRAINT "weapons_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "weapons" ADD CONSTRAINT "weapons_character_id_fkey" FOREIGN KEY ("character_id") REFERENCES "characters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chests" ADD CONSTRAINT "chests_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "characters" ADD CONSTRAINT "characters_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "characters" ADD CONSTRAINT "characters_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
