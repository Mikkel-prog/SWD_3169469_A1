-- MySQL dump 10.13  Distrib 8.0.46, for Win64 (x86_64)
--
-- Host: localhost    Database: appliance_inventory
-- ------------------------------------------------------
-- Server version	8.0.46

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `appliances`
--

DROP TABLE IF EXISTS `appliances`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `appliances` (
  `ApplianceID` int NOT NULL AUTO_INCREMENT,
  `SerialNumber` varchar(50) NOT NULL,
  `ApplianceType` varchar(100) NOT NULL,
  `Brand` varchar(100) NOT NULL,
  `ModelNumber` varchar(50) NOT NULL,
  `PurchaseDate` date DEFAULT NULL,
  `WarrantyDate` date DEFAULT NULL,
  `CostOfAppliance` decimal(10,2) DEFAULT NULL,
  `UserID` int NOT NULL,
  PRIMARY KEY (`ApplianceID`),
  UNIQUE KEY `SerialNumber` (`SerialNumber`),
  KEY `UserID` (`UserID`),
  CONSTRAINT `appliances_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `users` (`userID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appliances`
--

LOCK TABLES `appliances` WRITE;
/*!40000 ALTER TABLE `appliances` DISABLE KEYS */;
INSERT INTO `appliances` VALUES (2,'10293847-1234','Microwave','apple','102938-1234','2026-04-06',NULL,122.98,2),(3,'31241241-0987','Vacuum Cleaner','LG','421411-1235','2026-04-30','2026-07-30',4213.00,1),(4,'60358251-9823','Washing Machine','Bosch','682451-9610','2026-03-29','2026-12-10',598.80,3),(6,'79325712-9521','Oven','jarvis','262831-7932','2026-03-29','2026-05-09',234.00,1);
/*!40000 ALTER TABLE `appliances` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `userID` int NOT NULL AUTO_INCREMENT,
  `FirstName` varchar(100) DEFAULT NULL,
  `LastName` varchar(100) DEFAULT NULL,
  `Address` varchar(255) DEFAULT NULL,
  `Eircode` varchar(10) NOT NULL,
  `UserName` varchar(100) DEFAULT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `Phone` varchar(20) DEFAULT NULL,
  `RegisteredDate` date DEFAULT (curdate()),
  PRIMARY KEY (`userID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Mikkel','Diniz','106 collins Avenue   Beaumont Dublin 9','D09 R673',NULL,'mikkeldiniz@gmail.com',NULL,'2026-04-28'),(2,'jack','Pimenta','78 seville place','d01rw28',NULL,'dacostamelrita@gmail.com',NULL,'2026-04-28'),(3,'ranen','fernandes','the liberities','D08 h3e3',NULL,'ranenfernandes@gmail.com','0899712345','2026-04-28'),(4,'Shane','fernand','Farranboley Dublin ','D14 p9p3',NULL,'shane@gmail.com','0897243477','2026-04-28');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-04-28 23:53:54
