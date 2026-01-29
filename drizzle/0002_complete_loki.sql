CREATE TABLE `successStories` (
	`id` int AUTO_INCREMENT NOT NULL,
	`talentId` int NOT NULL,
	`companyId` int NOT NULL,
	`testimonial` text NOT NULL,
	`beforeRole` varchar(255),
	`afterRole` varchar(255),
	`salaryIncrease` decimal(5,2),
	`imageUrl` varchar(500),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `successStories_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `talents` ADD `birthDate` timestamp;