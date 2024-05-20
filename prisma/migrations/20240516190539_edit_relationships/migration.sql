/*
  Warnings:

  - Added the required column `carId` to the `RentedCar` table without a default value. This is not possible if the table is not empty.
  - Added the required column `carId` to the `ReservedCar` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `rentedcar` ADD COLUMN `carId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `reservedcar` ADD COLUMN `carId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `RentedCar` ADD CONSTRAINT `RentedCar_carId_fkey` FOREIGN KEY (`carId`) REFERENCES `Car`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReservedCar` ADD CONSTRAINT `ReservedCar_carId_fkey` FOREIGN KEY (`carId`) REFERENCES `Car`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
