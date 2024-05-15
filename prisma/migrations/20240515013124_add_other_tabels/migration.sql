-- CreateTable
CREATE TABLE `Rental` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `phoneNumber` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `status` ENUM('VERIFIED', 'IN_PROGRESS', 'NOT_VERIFIED', 'BLOCKED') NOT NULL DEFAULT 'NOT_VERIFIED',
    `location` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Rental_phoneNumber_key`(`phoneNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Car` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `model` VARCHAR(191) NOT NULL,
    `brand` VARCHAR(191) NOT NULL,
    `gearBox` VARCHAR(191) NOT NULL,
    `fuel` VARCHAR(191) NOT NULL,
    `status` ENUM('VERIFIED', 'IN_PROGRESS', 'NOT_VERIFIED', 'BLOCKED') NOT NULL DEFAULT 'NOT_VERIFIED',
    `main_image_url` VARCHAR(191) NOT NULL,
    `image1_url` VARCHAR(191) NOT NULL,
    `image2_url` VARCHAR(191) NOT NULL,
    `silenders` INTEGER NOT NULL,
    `color` VARCHAR(191) NOT NULL,
    `year` INTEGER NOT NULL,
    `daily_price` DOUBLE NOT NULL,
    `rentalId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RentedCar` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `days` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ReservedCar` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `rental_date` DATETIME(3) NOT NULL,
    `days` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Car` ADD CONSTRAINT `Car_rentalId_fkey` FOREIGN KEY (`rentalId`) REFERENCES `Rental`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RentedCar` ADD CONSTRAINT `RentedCar_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReservedCar` ADD CONSTRAINT `ReservedCar_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
