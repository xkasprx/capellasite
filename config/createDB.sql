-- Dumping database structure for capella
CREATE DATABASE IF NOT EXISTS `capella` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_bin */;
USE `capella`;

-- Dumping structure for table capella.education
CREATE TABLE IF NOT EXISTS `education` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user` int(11) DEFAULT NULL,
  `school` varchar(50) DEFAULT NULL,
  `degree` varchar(50) DEFAULT NULL,
  `fieldofstudy` varchar(50) DEFAULT NULL,
  `from` varchar(50) DEFAULT NULL,
  `current` tinyint(4) DEFAULT 0,
  `to` varchar(50) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `date` varchar(50) DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- Dumping structure for table capella.experience
CREATE TABLE IF NOT EXISTS `experience` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user` int(11) DEFAULT NULL,
  `company` varchar(50) DEFAULT NULL,
  `jobtitle` varchar(50) DEFAULT NULL,
  `location` varchar(50) DEFAULT NULL,
  `from` varchar(50) DEFAULT NULL,
  `current` tinyint(4) DEFAULT 0,
  `to` varchar(50) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `date` varchar(50) DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- Database table for posts to be created later

-- Dumping structure for table capella.profiles
CREATE TABLE IF NOT EXISTS `profiles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user` int(11) DEFAULT NULL,
  `company` varchar(50) DEFAULT NULL,
  `website` varchar(50) DEFAULT NULL,
  `location` varchar(50) DEFAULT NULL,
  `proStatus` varchar(50) DEFAULT NULL,
  `skills` text DEFAULT NULL,
  `bio` text DEFAULT NULL,
  `date` varchar(50) DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `user` (`user`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- Dumping structure for table capella.social
CREATE TABLE IF NOT EXISTS `social` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user` int(11) DEFAULT NULL,
  `github` varchar(200) DEFAULT NULL,
  `twitter` varchar(200) DEFAULT NULL,
  `facebook` varchar(200) DEFAULT NULL,
  `linkedin` varchar(200) DEFAULT NULL,
  `youtube` varchar(200) DEFAULT NULL,
  `instagram` varchar(200) DEFAULT NULL,
  `date` varchar(50) DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `user` (`user`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- Dumping structure for table capella.user
CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(50) DEFAULT NULL,
  `lastName` varchar(50) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `token` varchar(100) DEFAULT NULL,
  `avatar` varchar(200) DEFAULT NULL,
  `date` varchar(50) DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;