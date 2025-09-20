/*
  Warnings:

  - You are about to drop the column `googleUserId` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "googleUserId",
ADD COLUMN     "sub" TEXT NOT NULL DEFAULT '';
