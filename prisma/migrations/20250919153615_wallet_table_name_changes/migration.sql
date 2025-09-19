/*
  Warnings:

  - You are about to drop the `InrBalance` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."InrBalance" DROP CONSTRAINT "InrBalance_userId_fkey";

-- DropTable
DROP TABLE "public"."InrBalance";

-- CreateTable
CREATE TABLE "public"."InrWallet" (
    "id" TEXT NOT NULL,
    "balance" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "InrWallet_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "InrWallet_userId_key" ON "public"."InrWallet"("userId");

-- AddForeignKey
ALTER TABLE "public"."InrWallet" ADD CONSTRAINT "InrWallet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
