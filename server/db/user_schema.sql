-- /server/db/user_schema.sql

CREATE DATABASE Deku;

USE Deku;

CREATE TABLE `Users` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`username` varchar(50) NOT NULL,
	`email` varchar(50),
	`password` varchar(100),
	`scoped_key` varchar(250),
	`token` varchar(250),
	`about` TEXT,
	`profile_photo` varchar(150),
	`location` varchar(80),
	`tessel` tinyint NOT NULL DEFAULT '0',
	PRIMARY KEY (`id`)
);

CREATE TABLE `Followers` (
	`follower_id` int NOT NULL,
	`followee_id` int NOT NULL
);

CREATE TABLE `Messages` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`message` TEXT NOT NULL,
	`timestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`user_id` INT NOT NULL,
	`thread_id` INT NOT NULL,
	`vote_tally` INT NOT NULL DEFAULT '0',
	PRIMARY KEY (`id`)
);

CREATE TABLE `Threads` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`thread` varchar(250) NOT NULL,
	`created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`last_updated` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`comments_count` int NOT NULL DEFAULT '0',
	`vote_tally` int NOT NULL DEFAULT '0',
	`user_id` int NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `Notifications` (
	`id` int NOT NULL AUTO_INCREMENT,
	`content` TEXT NOT NULL,
	`user_id` INT NOT NULL,
	`originatorName` varchar(50) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `Statuses` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`user_id` INT NOT NULL,
	`status` varchar(250) NOT NULL,
	`timestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`vote_tally` INT NOT NULL DEFAULT '0',
	PRIMARY KEY (`id`)
);

CREATE TABLE `message_votes` (
	`message_id` INT NOT NULL,
	`user_id` INT NOT NULL
);

CREATE TABLE `status_votes` (
	`user_id` INT NOT NULL,
	`status_id` INT NOT NULL
);

CREATE TABLE `Tags` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`tag` varchar(50) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `UserTags` (
	`user_id` INT NOT NULL,
	`tag_id` INT NOT NULL
);

CREATE TABLE `Photos` (
	`id` int NOT NULL AUTO_INCREMENT,
	`photo` varchar(250) NOT NULL,
	`user_id` int NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `thread_votes` (
	`thread_id` int NOT NULL,
	`user_id` int NOT NULL
);

ALTER TABLE `Followers` ADD CONSTRAINT `Followers_fk0` FOREIGN KEY (`follower_id`) REFERENCES `Users`(`id`);

ALTER TABLE `Followers` ADD CONSTRAINT `Followers_fk1` FOREIGN KEY (`followee_id`) REFERENCES `Users`(`id`);

ALTER TABLE `Messages` ADD CONSTRAINT `Messages_fk0` FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`);

ALTER TABLE `Messages` ADD CONSTRAINT `Messages_fk1` FOREIGN KEY (`thread_id`) REFERENCES `Threads`(`id`);

ALTER TABLE `Threads` ADD CONSTRAINT `Threads_fk0` FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`);

ALTER TABLE `Notifications` ADD CONSTRAINT `Notifications_fk0` FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`);

ALTER TABLE `Statuses` ADD CONSTRAINT `Statuses_fk0` FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`);

ALTER TABLE `message_votes` ADD CONSTRAINT `message_votes_fk0` FOREIGN KEY (`message_id`) REFERENCES `Messages`(`id`);

ALTER TABLE `message_votes` ADD CONSTRAINT `message_votes_fk1` FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`);

ALTER TABLE `status_votes` ADD CONSTRAINT `status_votes_fk0` FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`);

ALTER TABLE `status_votes` ADD CONSTRAINT `status_votes_fk1` FOREIGN KEY (`status_id`) REFERENCES `Statuses`(`id`);

ALTER TABLE `UserTags` ADD CONSTRAINT `UserTags_fk0` FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`);

ALTER TABLE `UserTags` ADD CONSTRAINT `UserTags_fk1` FOREIGN KEY (`tag_id`) REFERENCES `Tags`(`id`);

ALTER TABLE `Photos` ADD CONSTRAINT `Photos_fk0` FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`);

ALTER TABLE `thread_votes` ADD CONSTRAINT `thread_votes_fk0` FOREIGN KEY (`thread_id`) REFERENCES `Threads`(`id`);

ALTER TABLE `thread_votes` ADD CONSTRAINT `thread_votes_fk1` FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`);
