
DROP DATABASE IF EXISTS `burgers_db`;
CREATE DATABASE IF NOT EXISTS `burgers_db`;
USE `burgers_db`;


/* Create a table for all your burgers */
CREATE TABLE `burgers` (
	`id` Int( 11 ) AUTO_INCREMENT NOT NULL,
	`burger_name` VARCHAR( 255) NOT NULL,
	`devoured` BOOLEAN NOT NULL,
	/* Set ID as primary key */
	PRIMARY KEY ( `id` )
);

 
 
 
