CREATE TABLE `crs` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer NOT NULL,
	`slug` text NOT NULL,
	`name` text NOT NULL,
	`type` text NOT NULL,
	`settings` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `crs_slug_unique` ON `crs` (`slug`);