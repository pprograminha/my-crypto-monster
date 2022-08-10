/*
  Warnings:

  - You are about to drop the column `base_atk_magical` on the `user_characters` table. All the data in the column will be lost.
  - You are about to drop the column `base_atk_physical` on the `user_characters` table. All the data in the column will be lost.
  - You are about to drop the column `base_crit_chance` on the `user_characters` table. All the data in the column will be lost.
  - You are about to drop the column `base_def_magical` on the `user_characters` table. All the data in the column will be lost.
  - You are about to drop the column `base_def_physical` on the `user_characters` table. All the data in the column will be lost.
  - You are about to drop the column `base_health` on the `user_characters` table. All the data in the column will be lost.
  - You are about to drop the column `base_speed` on the `user_characters` table. All the data in the column will be lost.
  - You are about to drop the column `base_atk_magical` on the `user_weapons` table. All the data in the column will be lost.
  - You are about to drop the column `base_atk_physical` on the `user_weapons` table. All the data in the column will be lost.
  - You are about to drop the column `base_crit_chance` on the `user_weapons` table. All the data in the column will be lost.
  - You are about to drop the column `base_def_magical` on the `user_weapons` table. All the data in the column will be lost.
  - You are about to drop the column `base_def_physical` on the `user_weapons` table. All the data in the column will be lost.
  - You are about to drop the column `base_health` on the `user_weapons` table. All the data in the column will be lost.
  - You are about to drop the column `base_speed` on the `user_weapons` table. All the data in the column will be lost.
  - Changed the type of `user_id` on the `premium_passes` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "premium_passes" DROP COLUMN "user_id",
ADD COLUMN     "user_id" UUID NOT NULL;

-- AlterTable
ALTER TABLE "user_characters" DROP COLUMN "base_atk_magical",
DROP COLUMN "base_atk_physical",
DROP COLUMN "base_crit_chance",
DROP COLUMN "base_def_magical",
DROP COLUMN "base_def_physical",
DROP COLUMN "base_health",
DROP COLUMN "base_speed";

-- AlterTable
ALTER TABLE "user_weapons" DROP COLUMN "base_atk_magical",
DROP COLUMN "base_atk_physical",
DROP COLUMN "base_crit_chance",
DROP COLUMN "base_def_magical",
DROP COLUMN "base_def_physical",
DROP COLUMN "base_health",
DROP COLUMN "base_speed";

-- CreateTable
CREATE TABLE "user_tokens" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "token" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_tokens_token_key" ON "user_tokens"("token");

-- CreateIndex
CREATE UNIQUE INDEX "premium_passes_user_id_key" ON "premium_passes"("user_id");

-- AddForeignKey
ALTER TABLE "premium_passes" ADD CONSTRAINT "premium_passes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_tokens" ADD CONSTRAINT "user_tokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
