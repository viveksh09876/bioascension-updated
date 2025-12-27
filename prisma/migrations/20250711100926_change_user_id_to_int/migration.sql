/*
  Warnings:

  - The primary key for the `analyses` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `analyses` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `email_logs` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `email_logs` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `quiz_submissions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `quiz_submissions` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `referral_codes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `referral_codes` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `referralID` column on the `referral_codes` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `userId` column on the `referral_codes` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `usedByUserId` column on the `referral_codes` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `userId` on the `analyses` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `userId` on the `quiz_submissions` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "analyses" DROP CONSTRAINT "analyses_userId_fkey";

-- DropForeignKey
ALTER TABLE "quiz_submissions" DROP CONSTRAINT "quiz_submissions_userId_fkey";

-- DropForeignKey
ALTER TABLE "referral_codes" DROP CONSTRAINT "referral_codes_usedByUserId_fkey";

-- DropForeignKey
ALTER TABLE "referral_codes" DROP CONSTRAINT "referral_codes_userId_fkey";

-- AlterTable
ALTER TABLE "analyses" DROP CONSTRAINT "analyses_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "userId",
ADD COLUMN     "userId" INTEGER NOT NULL,
ADD CONSTRAINT "analyses_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "email_logs" DROP CONSTRAINT "email_logs_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "email_logs_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "quiz_submissions" DROP CONSTRAINT "quiz_submissions_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "userId",
ADD COLUMN     "userId" INTEGER NOT NULL,
ADD CONSTRAINT "quiz_submissions_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "referral_codes" DROP CONSTRAINT "referral_codes_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "referralID",
ADD COLUMN     "referralID" INTEGER,
DROP COLUMN "userId",
ADD COLUMN     "userId" INTEGER,
DROP COLUMN "usedByUserId",
ADD COLUMN     "usedByUserId" INTEGER,
ADD CONSTRAINT "referral_codes_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "referral_codes_userId_key" ON "referral_codes"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "referral_codes_usedByUserId_key" ON "referral_codes"("usedByUserId");

-- AddForeignKey
ALTER TABLE "referral_codes" ADD CONSTRAINT "referral_codes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "referral_codes" ADD CONSTRAINT "referral_codes_usedByUserId_fkey" FOREIGN KEY ("usedByUserId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quiz_submissions" ADD CONSTRAINT "quiz_submissions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "analyses" ADD CONSTRAINT "analyses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
