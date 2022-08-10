/*
  Warnings:

  - You are about to drop the column `actual_atk_magical` on the `weapons` table. All the data in the column will be lost.
  - You are about to drop the column `actual_atk_physical` on the `weapons` table. All the data in the column will be lost.
  - You are about to drop the column `actual_crit_chance` on the `weapons` table. All the data in the column will be lost.
  - You are about to drop the column `actual_def_magical` on the `weapons` table. All the data in the column will be lost.
  - You are about to drop the column `actual_def_physical` on the `weapons` table. All the data in the column will be lost.
  - You are about to drop the column `actual_health` on the `weapons` table. All the data in the column will be lost.
  - You are about to drop the column `actual_speed` on the `weapons` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "weapons" DROP COLUMN "actual_atk_magical",
DROP COLUMN "actual_atk_physical",
DROP COLUMN "actual_crit_chance",
DROP COLUMN "actual_def_magical",
DROP COLUMN "actual_def_physical",
DROP COLUMN "actual_health",
DROP COLUMN "actual_speed";
