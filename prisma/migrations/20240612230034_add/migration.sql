/*
  Warnings:

  - You are about to drop the column `name` on the `admin` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `admin` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `admin` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `rental` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `rental` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `rental` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `rentedcar` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `reservedcar` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `identity` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `image_url` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `permis` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Admin` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `Rental` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Rental` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clientId` to the `RentedCar` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clientId` to the `ReservedCar` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `rentedcar` DROP FOREIGN KEY `RentedCar_userId_fkey`;

-- DropForeignKey
ALTER TABLE `reservedcar` DROP FOREIGN KEY `ReservedCar_userId_fkey`;

-- DropIndex
DROP INDEX `Admin_phoneNumber_key` ON `admin`;

-- DropIndex
DROP INDEX `Rental_phoneNumber_key` ON `rental`;

-- AlterTable
ALTER TABLE `admin` DROP COLUMN `name`,
    DROP COLUMN `password`,
    DROP COLUMN `phoneNumber`,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `rental` DROP COLUMN `name`,
    DROP COLUMN `password`,
    DROP COLUMN `phoneNumber`,
    ADD COLUMN `image_url` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `rentedcar` DROP COLUMN `userId`,
    ADD COLUMN `clientId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `reservedcar` DROP COLUMN `userId`,
    ADD COLUMN `clientId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `createdAt`,
    DROP COLUMN `identity`,
    DROP COLUMN `image_url`,
    DROP COLUMN `permis`,
    DROP COLUMN `status`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `roleId` INTEGER NULL;

-- CreateTable
CREATE TABLE `Role` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Client` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `status` ENUM('VERIFIED', 'IN_PROGRESS', 'NOT_VERIFIED', 'BLOCKED') NOT NULL DEFAULT 'NOT_VERIFIED',
    `image_url` VARCHAR(191) NOT NULL,
    `permis` VARCHAR(191) NOT NULL,
    `identity` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `userId` INTEGER NOT NULL,

    UNIQUE INDEX `Client_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Admin_userId_key` ON `Admin`(`userId`);

-- CreateIndex
CREATE UNIQUE INDEX `Rental_userId_key` ON `Rental`(`userId`);

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Role`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Admin` ADD CONSTRAINT `Admin_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Client` ADD CONSTRAINT `Client_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Rental` ADD CONSTRAINT `Rental_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RentedCar` ADD CONSTRAINT `RentedCar_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `Client`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReservedCar` ADD CONSTRAINT `ReservedCar_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `Client`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
