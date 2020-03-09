DROP DATABASE IF EXISTS badmovies;

CREATE DATABASE badmovies;

use badmovies;

DROP TABLE IF EXISTS `MovieInfo`;

CREATE TABLE `MovieInfo` (
  `id` INT ,
  `title` VARCHAR(256) NULL DEFAULT NULL,
  `vote_average` VARCHAR(256) NULL DEFAULT NULL,
  `release_date` VARCHAR(256) NULL DEFAULT NULL,
  `poster_path` VARCHAR(256) NULL DEFAULT NULL
);