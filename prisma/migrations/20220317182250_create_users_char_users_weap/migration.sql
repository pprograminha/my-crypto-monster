/*
  Warnings:

  - You are about to drop the column `actual_atk_magical` on the `characters` table. All the data in the column will be lost.
  - You are about to drop the column `actual_atk_physical` on the `characters` table. All the data in the column will be lost.
  - You are about to drop the column `actual_crit_chance` on the `characters` table. All the data in the column will be lost.
  - You are about to drop the column `actual_def_magical` on the `characters` table. All the data in the column will be lost.
  - You are about to drop the column `actual_def_physical` on the `characters` table. All the data in the column will be lost.
  - You are about to drop the column `actual_health` on the `characters` table. All the data in the column will be lost.
  - You are about to drop the column `actual_speed` on the `characters` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "characters" DROP COLUMN "actual_atk_magical",
DROP COLUMN "actual_atk_physical",
DROP COLUMN "actual_crit_chance",
DROP COLUMN "actual_def_magical",
DROP COLUMN "actual_def_physical",
DROP COLUMN "actual_health",
DROP COLUMN "actual_speed";

-- CreateTable
CREATE TABLE "user_weapons" (
    "id" UUID NOT NULL,
    "owner_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "weapon_id" UUID NOT NULL,
    "rarity" "Rarity" NOT NULL,
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

    CONSTRAINT "user_weapons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_characters" (
    "id" UUID NOT NULL,
    "owner_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "character_id" UUID NOT NULL,
    "rarity" "Rarity" NOT NULL,
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

    CONSTRAINT "user_characters_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "user_weapons" ADD CONSTRAINT "user_weapons_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_weapons" ADD CONSTRAINT "user_weapons_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_weapons" ADD CONSTRAINT "user_weapons_weapon_id_fkey" FOREIGN KEY ("weapon_id") REFERENCES "weapons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_characters" ADD CONSTRAINT "user_characters_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_characters" ADD CONSTRAINT "user_characters_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_characters" ADD CONSTRAINT "user_characters_character_id_fkey" FOREIGN KEY ("character_id") REFERENCES "characters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
