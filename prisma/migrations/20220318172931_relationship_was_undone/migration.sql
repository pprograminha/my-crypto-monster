/*
  Warnings:

  - The values [characters,weapons] on the enum `ChestType` will be removed. If these variants are still used in the database, this will fail.
  - The values [char] on the enum `SaleType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `owner_id` on the `characters` table. All the data in the column will be lost.
  - You are about to drop the column `rarity` on the `characters` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `characters` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `characters` table. All the data in the column will be lost.
  - You are about to drop the column `owner_id` on the `weapons` table. All the data in the column will be lost.
  - You are about to drop the column `rarity` on the `weapons` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `weapons` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `weapons` table. All the data in the column will be lost.
  - Added the required column `name` to the `characters` table without a default value. This is not possible if the table is not empty.
  - Added the required column `token` to the `chests` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `chests` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `sales` table without a default value. This is not possible if the table is not empty.
  - Added the required column `token` to the `user_characters` table without a default value. This is not possible if the table is not empty.
  - Added the required column `token` to the `user_weapons` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `weapons` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ChestType_new" AS ENUM ('character', 'weapon');
ALTER TABLE "chests" ALTER COLUMN "type" TYPE "ChestType_new" USING ("type"::text::"ChestType_new");
ALTER TYPE "ChestType" RENAME TO "ChestType_old";
ALTER TYPE "ChestType_new" RENAME TO "ChestType";
DROP TYPE "ChestType_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "SaleType_new" AS ENUM ('character', 'weapon', 'both');
ALTER TABLE "sales" ALTER COLUMN "type" TYPE "SaleType_new" USING ("type"::text::"SaleType_new");
ALTER TYPE "SaleType" RENAME TO "SaleType_old";
ALTER TYPE "SaleType_new" RENAME TO "SaleType";
DROP TYPE "SaleType_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "characters" DROP CONSTRAINT "characters_owner_id_fkey";

-- DropForeignKey
ALTER TABLE "characters" DROP CONSTRAINT "characters_user_id_fkey";

-- DropForeignKey
ALTER TABLE "weapons" DROP CONSTRAINT "weapons_owner_id_fkey";

-- DropForeignKey
ALTER TABLE "weapons" DROP CONSTRAINT "weapons_user_id_fkey";

-- AlterTable
ALTER TABLE "characters" DROP COLUMN "owner_id",
DROP COLUMN "rarity",
DROP COLUMN "type",
DROP COLUMN "user_id",
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "chests" ADD COLUMN     "token" TEXT NOT NULL,
ADD COLUMN     "user_id" UUID NOT NULL;

-- AlterTable
ALTER TABLE "sales" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "end_date" DROP NOT NULL;

-- AlterTable
ALTER TABLE "user_characters" ADD COLUMN     "token" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "user_weapons" ADD COLUMN     "token" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "weapons" DROP COLUMN "owner_id",
DROP COLUMN "rarity",
DROP COLUMN "type",
DROP COLUMN "user_id",
ADD COLUMN     "name" TEXT NOT NULL,
ALTER COLUMN "image" DROP NOT NULL;

-- CreateTable
CREATE TABLE "premium_passes" (
    "id" UUID NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "premium_passes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "logs" (
    "id" UUID NOT NULL,
    "user_id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "premium_passes_user_id_key" ON "premium_passes"("user_id");

-- AddForeignKey
ALTER TABLE "chests" ADD CONSTRAINT "chests_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
