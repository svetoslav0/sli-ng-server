CREATE DATABASE `sli-ng`;

USE `sli-ng`;

CREATE TABLE `users` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(128) NOT NULL,
    `password` VARCHAR(128) NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE `rooms` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(128) NOT NULL,
    `code` VARCHAR(128) NOT NULL,
    `date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    `user_id` INT NOT NULL,
    PRIMARY KEY (`id`),
    CONSTRAINT `FK__users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE NO ACTION ON DELETE NO ACTION
);

CREATE TABLE `question_statuses` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(128) NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE `questions` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `body` TEXT NOT NULL,
    `author` VARCHAR(128) NULL,
    `votes_count` BIGINT DEFAULT 0,
    `status_id` INT NOT NULL,
    PRIMARY KEY (`id`),
    CONSTRAINT `FK__question_statuses` FOREIGN KEY (`status_id`) REFERENCES `question_statuses` (`id`) ON UPDATE NO ACTION ON DELETE NO ACTION
);

CREATE TABLE `comments` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `question_id` INT NOT NULL,
    `body` TEXT NOT NULL,
    `author` VARCHAR(128) NULL,
    PRIMARY KEY (`id`)
);

INSERT INTO `question_statuses`
    (`description`)
VALUES
    ('Pending'),
    ('Approved'),
    ('Archived');
