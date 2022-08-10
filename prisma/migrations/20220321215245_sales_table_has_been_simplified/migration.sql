/*
  Warnings:

  - You are about to drop the column `char_common_rate` on the `sales` table. All the data in the column will be lost.
  - You are about to drop the column `char_epic_rate` on the `sales` table. All the data in the column will be lost.
  - You are about to drop the column `char_legendary_rate` on the `sales` table. All the data in the column will be lost.
  - You are about to drop the column `char_quantity` on the `sales` table. All the data in the column will be lost.
  - You are about to drop the column `char_rare_rate` on the `sales` table. All the data in the column will be lost.
  - You are about to drop the column `char_super_legendary_rate` on the `sales` table. All the data in the column will be lost.
  - You are about to drop the column `weap_common_rate` on the `sales` table. All the data in the column will be lost.
  - You are about to drop the column `weap_epic_rate` on the `sales` table. All the data in the column will be lost.
  - You are about to drop the column `weap_legendary_rate` on the `sales` table. All the data in the column will be lost.
  - You are about to drop the column `weap_quantity` on the `sales` table. All the data in the column will be lost.
  - You are about to drop the column `weap_rare_rate` on the `sales` table. All the data in the column will be lost.
  - You are about to drop the column `weap_super_legendary_rate` on the `sales` table. All the data in the column will be lost.
  - Added the required column `common_rate` to the `sales` table without a default value. This is not possible if the table is not empty.
  - Added the required column `epic_rate` to the `sales` table without a default value. This is not possible if the table is not empty.
  - Added the required column `legendary_rate` to the `sales` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `sales` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rare_rate` to the `sales` table without a default value. This is not possible if the table is not empty.
  - Added the required column `super_legendary_rate` to the `sales` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "sales" DROP COLUMN "char_common_rate",
DROP COLUMN "char_epic_rate",
DROP COLUMN "char_legendary_rate",
DROP COLUMN "char_quantity",
DROP COLUMN "char_rare_rate",
DROP COLUMN "char_super_legendary_rate",
DROP COLUMN "weap_common_rate",
DROP COLUMN "weap_epic_rate",
DROP COLUMN "weap_legendary_rate",
DROP COLUMN "weap_quantity",
DROP COLUMN "weap_rare_rate",
DROP COLUMN "weap_super_legendary_rate",
ADD COLUMN     "common_rate" INTEGER NOT NULL,
ADD COLUMN     "epic_rate" INTEGER NOT NULL,
ADD COLUMN     "legendary_rate" INTEGER NOT NULL,
ADD COLUMN     "quantity" INTEGER NOT NULL,
ADD COLUMN     "rare_rate" INTEGER NOT NULL,
ADD COLUMN     "super_legendary_rate" INTEGER NOT NULL;
