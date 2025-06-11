/*
  Warnings:

  - You are about to drop the column `createdAt` on the `TruckLocation` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `TruckLocation` table. All the data in the column will be lost.
  - Added the required column `truckId` to the `TruckLocation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TruckLocation" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "truckId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "TruckLocation" ADD CONSTRAINT "TruckLocation_truckId_fkey" FOREIGN KEY ("truckId") REFERENCES "Truck"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
