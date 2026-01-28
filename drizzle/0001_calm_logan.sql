CREATE TABLE `companies` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`companyName` varchar(255) NOT NULL,
	`industry` varchar(255),
	`description` text,
	`website` varchar(500),
	`location` varchar(255),
	`employeeCount` varchar(50),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `companies_id` PRIMARY KEY(`id`),
	CONSTRAINT `companies_userId_unique` UNIQUE(`userId`)
);
--> statement-breakpoint
CREATE TABLE `jobPostings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`companyId` int NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text NOT NULL,
	`sector` varchar(255) NOT NULL,
	`experienceLevel` enum('junior','mid','senior','lead') NOT NULL,
	`salaryMin` decimal(10,2),
	`salaryMax` decimal(10,2),
	`location` varchar(255),
	`status` enum('active','paused','archived','closed') NOT NULL DEFAULT 'active',
	`requiredSkills` json NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `jobPostings_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `matches` (
	`id` int AUTO_INCREMENT NOT NULL,
	`talentId` int NOT NULL,
	`jobId` int NOT NULL,
	`compatibilityScore` decimal(5,2) NOT NULL,
	`matchedSkills` json NOT NULL,
	`status` enum('pending','viewed','interested','rejected','hired') NOT NULL DEFAULT 'pending',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `matches_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `notifications` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`type` enum('match','update','success','warning') NOT NULL,
	`title` varchar(255) NOT NULL,
	`message` text NOT NULL,
	`relatedId` int,
	`read` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `notifications_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `talentCertifications` (
	`id` int AUTO_INCREMENT NOT NULL,
	`talentId` int NOT NULL,
	`certification` varchar(255) NOT NULL,
	`issuer` varchar(255),
	`issueDate` timestamp,
	`expiryDate` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `talentCertifications_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `talentEducation` (
	`id` int AUTO_INCREMENT NOT NULL,
	`talentId` int NOT NULL,
	`institution` varchar(255) NOT NULL,
	`course` varchar(255) NOT NULL,
	`completionYear` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `talentEducation_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `talentSkills` (
	`id` int AUTO_INCREMENT NOT NULL,
	`talentId` int NOT NULL,
	`skill` varchar(255) NOT NULL,
	`proficiency` enum('beginner','intermediate','advanced','expert') NOT NULL DEFAULT 'intermediate',
	`verified` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `talentSkills_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `talents` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`pseudonym` varchar(64) NOT NULL,
	`bio` text,
	`currentRole` varchar(255),
	`yearsExperience` varchar(50),
	`industry` varchar(255),
	`location` varchar(255),
	`portfolioUrl` varchar(500),
	`githubUrl` varchar(500),
	`linkedinUrl` varchar(500),
	`identityVerified` boolean NOT NULL DEFAULT false,
	`verificationMethod` varchar(100),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `talents_id` PRIMARY KEY(`id`),
	CONSTRAINT `talents_userId_unique` UNIQUE(`userId`),
	CONSTRAINT `talents_pseudonym_unique` UNIQUE(`pseudonym`)
);
