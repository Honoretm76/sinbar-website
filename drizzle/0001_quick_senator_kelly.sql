CREATE TABLE `orders` (
	`id` int AUTO_INCREMENT NOT NULL,
	`stripeSessionId` varchar(255) NOT NULL,
	`stripeCustomerId` varchar(255),
	`stripeSubscriptionId` varchar(255),
	`stripePaymentIntentId` varchar(255),
	`userId` varchar(64),
	`customerEmail` varchar(320),
	`customerName` varchar(255),
	`planId` varchar(64),
	`serviceId` varchar(64),
	`quantity` int NOT NULL DEFAULT 1,
	`amountTotal` int NOT NULL DEFAULT 0,
	`currency` varchar(10) NOT NULL DEFAULT 'usd',
	`status` varchar(32) NOT NULL DEFAULT 'pending',
	`mode` varchar(32) NOT NULL DEFAULT 'payment',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `orders_id` PRIMARY KEY(`id`),
	CONSTRAINT `orders_stripeSessionId_unique` UNIQUE(`stripeSessionId`)
);
--> statement-breakpoint
ALTER TABLE `users` ADD `stripeCustomerId` varchar(255);