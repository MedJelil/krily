/*
  Warnings:

  - Added the required column `end_reservation_date` to the `ReservedCar` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `reservedcar` ADD COLUMN `end_reservation_date` DATETIME(3) NOT NULL;
