/*
  Warnings:

  - A unique constraint covering the columns `[cookie]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "User_cookie_key" ON "User"("cookie");
