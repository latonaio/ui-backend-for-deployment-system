-- MySQL dump 10.13  Distrib 5.7.29, for Linux (aarch64)
--
-- Host: 127.0.0.1    Database: Deployment
-- ------------------------------------------------------
-- Server version	5.5.5-10.2.32-MariaDB-1:10.2.32+maria~bionic

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
-- Table structure for table `microservice_tags`
--

DROP TABLE IF EXISTS `microservice_tags`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `microservice_tags`
(
    `microservice_id` varchar(64) NOT NULL,
    `tag`             varchar(45) NOT NULL,
    `commit_id`       varchar(45) NOT NULL,
    `timestamp`       timestamp   NOT NULL DEFAULT current_timestamp(),
    PRIMARY KEY (`microservice_id`, `tag`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `microservice_tags`
--

LOCK TABLES `microservice_tags` WRITE;
/*!40000 ALTER TABLE `microservice_tags`
    DISABLE KEYS */;
INSERT INTO `microservice_tags`
VALUES ('063b05cfb639527c2459c21a7c669f0b79a902a87f7d751b00a34c198176b703', 'v1',
        'ed3be8c41efd305684dc6196d00a5f7f9cc0dbefacacd', '2020-06-25 06:29:48'),
       ('20d54d394230e30069498f11d850bcc35f789f3fa36beb5fd23cbdad560c66ec', 'v1',
        '06b3ae04c1260d8834175c666242b865ddd62d7cee928', '2020-06-25 06:29:53'),
       ('219bde6457dd48188a9ff173ff77c67eacf049237e7e5346987f2f12c07e4395', 'v1',
        '9fd832afd12fef64f207d11dc2bba82050b83477f295e', '2020-06-25 06:29:56'),
       ('24062888517d02fe9d44ae360f4f89fa1422cb651045aa11c94c4c4a19d96782', 'v1',
        'ebc20d44b456e504be2efe5a1fd79234c80662f6dd05c', '2020-06-25 06:29:57'),
       ('3531b02e49a9a325bab26873ebdd7193238bc3a7a658b0a1909adba4dae54a2c', 'v1',
        '127f6be920b609bdfe449746bae5615c9cb6f76db638e', '2020-06-25 06:29:58'),
       ('37fc0cb22569d441af7125f033224d2dcd588e944d2e6c42a81fe7805bf105db', 'v1',
        '13f8008fe020295c68b0a4dc56c4f3bf6a1e7378d2041', '2020-06-25 06:30:05'),
       ('59bb9a329b55e4666903b9898d95c289e7f400331cce23b80a472019bc97ea5f', 'v1',
        'ec4cf90ca8e54b0455e45dc29e6c045d3de8f6a203e29', '2020-06-25 06:30:07'),
       ('8fd9bd674e03c5d04684021d3621999aa4e5eee53ce4b012439e9a43dcebe9a3', 'v1',
        'a9851f62e7310ca3034cc5f62bbd0a2349aa535f582c2', '2020-06-25 06:30:10'),
       ('950b7d5e90b473547982ed6b44dfd61a59f76e7f813d09d58e4b1c5b39419e03', 'v1',
        'a6038bcc13ab4b79180765ed4d46443fbd187538121b7', '2020-06-25 06:30:13'),
       ('968491ea5bba34304f01dbd10dfe8153387c73cade16b9c9ffa839a6e3abf6aa', 'v1',
        'efb3742f9bbef17817f2dc071489b60f4f192e7ce1971', '2020-06-25 06:30:15'),
       ('9af9547f9c6170a0aea2c854b7dc2cfad88902a0f8dad893808c832e4f5cc9c9', 'v1',
        '4ce84213c9313dbce3a7f2d2ca970bc13337f2ae1fed9', '2020-06-25 06:30:17'),
       ('a6ad79bebcdb81eb70457f7b00a5199546edb5dd0098dac72e9f98318194c190', 'v1',
        '57a4058433095877c4ef646f0af1a2ba9a607b1bf9f43', '2020-06-25 06:30:18'),
       ('b806dff3a9c7bbec2b2bac863b2a39cc4d519578eee3ebcbf25b9798deefd7c0', 'v1',
        'b2510bdd1ac4a4ac738fd499579841a46169b91aa8ec7', '2020-06-25 06:30:20'),
       ('ba6942524826f9f19bd474e0c299f2bcfad956d2de9c9ce4ce7529e96da16ffe', 'v1',
        '7c4900d1630bba4946cb54e6e00b4ddbfca2d040d5a04', '2020-06-25 06:30:23'),
       ('bbfd316f160f45c21c7185292bbe56fc97dbe24a71d9753c41080b8ea80561f3', 'v1',
        '56ddb350ddcf816aa188e1d8f8672575711d04dd05369', '2020-06-25 06:30:24'),
       ('bfe0864c9499d3f9d2195e9d40c6005bdc7ae3fd62f328e39480993eea54a477', 'v1',
        'cbccbce180a0fe2e702dea699f2b98c3691ab1e219e7e', '2020-06-25 06:30:26'),
       ('c7061129a4b3038ea9b3393358ff6e9aa5d07d70bf06d6f9c17ec68dafec4fbc', 'v1',
        '50b66f9f1b679c5873a06ac7ce8481ffd5cf048f19943', '2020-06-25 06:30:27'),
       ('d82d0598f05d5c66dd3af921dfa86ccdc10d2e1629abc316127b47bab3fd2cce', 'v1',
        '7354dce8fe5708a0a551e2f8e06e1029130f691d49383', '2020-06-25 06:30:28'),
       ('e025f54289e3cdfb482c7bbeb46cfc1769e36688fc82523b0fa228683b1363e2', 'v1',
        'c45744a546078de41315c12e7036bd7a2a6af7331c818', '2020-06-25 06:30:30'),
       ('eeaeef0e88ab3f976331253da1cba27132eb6de9c2fac0dba41801227190c5cd', 'v1',
        '983ddd561ca848b4c4e66b78a8e6fe7b4c074bd8e0c99', '2020-06-25 06:30:31');
/*!40000 ALTER TABLE `microservice_tags`
    ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `microservices`
--

DROP TABLE IF EXISTS `microservices`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `microservices`
(
    `microservice_id` varchar(64) NOT NULL,
    `name`            varchar(45)          DEFAULT NULL,
    `repository_url`  varchar(255)         DEFAULT NULL,
    `timestamp`       datetime    NOT NULL DEFAULT current_timestamp(),
    PRIMARY KEY (`microservice_id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `microservices`
--

LOCK TABLES `microservices` WRITE;
/*!40000 ALTER TABLE `microservices`
    DISABLE KEYS */;
INSERT INTO `microservices`
VALUES ('063b05cfb639527c2459c21a7c669f0b79a902a87f7d751b00a34c198176b703', 'ui-backend-for-maintenance', NULL,
        '2020-06-25 15:26:24'),
       ('123abcdefg', 'aion-etcd-kube', NULL, '2020-06-25 15:27:04'),
       ('20d54d394230e30069498f11d850bcc35f789f3fa36beb5fd23cbdad560c66ec', 'direct-next-service', NULL,
        '2020-06-25 15:26:42'),
       ('219bde6457dd48188a9ff173ff77c67eacf049237e7e5346987f2f12c07e4395', 'mysql', NULL, '2020-06-25 15:26:45'),
       ('24062888517d02fe9d44ae360f4f89fa1422cb651045aa11c94c4c4a19d96782', 'get-robot-backup-yaskawa-with-ftp', NULL,
        '2020-06-25 15:26:48'),
       ('3531b02e49a9a325bab26873ebdd7193238bc3a7a658b0a1909adba4dae54a2c', 'aion-sendanything', NULL,
        '2020-06-25 15:26:49'),
       ('37fc0cb22569d441af7125f033224d2dcd588e944d2e6c42a81fe7805bf105db', 'mongo', NULL, '2020-06-25 15:26:49'),
       ('59bb9a329b55e4666903b9898d95c289e7f400331cce23b80a472019bc97ea5f', 'data-sweeper', NULL,
        '2020-06-25 15:26:50'),
       ('8fd9bd674e03c5d04684021d3621999aa4e5eee53ce4b012439e9a43dcebe9a3', 'aion-etcd-sentinel', NULL,
        '2020-06-25 15:26:51'),
       ('950b7d5e90b473547982ed6b44dfd61a59f76e7f813d09d58e4b1c5b39419e03', 'kube-etcd-sentinel', NULL,
        '2020-06-25 15:26:52'),
       ('968491ea5bba34304f01dbd10dfe8153387c73cade16b9c9ffa839a6e3abf6aa', 'container-sweeper', NULL,
        '2020-06-25 15:26:53'),
       ('9af9547f9c6170a0aea2c854b7dc2cfad88902a0f8dad893808c832e4f5cc9c9', 'aion-servicebroker', NULL,
        '2020-06-25 15:26:54'),
       ('a6ad79bebcdb81eb70457f7b00a5199546edb5dd0098dac72e9f98318194c190', 'prometheus', NULL, '2020-06-25 15:26:55'),
       ('b806dff3a9c7bbec2b2bac863b2a39cc4d519578eee3ebcbf25b9798deefd7c0', 'ui-frontend-for-maintenance', NULL,
        '2020-06-25 15:26:56'),
       ('ba6942524826f9f19bd474e0c299f2bcfad956d2de9c9ce4ce7529e96da16ffe', 'data-sweeper-batch', NULL,
        '2020-06-25 15:26:57'),
       ('bbfd316f160f45c21c7185292bbe56fc97dbe24a71d9753c41080b8ea80561f3', 'kanban-redis-to-mongodb', NULL,
        '2020-06-25 15:26:58'),
       ('bfe0864c9499d3f9d2195e9d40c6005bdc7ae3fd62f328e39480993eea54a477', 'redis-cluster', NULL,
        '2020-06-25 15:26:59'),
       ('c7061129a4b3038ea9b3393358ff6e9aa5d07d70bf06d6f9c17ec68dafec4fbc', 'job-scheduler', NULL,
        '2020-06-25 15:27:00'),
       ('d82d0598f05d5c66dd3af921dfa86ccdc10d2e1629abc316127b47bab3fd2cce', 'control-yaskawa-robot-r', NULL,
        '2020-06-25 15:27:01'),
       ('e025f54289e3cdfb482c7bbeb46cfc1769e36688fc82523b0fa228683b1363e2', 'aion-statuskanban', NULL,
        '2020-06-25 15:27:02'),
       ('eeaeef0e88ab3f976331253da1cba27132eb6de9c2fac0dba41801227190c5cd', 'container-image-sweeper', NULL,
        '2020-06-25 15:27:03');
/*!40000 ALTER TABLE `microservices`
    ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users`
(
    `user_id`   int(11) NOT NULL AUTO_INCREMENT,
    `password`  char(64) DEFAULT NULL,
    `user_name` char(45) DEFAULT NULL,
    PRIMARY KEY (`user_id`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 3
  DEFAULT CHARSET = utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users`
    DISABLE KEYS */;
INSERT INTO `users`
VALUES (1, '$2b$10$t55YvJpU/FqK28HmzmLQPeLsh3II3EIQ9n/58iJDWhQ9r2BJQ5pWa', 'admin'),
       (2, '$2b$10$t55YvJpU/FqK28HmzmLQPeLsh3II3EIQ9n/58iJDWhQ9r2BJQ5pWa', 'user');
/*!40000 ALTER TABLE `users`
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

-- Dump completed on 2020-06-27 13:11:36
