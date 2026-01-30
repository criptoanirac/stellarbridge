CREATE TABLE `courseModules` (
	`id` int AUTO_INCREMENT NOT NULL,
	`courseId` int NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`order` int NOT NULL,
	`rewardXlm` decimal(10,2) NOT NULL,
	`contentUrl` varchar(500),
	`estimatedMinutes` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `courseModules_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `courses` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text NOT NULL,
	`category` enum('web3','ia','vendas','design','programacao') NOT NULL,
	`difficulty` enum('basico','intermediario','avancado') NOT NULL,
	`totalRewardXlm` decimal(10,2) NOT NULL,
	`durationHours` int NOT NULL,
	`imageUrl` varchar(500),
	`provider` varchar(255),
	`status` enum('active','archived') NOT NULL DEFAULT 'active',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `courses_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `userCourseProgress` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`courseId` int NOT NULL,
	`status` enum('not_started','in_progress','completed') NOT NULL DEFAULT 'not_started',
	`startedAt` timestamp,
	`completedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `userCourseProgress_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `userModuleCompletion` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`moduleId` int NOT NULL,
	`completedAt` timestamp NOT NULL DEFAULT (now()),
	`xlmEarned` decimal(10,2) NOT NULL,
	`transactionHash` varchar(255),
	CONSTRAINT `userModuleCompletion_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `userWallet` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`stellarAddress` varchar(56),
	`totalEarnedXlm` decimal(10,2) NOT NULL DEFAULT '0.00',
	`availableXlm` decimal(10,2) NOT NULL DEFAULT '0.00',
	`lockedXlm` decimal(10,2) NOT NULL DEFAULT '0.00',
	`lastUpdated` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `userWallet_id` PRIMARY KEY(`id`),
	CONSTRAINT `userWallet_userId_unique` UNIQUE(`userId`)
);
--> statement-breakpoint
CREATE TABLE `xlmTransactions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`type` enum('earn','withdraw','bonus','refund') NOT NULL,
	`amountXlm` decimal(10,2) NOT NULL,
	`description` text NOT NULL,
	`moduleId` int,
	`transactionHash` varchar(255),
	`status` enum('pending','completed','failed') NOT NULL DEFAULT 'completed',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `xlmTransactions_id` PRIMARY KEY(`id`)
);
