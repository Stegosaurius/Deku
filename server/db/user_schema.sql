-- /server/db/user_schema.sql

CREATE DATABASE deku;

USE deku;

CREATE TABLE `users` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`username` varchar(50) NOT NULL,
	`email` varchar(50),
	`password` varchar(100),
	`scoped_key` varchar(250),
	`about` TEXT,
	`profile_photo` varchar(250),
	`location` varchar(80),
	`tessel` tinyint NOT NULL DEFAULT '0',
	PRIMARY KEY (`id`)
);

CREATE TABLE `followers` (
	`follower_id` int NOT NULL,
	`followee_id` int NOT NULL
);

CREATE TABLE `messages` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`message` TEXT NOT NULL,
	`created_at` BIGINT NOT NULL,
	`user_id` INT NOT NULL,
	`thread_id` INT NOT NULL,
	`vote_tally` INT NOT NULL DEFAULT '0',
	PRIMARY KEY (`id`)
);

CREATE TABLE `threads` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`thread` varchar(250) NOT NULL,
	`created_at` BIGINT NOT NULL,
	`last_updated` BIGINT NOT NULL,
	`messages_count` int NOT NULL DEFAULT '0',
	`vote_tally` int NOT NULL DEFAULT '0',
	`user_id` int NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `notifications` (
	`id` int NOT NULL AUTO_INCREMENT,
	`content` TEXT NOT NULL,
	`user_id` INT NOT NULL,
	`originator_name` varchar(50) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `statuses` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`user_id` INT NOT NULL,
	`status` varchar(250) NOT NULL,
	`created_at` BIGINT NOT NULL,
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

CREATE TABLE `tags` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`tag` varchar(50) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `usertags` (
	`user_id` INT NOT NULL,
	`tag_id` INT NOT NULL
);

CREATE TABLE `photos` (
	`id` int NOT NULL AUTO_INCREMENT,
	`photo` varchar(250) NOT NULL,
	`user_id` int NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `thread_votes` (
	`thread_id` int NOT NULL,
	`user_id` int NOT NULL
);

CREATE UNIQUE INDEX `record_f` ON `followers` (`follower_id`, `followee_id`);
CREATE UNIQUE INDEX `record_mv` ON `message_votes` (`message_id`, `user_id`);
CREATE UNIQUE INDEX `record_sv` ON `status_votes` (`user_id`, `status_id`);
CREATE UNIQUE INDEX `record_tv` ON `thread_votes` (`thread_id`, `user_id`);
CREATE UNIQUE INDEX `record_ut` ON `usertags` (`user_id`, `tag_id`);
CREATE UNIQUE INDEX `record_photo` ON `photos` (`user_id`, `photo`);
CREATE UNIQUE INDEX `username` ON `users` (`username`);
CREATE UNIQUE INDEX `email` ON `users` (`email`);
CREATE UNIQUE INDEX `tag` ON `tags` (`tag`);


ALTER TABLE `followers` ADD CONSTRAINT `followers_fk0` FOREIGN KEY (`follower_id`) REFERENCES `users`(`id`);

ALTER TABLE `followers` ADD CONSTRAINT `followers_fk1` FOREIGN KEY (`followee_id`) REFERENCES `users`(`id`);

ALTER TABLE `messages` ADD CONSTRAINT `messages_fk0` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`);

ALTER TABLE `messages` ADD CONSTRAINT `messages_fk1` FOREIGN KEY (`thread_id`) REFERENCES `threads`(`id`);

ALTER TABLE `threads` ADD CONSTRAINT `threads_fk0` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`);

ALTER TABLE `notifications` ADD CONSTRAINT `notifications_fk0` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`);

ALTER TABLE `statuses` ADD CONSTRAINT `statuses_fk0` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`);

ALTER TABLE `message_votes` ADD CONSTRAINT `message_votes_fk0` FOREIGN KEY (`message_id`) REFERENCES `messages`(`id`);

ALTER TABLE `message_votes` ADD CONSTRAINT `message_votes_fk1` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`);

ALTER TABLE `status_votes` ADD CONSTRAINT `status_votes_fk0` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`);

ALTER TABLE `status_votes` ADD CONSTRAINT `status_votes_fk1` FOREIGN KEY (`status_id`) REFERENCES `statuses`(`id`);

ALTER TABLE `usertags` ADD CONSTRAINT `usertags_fk0` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`);

ALTER TABLE `usertags` ADD CONSTRAINT `usertags_fk1` FOREIGN KEY (`tag_id`) REFERENCES `tags`(`id`);

ALTER TABLE `photos` ADD CONSTRAINT `photos_fk0` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`);

ALTER TABLE `thread_votes` ADD CONSTRAINT `thread_votes_fk0` FOREIGN KEY (`thread_id`) REFERENCES `threads`(`id`);

ALTER TABLE `thread_votes` ADD CONSTRAINT `thread_votes_fk1` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`);
