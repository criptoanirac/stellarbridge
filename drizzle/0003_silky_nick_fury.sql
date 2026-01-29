CREATE TABLE `achievements` (
	`id` int AUTO_INCREMENT NOT NULL,
	`talentId` int NOT NULL,
	`badgeType` varchar(100) NOT NULL,
	`badgeName` varchar(255) NOT NULL,
	`badgeDescription` text,
	`badgeIcon` varchar(100),
	`xpAwarded` int NOT NULL DEFAULT 0,
	`unlockedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `achievements_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `careerPlans` (
	`id` int AUTO_INCREMENT NOT NULL,
	`talentId` int NOT NULL,
	`targetRole` varchar(255) NOT NULL,
	`targetIndustry` varchar(255),
	`targetSalary` decimal(10,2),
	`deadline` timestamp,
	`status` enum('active','completed','abandoned') NOT NULL DEFAULT 'active',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `careerPlans_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `courseRecommendations` (
	`id` int AUTO_INCREMENT NOT NULL,
	`talentId` int NOT NULL,
	`courseName` varchar(255) NOT NULL,
	`provider` varchar(255),
	`category` varchar(100),
	`skillsToGain` text,
	`priority` int NOT NULL DEFAULT 0,
	`reason` text,
	`courseUrl` varchar(500),
	`estimatedDuration` varchar(100),
	`status` enum('recommended','in_progress','completed','dismissed') NOT NULL DEFAULT 'recommended',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `courseRecommendations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `talentProgress` (
	`id` int AUTO_INCREMENT NOT NULL,
	`talentId` int NOT NULL,
	`eventType` varchar(100) NOT NULL,
	`xpGained` int NOT NULL DEFAULT 0,
	`description` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `talentProgress_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `talents` ADD `xp` int DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `talents` ADD `level` int DEFAULT 1 NOT NULL;