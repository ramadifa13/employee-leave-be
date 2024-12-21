-- DropForeignKey
ALTER TABLE `leave` DROP FOREIGN KEY `Leave_employeeId_fkey`;

-- DropIndex
DROP INDEX `Leave_employeeId_fkey` ON `leave`;

-- AddForeignKey
ALTER TABLE `Leave` ADD CONSTRAINT `Leave_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `Employee`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
