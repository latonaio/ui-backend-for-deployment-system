-- MySQL dump 10.13  Distrib 5.7.27, for osx10.14 (x86_64)
--
-- Host: localhost    Database: Project
-- ------------------------------------------------------
-- Server version	5.7.27

/*!40101 SET @OLD_CHARACTER_SET_CLIENT = @@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS = @@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION = @@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE = @@TIME_ZONE */;
/*!40103 SET TIME_ZONE = '+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS = @@UNIQUE_CHECKS, UNIQUE_CHECKS = 0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS = @@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS = 0 */;
/*!40101 SET @OLD_SQL_MODE = @@SQL_MODE, SQL_MODE = 'NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES = @@SQL_NOTES, SQL_NOTES = 0 */;

--
-- Table structure for table `project`
--

DROP TABLE IF EXISTS `project`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `project`
(
    `projectSymbol` varchar(255) NOT NULL,
    `projectName`   varchar(255)      DEFAULT NULL,
    `projectID`     varchar(256)      DEFAULT NULL,
    `timestamp`     timestamp    NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`projectSymbol`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project`
--

LOCK TABLES `project` WRITE;
/*!40000 ALTER TABLE `project`
    DISABLE KEYS */;
INSERT INTO `project`
VALUES ('PRJ', 'ユーザープロジェクト', '0015136e7432a72b84ea1135ef5df3ed0b28d1b2d169a0019dd7307f2d942154', '2020-06-24 09:11:06');
/*!40000 ALTER TABLE `project`
    ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projectHasMicroservice`
--

DROP TABLE IF EXISTS `projectHasMicroservice`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `projectHasMicroservice`
(
    `projectSymbol`    varchar(255) NOT NULL,
    `microserviceName` varchar(255) NOT NULL,
    `timestamp`        timestamp    NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`projectSymbol`, `microserviceName`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projectHasMicroservice`
--

LOCK TABLES `projectHasMicroservice` WRITE;
/*!40000 ALTER TABLE `projectHasMicroservice`
    DISABLE KEYS */;
/*!40000 ALTER TABLE `projectHasMicroservice`
    ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE = @OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE = @OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS = @OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS = @OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT = @OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS = @OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION = @OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES = @OLD_SQL_NOTES */;

-- Dump completed on 2020-06-25 15:47:56
