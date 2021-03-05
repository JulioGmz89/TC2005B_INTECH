-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Mar 05, 2021 at 04:48 PM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 8.0.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `NatGas_ProjectManager`
--

-- --------------------------------------------------------

--
-- Table structure for table `CasoUso`
--

CREATE TABLE `CasoUso` (
  `id_casoUso` int(11) NOT NULL,
  `id_proyecto` int(11) DEFAULT NULL,
  `complejidad_caso` float DEFAULT NULL,
  `nombre_caso` varchar(130) DEFAULT NULL,
  `fechaInicio_caso` date DEFAULT NULL,
  `fechaFinalizacion_caso` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `CasoUso`
--

INSERT INTO `CasoUso` (`id_casoUso`, `id_proyecto`, `complejidad_caso`, `nombre_caso`, `fechaInicio_caso`, `fechaFinalizacion_caso`) VALUES
(1, 1, 0.361725, 'Caso0', '2021-03-02', '2021-03-03'),
(2, 1, 3.43809, 'Caso1', '2021-03-03', '2021-03-04'),
(3, 1, 2.84495, 'Caso2', '2021-03-04', '2021-03-05'),
(4, 1, 2.72945, 'Caso3', '2021-03-05', '2021-03-06'),
(5, 1, 2.69119, 'Caso4', '2021-03-06', '2021-03-07'),
(6, 1, 2.89407, 'Caso5', '2021-03-07', '2021-03-08'),
(7, 1, 0.798215, 'Caso6', '2021-03-08', '2021-03-09'),
(8, 1, 1.37862, 'Caso7', '2021-03-09', '2021-03-10'),
(9, 1, 2.41261, 'Caso8', '2021-03-10', '2021-03-11'),
(10, 1, 1.68089, 'Caso9', '2021-03-11', '2021-03-12'),
(11, 1, 1.05163, 'Caso10', '2021-03-12', '2021-03-13'),
(12, 1, 1.70568, 'Caso11', '2021-03-13', '2021-03-14'),
(13, 1, 3.02978, 'Caso12', '2021-03-14', '2021-03-15'),
(14, 1, 0.482843, 'Caso13', '2021-03-15', '2021-03-16'),
(15, 1, 3.29823, 'Caso14', '2021-03-16', '2021-03-17'),
(16, 1, 3.19729, 'Caso15', '2021-03-17', '2021-03-18'),
(17, 1, 0.212975, 'Caso16', '2021-03-18', '2021-03-19'),
(18, 1, 0.817578, 'Caso17', '2021-03-19', '2021-03-20'),
(19, 1, 2.35426, 'Caso18', '2021-03-20', '2021-03-21'),
(20, 1, 2.15109, 'Caso19', '2021-03-21', '2021-03-22'),
(21, 2, 2.59688, 'Caso20', '2021-03-22', '2021-03-23'),
(22, 2, 3.05612, 'Caso21', '2021-03-23', '2021-03-24'),
(23, 2, 1.33774, 'Caso22', '2021-03-24', '2021-03-25'),
(24, 2, 2.3696, 'Caso23', '2021-03-25', '2021-03-26'),
(25, 2, 2.03698, 'Caso24', '2021-03-26', '2021-03-27'),
(26, 2, 1.53421, 'Caso25', '2021-03-27', '2021-03-28'),
(27, 2, 2.10512, 'Caso26', '2021-03-28', '2021-03-29'),
(28, 2, 2.64771, 'Caso27', '2021-03-29', '2021-03-30'),
(29, 2, 0.840853, 'Caso28', '2021-03-30', '2021-03-31'),
(30, 2, 3.34229, 'Caso29', '2021-03-31', '2021-04-01'),
(31, 2, 2.2897, 'Caso30', '2021-04-01', '2021-04-02'),
(32, 2, 0.877559, 'Caso31', '2021-04-02', '2021-04-03'),
(33, 2, 2.98988, 'Caso32', '2021-04-03', '2021-04-04'),
(34, 2, 0.883373, 'Caso33', '2021-04-04', '2021-04-05'),
(35, 2, 0.304775, 'Caso34', '2021-04-05', '2021-04-06'),
(36, 2, 3.16155, 'Caso35', '2021-04-06', '2021-04-07'),
(37, 2, 2.25513, 'Caso36', '2021-04-07', '2021-04-08'),
(38, 2, 3.38609, 'Caso37', '2021-04-08', '2021-04-09'),
(39, 2, 0.356703, 'Caso38', '2021-04-09', '2021-04-10'),
(40, 2, 1.99675, 'Caso39', '2021-04-10', '2021-04-11'),
(41, 3, 2.05434, 'Caso40', '2021-04-11', '2021-04-12'),
(42, 3, 1.05943, 'Caso41', '2021-04-12', '2021-04-13'),
(43, 3, 3.2758, 'Caso42', '2021-04-13', '2021-04-14'),
(44, 3, 0.709518, 'Caso43', '2021-04-14', '2021-04-15'),
(45, 3, 0.378969, 'Caso44', '2021-04-15', '2021-04-16'),
(46, 3, 2.57817, 'Caso45', '2021-04-16', '2021-04-17'),
(47, 3, 2.78841, 'Caso46', '2021-04-17', '2021-04-18'),
(48, 3, 1.59421, 'Caso47', '2021-04-18', '2021-04-19'),
(49, 3, 3.47742, 'Caso48', '2021-04-19', '2021-04-20'),
(50, 3, 3.35051, 'Caso49', '2021-04-20', '2021-04-21'),
(51, 3, 3.09065, 'Caso50', '2021-04-21', '2021-04-22'),
(52, 3, 3.13489, 'Caso51', '2021-04-22', '2021-04-23'),
(53, 3, 2.41651, 'Caso52', '2021-04-23', '2021-04-24'),
(54, 3, 2.92946, 'Caso53', '2021-04-24', '2021-04-25'),
(55, 3, 3.48603, 'Caso54', '2021-04-25', '2021-04-26'),
(56, 3, 1.1937, 'Caso55', '2021-04-26', '2021-04-27'),
(57, 3, 1.71026, 'Caso56', '2021-04-27', '2021-04-28'),
(58, 3, 3.03943, 'Caso57', '2021-04-28', '2021-04-29'),
(59, 3, 2.99074, 'Caso58', '2021-04-29', '2021-04-30'),
(60, 3, 1.12662, 'Caso59', '2021-04-30', '2021-05-01'),
(61, 4, 2.7515, 'Caso60', '2021-05-01', '2021-05-02'),
(62, 4, 3.3499, 'Caso61', '2021-05-02', '2021-05-03'),
(63, 4, 1.28007, 'Caso62', '2021-05-03', '2021-05-04'),
(64, 4, 2.60435, 'Caso63', '2021-05-04', '2021-05-05'),
(65, 4, 0.477894, 'Caso64', '2021-05-05', '2021-05-06'),
(66, 4, 3.23354, 'Caso65', '2021-05-06', '2021-05-07'),
(67, 4, 1.136, 'Caso66', '2021-05-07', '2021-05-08'),
(68, 4, 2.77563, 'Caso67', '2021-05-08', '2021-05-09'),
(69, 4, 3.08331, 'Caso68', '2021-05-09', '2021-05-10'),
(70, 4, 1.59182, 'Caso69', '2021-05-10', '2021-05-11'),
(71, 4, 3.26145, 'Caso70', '2021-05-11', '2021-05-12'),
(72, 4, 0.723384, 'Caso71', '2021-05-12', '2021-05-13'),
(73, 4, 2.21021, 'Caso72', '2021-05-13', '2021-05-14'),
(74, 4, 3.23108, 'Caso73', '2021-05-14', '2021-05-15'),
(75, 4, 0.0635671, 'Caso74', '2021-05-15', '2021-05-16'),
(76, 4, 0.785834, 'Caso75', '2021-05-16', '2021-05-17'),
(77, 4, 1.58089, 'Caso76', '2021-05-17', '2021-05-18'),
(78, 4, 1.78642, 'Caso77', '2021-05-18', '2021-05-19'),
(79, 4, 2.67368, 'Caso78', '2021-05-19', '2021-05-20'),
(80, 4, 0.17718, 'Caso79', '2021-05-20', '2021-05-21');

-- --------------------------------------------------------

--
-- Table structure for table `Categoria`
--

CREATE TABLE `Categoria` (
  `id_categoria` int(11) NOT NULL,
  `nombre_categoria` varchar(130) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Categoria`
--

INSERT INTO `Categoria` (`id_categoria`, `nombre_categoria`) VALUES
(1, 'Categoria 1'),
(2, 'Categoria 2'),
(3, 'Categoria 3'),
(4, 'Categoria 4'),
(5, 'Categoria 5'),
(6, 'Categoria 6'),
(7, 'Categoria 7'),
(8, 'Categoria 8'),
(9, 'Categoria 9'),
(10, 'Categoria 10');

-- --------------------------------------------------------

--
-- Table structure for table `Complejidad`
--

CREATE TABLE `Complejidad` (
  `id_complejidad` int(11) NOT NULL,
  `minimo` float DEFAULT NULL,
  `maximo` float DEFAULT NULL,
  `nivel` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Complejidad`
--

INSERT INTO `Complejidad` (`id_complejidad`, `minimo`, `maximo`, `nivel`) VALUES
(8, 2.96143, 4.44215, 1),
(9, 2.67008, 4.00512, 2),
(10, 3.19347, 4.79021, 3),
(11, 9.60604, 14.4091, 5),
(12, 27.5528, 41.3292, 8),
(13, 25.6237, 38.4356, 13),
(14, 1.85175, 2.77763, 1),
(15, 6.61233, 9.9185, 2),
(16, 7.91449, 11.8717, 3),
(17, 11.8126, 17.7188, 5),
(18, 27.0775, 40.6163, 8),
(19, 15.0166, 22.5249, 13),
(20, 2.60386, 3.90579, 1),
(21, 5.0154, 7.52309, 2),
(22, 9.05175, 13.5776, 3),
(23, 5.90312, 8.85468, 5),
(24, 16.3125, 24.4688, 8),
(25, 44.5601, 66.8401, 13),
(26, 2.37648, 3.56472, 1),
(27, 4.24741, 6.37111, 2),
(28, 10.2059, 15.3088, 3),
(29, 16.689, 25.0335, 5),
(30, 26.8265, 40.2398, 8),
(31, 34.5214, 51.7821, 13);

-- --------------------------------------------------------

--
-- Table structure for table `Proyecto`
--

CREATE TABLE `Proyecto` (
  `id_proyecto` int(11) NOT NULL,
  `nombre_proyecto` varchar(130) DEFAULT NULL,
  `descripcion_proyecto` varchar(800) DEFAULT NULL,
  `fechaInicio_proyecto` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Proyecto`
--

INSERT INTO `Proyecto` (`id_proyecto`, `nombre_proyecto`, `descripcion_proyecto`, `fechaInicio_proyecto`) VALUES
(1, 'proyecto1', 'descripción proyecto 1', '2021-02-28'),
(2, 'proyecto2', 'descripción proyecto 2', '2021-02-28'),
(3, 'proyecto3', 'descripción proyecto 3', '2021-03-01'),
(4, 'proyecto4', 'descripción proyecto 4', '2021-03-02'),
(5, 'proyecto5', 'descripción proyecto 5', '2021-03-03'),
(6, 'proyecto6', 'descripción proyecto 6', '2021-03-04'),
(7, 'proyecto7', 'descripción proyecto 7', '2021-03-05'),
(8, 'proyecto8', 'descripción proyecto 8', '2021-03-06'),
(9, 'proyecto9', 'descripción proyecto 9', '2021-03-07'),
(10, 'proyecto10', 'descripción proyecto 10', '2021-03-08');

-- --------------------------------------------------------

--
-- Table structure for table `PuntosAgiles`
--

CREATE TABLE `PuntosAgiles` (
  `id_puntosAgiles` int(11) NOT NULL,
  `id_proyecto` int(11) DEFAULT NULL,
  `email_usuario` varchar(130) DEFAULT NULL,
  `id_tareaComplejidad` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `PuntosAgiles`
--

INSERT INTO `PuntosAgiles` (`id_puntosAgiles`, `id_proyecto`, `email_usuario`, `id_tareaComplejidad`) VALUES
(1, 3, 'Artu_Z@outlook.com', 105),
(2, 3, 'Artu_Z@outlook.com', 106),
(3, 3, 'Artu_Z@outlook.com', 107),
(4, 3, 'Artu_Z@outlook.com', 108),
(5, 3, 'Artu_Z@outlook.com', 109),
(6, 3, 'CamilaPH@gmail.com', 105),
(7, 3, 'CamilaPH@gmail.com', 106),
(8, 3, 'CamilaPH@gmail.com', 107),
(9, 3, 'CamilaPH@gmail.com', 108),
(10, 3, 'CamilaPH@gmail.com', 109),
(11, 3, 'Daniel@hotmail.com', 105),
(12, 3, 'Daniel@hotmail.com', 106),
(13, 3, 'Daniel@hotmail.com', 107),
(14, 3, 'Daniel@hotmail.com', 108),
(15, 3, 'Daniel@hotmail.com', 109),
(16, 3, 'Edgar_Millares@hotmail.com', 105),
(17, 3, 'Edgar_Millares@hotmail.com', 106),
(18, 3, 'Edgar_Millares@hotmail.com', 107),
(19, 3, 'Edgar_Millares@hotmail.com', 108),
(20, 3, 'Edgar_Millares@hotmail.com', 109),
(21, 3, 'Eleyva_x@gmail.com', 105),
(22, 3, 'Eleyva_x@gmail.com', 106),
(23, 3, 'Eleyva_x@gmail.com', 107),
(24, 3, 'Eleyva_x@gmail.com', 108),
(25, 3, 'Eleyva_x@gmail.com', 109),
(26, 3, 'EmilyA@gmail.com', 105),
(27, 3, 'EmilyA@gmail.com', 106),
(28, 3, 'EmilyA@gmail.com', 107),
(29, 3, 'EmilyA@gmail.com', 108),
(30, 3, 'EmilyA@gmail.com', 109),
(31, 3, 'Fede@gmail.com', 105),
(32, 3, 'Fede@gmail.com', 106),
(33, 3, 'Fede@gmail.com', 107),
(34, 3, 'Fede@gmail.com', 108),
(35, 3, 'Fede@gmail.com', 109),
(36, 3, 'MJdelA@outlook.com', 105),
(37, 3, 'MJdelA@outlook.com', 106),
(38, 3, 'MJdelA@outlook.com', 107),
(39, 3, 'MJdelA@outlook.com', 108),
(40, 3, 'MJdelA@outlook.com', 109),
(41, 3, 'PauRubio@gmail.com', 105),
(42, 3, 'PauRubio@gmail.com', 106),
(43, 3, 'PauRubio@gmail.com', 107),
(44, 3, 'PauRubio@gmail.com', 108),
(45, 3, 'PauRubio@gmail.com', 109),
(46, 3, 'pc@hotmail.com', 105),
(47, 3, 'pc@hotmail.com', 106),
(48, 3, 'pc@hotmail.com', 107),
(49, 3, 'pc@hotmail.com', 108),
(50, 3, 'pc@hotmail.com', 109),
(51, 3, 'RicardoV@yahoo.com', 105),
(52, 3, 'RicardoV@yahoo.com', 106),
(53, 3, 'RicardoV@yahoo.com', 107),
(54, 3, 'RicardoV@yahoo.com', 108),
(55, 3, 'RicardoV@yahoo.com', 109),
(56, 3, 'Serch_g@outlook.com', 105),
(57, 3, 'Serch_g@outlook.com', 106),
(58, 3, 'Serch_g@outlook.com', 107),
(59, 3, 'Serch_g@outlook.com', 108),
(60, 3, 'Serch_g@outlook.com', 109),
(61, 4, 'Artu_Z@outlook.com', 105),
(62, 4, 'Artu_Z@outlook.com', 106),
(63, 4, 'Artu_Z@outlook.com', 107),
(64, 4, 'Artu_Z@outlook.com', 108),
(65, 4, 'Artu_Z@outlook.com', 109),
(66, 4, 'CamilaPH@gmail.com', 105),
(67, 4, 'CamilaPH@gmail.com', 106),
(68, 4, 'CamilaPH@gmail.com', 107),
(69, 4, 'CamilaPH@gmail.com', 108),
(70, 4, 'CamilaPH@gmail.com', 109),
(71, 4, 'Daniel@hotmail.com', 105),
(72, 4, 'Daniel@hotmail.com', 106),
(73, 4, 'Daniel@hotmail.com', 107),
(74, 4, 'Daniel@hotmail.com', 108),
(75, 4, 'Daniel@hotmail.com', 109),
(76, 4, 'Edgar_Millares@hotmail.com', 105),
(77, 4, 'Edgar_Millares@hotmail.com', 106),
(78, 4, 'Edgar_Millares@hotmail.com', 107),
(79, 4, 'Edgar_Millares@hotmail.com', 108),
(80, 4, 'Edgar_Millares@hotmail.com', 109),
(81, 4, 'Eleyva_x@gmail.com', 105),
(82, 4, 'Eleyva_x@gmail.com', 106),
(83, 4, 'Eleyva_x@gmail.com', 107),
(84, 4, 'Eleyva_x@gmail.com', 108),
(85, 4, 'Eleyva_x@gmail.com', 109),
(86, 4, 'EmilyA@gmail.com', 105),
(87, 4, 'EmilyA@gmail.com', 106),
(88, 4, 'EmilyA@gmail.com', 107),
(89, 4, 'EmilyA@gmail.com', 108),
(90, 4, 'EmilyA@gmail.com', 109),
(91, 4, 'Fede@gmail.com', 105),
(92, 4, 'Fede@gmail.com', 106),
(93, 4, 'Fede@gmail.com', 107),
(94, 4, 'Fede@gmail.com', 108),
(95, 4, 'Fede@gmail.com', 109),
(96, 4, 'MJdelA@outlook.com', 105),
(97, 4, 'MJdelA@outlook.com', 106),
(98, 4, 'MJdelA@outlook.com', 107),
(99, 4, 'MJdelA@outlook.com', 108),
(100, 4, 'MJdelA@outlook.com', 109),
(101, 4, 'PauRubio@gmail.com', 105),
(102, 4, 'PauRubio@gmail.com', 106),
(103, 4, 'PauRubio@gmail.com', 107),
(104, 4, 'PauRubio@gmail.com', 108),
(105, 4, 'PauRubio@gmail.com', 109),
(106, 4, 'pc@hotmail.com', 105),
(107, 4, 'pc@hotmail.com', 106),
(108, 4, 'pc@hotmail.com', 107),
(109, 4, 'pc@hotmail.com', 108),
(110, 4, 'pc@hotmail.com', 109),
(111, 4, 'RicardoV@yahoo.com', 105),
(112, 4, 'RicardoV@yahoo.com', 106),
(113, 4, 'RicardoV@yahoo.com', 107),
(114, 4, 'RicardoV@yahoo.com', 108),
(115, 4, 'RicardoV@yahoo.com', 109),
(116, 4, 'Serch_g@outlook.com', 105),
(117, 4, 'Serch_g@outlook.com', 106),
(118, 4, 'Serch_g@outlook.com', 107),
(119, 4, 'Serch_g@outlook.com', 108),
(120, 4, 'Serch_g@outlook.com', 109),
(121, 5, 'Artu_Z@outlook.com', 105),
(122, 5, 'Artu_Z@outlook.com', 106),
(123, 5, 'Artu_Z@outlook.com', 107),
(124, 5, 'Artu_Z@outlook.com', 108),
(125, 5, 'Artu_Z@outlook.com', 109),
(126, 5, 'CamilaPH@gmail.com', 105),
(127, 5, 'CamilaPH@gmail.com', 106),
(128, 5, 'CamilaPH@gmail.com', 107),
(129, 5, 'CamilaPH@gmail.com', 108),
(130, 5, 'CamilaPH@gmail.com', 109),
(131, 5, 'Daniel@hotmail.com', 105),
(132, 5, 'Daniel@hotmail.com', 106),
(133, 5, 'Daniel@hotmail.com', 107),
(134, 5, 'Daniel@hotmail.com', 108),
(135, 5, 'Daniel@hotmail.com', 109),
(136, 5, 'Edgar_Millares@hotmail.com', 105),
(137, 5, 'Edgar_Millares@hotmail.com', 106),
(138, 5, 'Edgar_Millares@hotmail.com', 107),
(139, 5, 'Edgar_Millares@hotmail.com', 108),
(140, 5, 'Edgar_Millares@hotmail.com', 109),
(141, 5, 'Eleyva_x@gmail.com', 105),
(142, 5, 'Eleyva_x@gmail.com', 106),
(143, 5, 'Eleyva_x@gmail.com', 107),
(144, 5, 'Eleyva_x@gmail.com', 108),
(145, 5, 'Eleyva_x@gmail.com', 109),
(146, 5, 'EmilyA@gmail.com', 105),
(147, 5, 'EmilyA@gmail.com', 106),
(148, 5, 'EmilyA@gmail.com', 107),
(149, 5, 'EmilyA@gmail.com', 108),
(150, 5, 'EmilyA@gmail.com', 109),
(151, 5, 'Fede@gmail.com', 105),
(152, 5, 'Fede@gmail.com', 106),
(153, 5, 'Fede@gmail.com', 107),
(154, 5, 'Fede@gmail.com', 108),
(155, 5, 'Fede@gmail.com', 109),
(156, 5, 'MJdelA@outlook.com', 105),
(157, 5, 'MJdelA@outlook.com', 106),
(158, 5, 'MJdelA@outlook.com', 107),
(159, 5, 'MJdelA@outlook.com', 108),
(160, 5, 'MJdelA@outlook.com', 109),
(161, 5, 'PauRubio@gmail.com', 105),
(162, 5, 'PauRubio@gmail.com', 106),
(163, 5, 'PauRubio@gmail.com', 107),
(164, 5, 'PauRubio@gmail.com', 108),
(165, 5, 'PauRubio@gmail.com', 109),
(166, 5, 'pc@hotmail.com', 105),
(167, 5, 'pc@hotmail.com', 106),
(168, 5, 'pc@hotmail.com', 107),
(169, 5, 'pc@hotmail.com', 108),
(170, 5, 'pc@hotmail.com', 109),
(171, 5, 'RicardoV@yahoo.com', 105),
(172, 5, 'RicardoV@yahoo.com', 106),
(173, 5, 'RicardoV@yahoo.com', 107),
(174, 5, 'RicardoV@yahoo.com', 108),
(175, 5, 'RicardoV@yahoo.com', 109),
(176, 5, 'Serch_g@outlook.com', 105),
(177, 5, 'Serch_g@outlook.com', 106),
(178, 5, 'Serch_g@outlook.com', 107),
(179, 5, 'Serch_g@outlook.com', 108),
(180, 5, 'Serch_g@outlook.com', 109),
(181, 6, 'Artu_Z@outlook.com', 105),
(182, 6, 'Artu_Z@outlook.com', 106),
(183, 6, 'Artu_Z@outlook.com', 107),
(184, 6, 'Artu_Z@outlook.com', 108),
(185, 6, 'Artu_Z@outlook.com', 109),
(186, 6, 'CamilaPH@gmail.com', 105),
(187, 6, 'CamilaPH@gmail.com', 106),
(188, 6, 'CamilaPH@gmail.com', 107),
(189, 6, 'CamilaPH@gmail.com', 108),
(190, 6, 'CamilaPH@gmail.com', 109),
(191, 6, 'Daniel@hotmail.com', 105),
(192, 6, 'Daniel@hotmail.com', 106),
(193, 6, 'Daniel@hotmail.com', 107),
(194, 6, 'Daniel@hotmail.com', 108),
(195, 6, 'Daniel@hotmail.com', 109),
(196, 6, 'Edgar_Millares@hotmail.com', 105),
(197, 6, 'Edgar_Millares@hotmail.com', 106),
(198, 6, 'Edgar_Millares@hotmail.com', 107),
(199, 6, 'Edgar_Millares@hotmail.com', 108),
(200, 6, 'Edgar_Millares@hotmail.com', 109),
(201, 6, 'Eleyva_x@gmail.com', 105),
(202, 6, 'Eleyva_x@gmail.com', 106),
(203, 6, 'Eleyva_x@gmail.com', 107),
(204, 6, 'Eleyva_x@gmail.com', 108),
(205, 6, 'Eleyva_x@gmail.com', 109),
(206, 6, 'EmilyA@gmail.com', 105),
(207, 6, 'EmilyA@gmail.com', 106),
(208, 6, 'EmilyA@gmail.com', 107),
(209, 6, 'EmilyA@gmail.com', 108),
(210, 6, 'EmilyA@gmail.com', 109),
(211, 6, 'Fede@gmail.com', 105),
(212, 6, 'Fede@gmail.com', 106),
(213, 6, 'Fede@gmail.com', 107),
(214, 6, 'Fede@gmail.com', 108),
(215, 6, 'Fede@gmail.com', 109),
(216, 6, 'MJdelA@outlook.com', 105),
(217, 6, 'MJdelA@outlook.com', 106),
(218, 6, 'MJdelA@outlook.com', 107),
(219, 6, 'MJdelA@outlook.com', 108),
(220, 6, 'MJdelA@outlook.com', 109),
(221, 6, 'PauRubio@gmail.com', 105),
(222, 6, 'PauRubio@gmail.com', 106),
(223, 6, 'PauRubio@gmail.com', 107),
(224, 6, 'PauRubio@gmail.com', 108),
(225, 6, 'PauRubio@gmail.com', 109),
(226, 6, 'pc@hotmail.com', 105),
(227, 6, 'pc@hotmail.com', 106),
(228, 6, 'pc@hotmail.com', 107),
(229, 6, 'pc@hotmail.com', 108),
(230, 6, 'pc@hotmail.com', 109),
(231, 6, 'RicardoV@yahoo.com', 105),
(232, 6, 'RicardoV@yahoo.com', 106),
(233, 6, 'RicardoV@yahoo.com', 107),
(234, 6, 'RicardoV@yahoo.com', 108),
(235, 6, 'RicardoV@yahoo.com', 109),
(236, 6, 'Serch_g@outlook.com', 105),
(237, 6, 'Serch_g@outlook.com', 106),
(238, 6, 'Serch_g@outlook.com', 107),
(239, 6, 'Serch_g@outlook.com', 108),
(240, 6, 'Serch_g@outlook.com', 109),
(241, 7, 'Artu_Z@outlook.com', 105),
(242, 7, 'Artu_Z@outlook.com', 106),
(243, 7, 'Artu_Z@outlook.com', 107),
(244, 7, 'Artu_Z@outlook.com', 108),
(245, 7, 'Artu_Z@outlook.com', 109),
(246, 7, 'CamilaPH@gmail.com', 105),
(247, 7, 'CamilaPH@gmail.com', 106),
(248, 7, 'CamilaPH@gmail.com', 107),
(249, 7, 'CamilaPH@gmail.com', 108),
(250, 7, 'CamilaPH@gmail.com', 109),
(251, 7, 'Daniel@hotmail.com', 105),
(252, 7, 'Daniel@hotmail.com', 106),
(253, 7, 'Daniel@hotmail.com', 107),
(254, 7, 'Daniel@hotmail.com', 108),
(255, 7, 'Daniel@hotmail.com', 109),
(256, 7, 'Edgar_Millares@hotmail.com', 105),
(257, 7, 'Edgar_Millares@hotmail.com', 106),
(258, 7, 'Edgar_Millares@hotmail.com', 107),
(259, 7, 'Edgar_Millares@hotmail.com', 108),
(260, 7, 'Edgar_Millares@hotmail.com', 109),
(261, 7, 'Eleyva_x@gmail.com', 105),
(262, 7, 'Eleyva_x@gmail.com', 106),
(263, 7, 'Eleyva_x@gmail.com', 107),
(264, 7, 'Eleyva_x@gmail.com', 108),
(265, 7, 'Eleyva_x@gmail.com', 109),
(266, 7, 'EmilyA@gmail.com', 105),
(267, 7, 'EmilyA@gmail.com', 106),
(268, 7, 'EmilyA@gmail.com', 107),
(269, 7, 'EmilyA@gmail.com', 108),
(270, 7, 'EmilyA@gmail.com', 109),
(271, 7, 'Fede@gmail.com', 105),
(272, 7, 'Fede@gmail.com', 106),
(273, 7, 'Fede@gmail.com', 107),
(274, 7, 'Fede@gmail.com', 108),
(275, 7, 'Fede@gmail.com', 109),
(276, 7, 'MJdelA@outlook.com', 105),
(277, 7, 'MJdelA@outlook.com', 106),
(278, 7, 'MJdelA@outlook.com', 107),
(279, 7, 'MJdelA@outlook.com', 108),
(280, 7, 'MJdelA@outlook.com', 109),
(281, 7, 'PauRubio@gmail.com', 105),
(282, 7, 'PauRubio@gmail.com', 106),
(283, 7, 'PauRubio@gmail.com', 107),
(284, 7, 'PauRubio@gmail.com', 108),
(285, 7, 'PauRubio@gmail.com', 109),
(286, 7, 'pc@hotmail.com', 105),
(287, 7, 'pc@hotmail.com', 106),
(288, 7, 'pc@hotmail.com', 107),
(289, 7, 'pc@hotmail.com', 108),
(290, 7, 'pc@hotmail.com', 109),
(291, 7, 'RicardoV@yahoo.com', 105),
(292, 7, 'RicardoV@yahoo.com', 106),
(293, 7, 'RicardoV@yahoo.com', 107),
(294, 7, 'RicardoV@yahoo.com', 108),
(295, 7, 'RicardoV@yahoo.com', 109),
(296, 7, 'Serch_g@outlook.com', 105),
(297, 7, 'Serch_g@outlook.com', 106),
(298, 7, 'Serch_g@outlook.com', 107),
(299, 7, 'Serch_g@outlook.com', 108),
(300, 7, 'Serch_g@outlook.com', 109);

-- --------------------------------------------------------

--
-- Table structure for table `Rol`
--

CREATE TABLE `Rol` (
  `id_rol` int(11) NOT NULL,
  `nombre_rol` varchar(130) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Rol`
--

INSERT INTO `Rol` (`id_rol`, `nombre_rol`) VALUES
(1, 'rol 1'),
(2, 'rol 2'),
(3, 'rol 3'),
(4, 'rol 4'),
(5, 'rol 5'),
(6, 'rol 6'),
(7, 'rol 7'),
(8, 'rol 8'),
(9, 'rol 9'),
(10, 'rol 10');

-- --------------------------------------------------------

--
-- Table structure for table `RolProyecto_Usuario`
--

CREATE TABLE `RolProyecto_Usuario` (
  `id_rolProyectoUsuario` int(11) NOT NULL,
  `id_rolProyecto` int(11) DEFAULT NULL,
  `email_usuario` varchar(130) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `RolProyecto_Usuario`
--

INSERT INTO `RolProyecto_Usuario` (`id_rolProyectoUsuario`, `id_rolProyecto`, `email_usuario`) VALUES
(1188, 1, 'Artu_Z@outlook.com'),
(1189, 1, 'CamilaPH@gmail.com'),
(1190, 1, 'Daniel@hotmail.com'),
(1191, 1, 'Edgar_Millares@hotmail.com'),
(1192, 1, 'Eleyva_x@gmail.com'),
(1193, 1, 'EmilyA@gmail.com'),
(1194, 1, 'Fede@gmail.com'),
(1195, 1, 'Fer_Calzada@outlook.com'),
(1196, 1, 'Franchesco_Forno@yahoo.com'),
(1197, 1, 'JC@yahoo.com'),
(1198, 1, 'Jordi_Wild@hotmail.com'),
(1199, 1, 'Jorge_Ramirez@outlook.com'),
(1200, 1, 'julius@gmail.com'),
(1201, 1, 'lore_rhoades@gmail.com'),
(1202, 1, 'luisRa@gmail.com'),
(1203, 1, 'MJdelA@outlook.com'),
(1204, 1, 'PauRubio@gmail.com'),
(1205, 1, 'pc@hotmail.com'),
(1206, 1, 'RicardoV@yahoo.com'),
(1207, 1, 'Serch_g@outlook.com'),
(1208, 2, 'Artu_Z@outlook.com'),
(1209, 2, 'CamilaPH@gmail.com'),
(1210, 2, 'Daniel@hotmail.com'),
(1211, 2, 'Edgar_Millares@hotmail.com'),
(1212, 2, 'Eleyva_x@gmail.com'),
(1213, 2, 'EmilyA@gmail.com'),
(1214, 2, 'Fede@gmail.com'),
(1215, 2, 'Fer_Calzada@outlook.com'),
(1216, 2, 'Franchesco_Forno@yahoo.com'),
(1217, 2, 'JC@yahoo.com'),
(1218, 2, 'Jordi_Wild@hotmail.com'),
(1219, 2, 'Jorge_Ramirez@outlook.com'),
(1220, 2, 'julius@gmail.com'),
(1221, 2, 'lore_rhoades@gmail.com'),
(1222, 2, 'luisRa@gmail.com'),
(1223, 2, 'MJdelA@outlook.com'),
(1224, 2, 'PauRubio@gmail.com'),
(1225, 2, 'pc@hotmail.com'),
(1226, 2, 'RicardoV@yahoo.com'),
(1227, 2, 'Serch_g@outlook.com'),
(1228, 3, 'Artu_Z@outlook.com'),
(1229, 3, 'CamilaPH@gmail.com'),
(1230, 3, 'Daniel@hotmail.com'),
(1231, 3, 'Edgar_Millares@hotmail.com'),
(1232, 3, 'Eleyva_x@gmail.com'),
(1233, 3, 'EmilyA@gmail.com'),
(1234, 3, 'Fede@gmail.com'),
(1235, 3, 'Fer_Calzada@outlook.com'),
(1236, 3, 'Franchesco_Forno@yahoo.com'),
(1237, 3, 'JC@yahoo.com'),
(1238, 3, 'Jordi_Wild@hotmail.com'),
(1239, 3, 'Jorge_Ramirez@outlook.com'),
(1240, 3, 'julius@gmail.com'),
(1241, 3, 'lore_rhoades@gmail.com'),
(1242, 3, 'luisRa@gmail.com'),
(1243, 3, 'MJdelA@outlook.com'),
(1244, 3, 'PauRubio@gmail.com'),
(1245, 3, 'pc@hotmail.com'),
(1246, 3, 'RicardoV@yahoo.com'),
(1247, 3, 'Serch_g@outlook.com'),
(1248, 4, 'Artu_Z@outlook.com'),
(1249, 4, 'CamilaPH@gmail.com'),
(1250, 4, 'Daniel@hotmail.com'),
(1251, 4, 'Edgar_Millares@hotmail.com'),
(1252, 4, 'Eleyva_x@gmail.com'),
(1253, 4, 'EmilyA@gmail.com'),
(1254, 4, 'Fede@gmail.com'),
(1255, 4, 'Fer_Calzada@outlook.com'),
(1256, 4, 'Franchesco_Forno@yahoo.com'),
(1257, 4, 'JC@yahoo.com'),
(1258, 4, 'Jordi_Wild@hotmail.com'),
(1259, 4, 'Jorge_Ramirez@outlook.com'),
(1260, 4, 'julius@gmail.com'),
(1261, 4, 'lore_rhoades@gmail.com'),
(1262, 4, 'luisRa@gmail.com'),
(1263, 4, 'MJdelA@outlook.com'),
(1264, 4, 'PauRubio@gmail.com'),
(1265, 4, 'pc@hotmail.com'),
(1266, 4, 'RicardoV@yahoo.com'),
(1267, 4, 'Serch_g@outlook.com'),
(1268, 5, 'Artu_Z@outlook.com'),
(1269, 5, 'CamilaPH@gmail.com'),
(1270, 5, 'Daniel@hotmail.com'),
(1271, 5, 'Edgar_Millares@hotmail.com'),
(1272, 5, 'Eleyva_x@gmail.com'),
(1273, 5, 'EmilyA@gmail.com'),
(1274, 5, 'Fede@gmail.com'),
(1275, 5, 'Fer_Calzada@outlook.com'),
(1276, 5, 'Franchesco_Forno@yahoo.com'),
(1277, 5, 'JC@yahoo.com'),
(1278, 5, 'Jordi_Wild@hotmail.com'),
(1279, 5, 'Jorge_Ramirez@outlook.com'),
(1280, 5, 'julius@gmail.com'),
(1281, 5, 'lore_rhoades@gmail.com'),
(1282, 5, 'luisRa@gmail.com'),
(1283, 5, 'MJdelA@outlook.com'),
(1284, 5, 'PauRubio@gmail.com'),
(1285, 5, 'pc@hotmail.com'),
(1286, 5, 'RicardoV@yahoo.com'),
(1287, 5, 'Serch_g@outlook.com'),
(1288, 6, 'Artu_Z@outlook.com'),
(1289, 6, 'CamilaPH@gmail.com'),
(1290, 6, 'Daniel@hotmail.com'),
(1291, 6, 'Edgar_Millares@hotmail.com'),
(1292, 6, 'Eleyva_x@gmail.com'),
(1293, 6, 'EmilyA@gmail.com'),
(1294, 6, 'Fede@gmail.com'),
(1295, 6, 'Fer_Calzada@outlook.com'),
(1296, 6, 'Franchesco_Forno@yahoo.com'),
(1297, 6, 'JC@yahoo.com'),
(1298, 6, 'Jordi_Wild@hotmail.com'),
(1299, 6, 'Jorge_Ramirez@outlook.com'),
(1300, 6, 'julius@gmail.com'),
(1301, 6, 'lore_rhoades@gmail.com'),
(1302, 6, 'luisRa@gmail.com'),
(1303, 6, 'MJdelA@outlook.com'),
(1304, 6, 'PauRubio@gmail.com'),
(1305, 6, 'pc@hotmail.com'),
(1306, 6, 'RicardoV@yahoo.com'),
(1307, 6, 'Serch_g@outlook.com'),
(1308, 7, 'Artu_Z@outlook.com'),
(1309, 7, 'CamilaPH@gmail.com'),
(1310, 7, 'Daniel@hotmail.com'),
(1311, 7, 'Edgar_Millares@hotmail.com'),
(1312, 7, 'Eleyva_x@gmail.com'),
(1313, 7, 'EmilyA@gmail.com'),
(1314, 7, 'Fede@gmail.com'),
(1315, 7, 'Fer_Calzada@outlook.com'),
(1316, 7, 'Franchesco_Forno@yahoo.com'),
(1317, 7, 'JC@yahoo.com'),
(1318, 7, 'Jordi_Wild@hotmail.com'),
(1319, 7, 'Jorge_Ramirez@outlook.com'),
(1320, 7, 'julius@gmail.com'),
(1321, 7, 'lore_rhoades@gmail.com'),
(1322, 7, 'luisRa@gmail.com'),
(1323, 7, 'MJdelA@outlook.com'),
(1324, 7, 'PauRubio@gmail.com'),
(1325, 7, 'pc@hotmail.com'),
(1326, 7, 'RicardoV@yahoo.com'),
(1327, 7, 'Serch_g@outlook.com'),
(1328, 8, 'Artu_Z@outlook.com'),
(1329, 8, 'CamilaPH@gmail.com'),
(1330, 8, 'Daniel@hotmail.com'),
(1331, 8, 'Edgar_Millares@hotmail.com'),
(1332, 8, 'Eleyva_x@gmail.com'),
(1333, 8, 'EmilyA@gmail.com'),
(1334, 8, 'Fede@gmail.com'),
(1335, 8, 'Fer_Calzada@outlook.com'),
(1336, 8, 'Franchesco_Forno@yahoo.com'),
(1337, 8, 'JC@yahoo.com'),
(1338, 8, 'Jordi_Wild@hotmail.com'),
(1339, 8, 'Jorge_Ramirez@outlook.com'),
(1340, 8, 'julius@gmail.com'),
(1341, 8, 'lore_rhoades@gmail.com'),
(1342, 8, 'luisRa@gmail.com'),
(1343, 8, 'MJdelA@outlook.com'),
(1344, 8, 'PauRubio@gmail.com'),
(1345, 8, 'pc@hotmail.com'),
(1346, 8, 'RicardoV@yahoo.com'),
(1347, 8, 'Serch_g@outlook.com'),
(1348, 9, 'Artu_Z@outlook.com'),
(1349, 9, 'CamilaPH@gmail.com'),
(1350, 9, 'Daniel@hotmail.com'),
(1351, 9, 'Edgar_Millares@hotmail.com'),
(1352, 9, 'Eleyva_x@gmail.com'),
(1353, 9, 'EmilyA@gmail.com'),
(1354, 9, 'Fede@gmail.com'),
(1355, 9, 'Fer_Calzada@outlook.com'),
(1356, 9, 'Franchesco_Forno@yahoo.com'),
(1357, 9, 'JC@yahoo.com'),
(1358, 9, 'Jordi_Wild@hotmail.com'),
(1359, 9, 'Jorge_Ramirez@outlook.com'),
(1360, 9, 'julius@gmail.com'),
(1361, 9, 'lore_rhoades@gmail.com'),
(1362, 9, 'luisRa@gmail.com'),
(1363, 9, 'MJdelA@outlook.com'),
(1364, 9, 'PauRubio@gmail.com'),
(1365, 9, 'pc@hotmail.com'),
(1366, 9, 'RicardoV@yahoo.com'),
(1367, 9, 'Serch_g@outlook.com'),
(1368, 10, 'Artu_Z@outlook.com'),
(1369, 10, 'CamilaPH@gmail.com'),
(1370, 10, 'Daniel@hotmail.com'),
(1371, 10, 'Edgar_Millares@hotmail.com'),
(1372, 10, 'Eleyva_x@gmail.com'),
(1373, 10, 'EmilyA@gmail.com'),
(1374, 10, 'Fede@gmail.com'),
(1375, 10, 'Fer_Calzada@outlook.com'),
(1376, 10, 'Franchesco_Forno@yahoo.com'),
(1377, 10, 'JC@yahoo.com'),
(1378, 10, 'Jordi_Wild@hotmail.com'),
(1379, 10, 'Jorge_Ramirez@outlook.com'),
(1380, 10, 'julius@gmail.com'),
(1381, 10, 'lore_rhoades@gmail.com'),
(1382, 10, 'luisRa@gmail.com'),
(1383, 10, 'MJdelA@outlook.com'),
(1384, 10, 'PauRubio@gmail.com'),
(1385, 10, 'pc@hotmail.com'),
(1386, 10, 'RicardoV@yahoo.com'),
(1387, 10, 'Serch_g@outlook.com');

-- --------------------------------------------------------

--
-- Table structure for table `Rol_Proyecto`
--

CREATE TABLE `Rol_Proyecto` (
  `id_rolProyecto` int(11) NOT NULL,
  `id_proyecto` int(11) DEFAULT NULL,
  `id_rol` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Rol_Proyecto`
--

INSERT INTO `Rol_Proyecto` (`id_rolProyecto`, `id_proyecto`, `id_rol`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 1, 3),
(4, 1, 4),
(5, 1, 5),
(6, 1, 6),
(7, 1, 7),
(8, 1, 8),
(9, 1, 9),
(10, 1, 10),
(11, 2, 1),
(12, 2, 2),
(13, 2, 3),
(14, 2, 4),
(15, 2, 5),
(16, 2, 6),
(17, 2, 7),
(18, 2, 8),
(19, 2, 9),
(20, 2, 10),
(21, 3, 1),
(22, 3, 2),
(23, 3, 3),
(24, 3, 4),
(25, 3, 5),
(26, 3, 6),
(27, 3, 7),
(28, 3, 8),
(29, 3, 9),
(30, 3, 10),
(31, 4, 1),
(32, 4, 2),
(33, 4, 3),
(34, 4, 4),
(35, 4, 5),
(36, 4, 6),
(37, 4, 7),
(38, 4, 8),
(39, 4, 9),
(40, 4, 10),
(41, 5, 1),
(42, 5, 2),
(43, 5, 3),
(44, 5, 4),
(45, 5, 5),
(46, 5, 6),
(47, 5, 7),
(48, 5, 8),
(49, 5, 9),
(50, 5, 10),
(51, 6, 1),
(52, 6, 2),
(53, 6, 3),
(54, 6, 4),
(55, 6, 5),
(56, 6, 6),
(57, 6, 7),
(58, 6, 8),
(59, 6, 9),
(60, 6, 10),
(61, 7, 1),
(62, 7, 2),
(63, 7, 3),
(64, 7, 4),
(65, 7, 5),
(66, 7, 6),
(67, 7, 7),
(68, 7, 8),
(69, 7, 9),
(70, 7, 10),
(71, 8, 1),
(72, 8, 2),
(73, 8, 3),
(74, 8, 4),
(75, 8, 5),
(76, 8, 6),
(77, 8, 7),
(78, 8, 8),
(79, 8, 9),
(80, 8, 10),
(81, 9, 1),
(82, 9, 2),
(83, 9, 3),
(84, 9, 4),
(85, 9, 5),
(86, 9, 6),
(87, 9, 7),
(88, 9, 8),
(89, 9, 9),
(90, 9, 10),
(91, 10, 1),
(92, 10, 2),
(93, 10, 3),
(94, 10, 4),
(95, 10, 5),
(96, 10, 6),
(97, 10, 7),
(98, 10, 8),
(99, 10, 9),
(100, 10, 10);

-- --------------------------------------------------------

--
-- Table structure for table `Tarea`
--

CREATE TABLE `Tarea` (
  `id_tarea` int(11) NOT NULL,
  `id_categoria` int(11) DEFAULT NULL,
  `nombre_tarea` varchar(130) DEFAULT NULL,
  `tiempo_tarea` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Tarea`
--

INSERT INTO `Tarea` (`id_tarea`, `id_categoria`, `nombre_tarea`, `tiempo_tarea`) VALUES
(1, 1, 'Tarea0', 6.15249),
(2, 2, 'Tarea1', 5.20469),
(3, 3, 'Tarea2', 11.1544),
(4, 4, 'Tarea3', 1.08745),
(5, 5, 'Tarea4', 1.10082),
(6, 6, 'Tarea5', 2.59266),
(7, 7, 'Tarea6', 3.1998),
(8, 8, 'Tarea7', 7.51921),
(9, 9, 'Tarea8', 10.2884),
(10, 10, 'Tarea9', 10.6079);

-- --------------------------------------------------------

--
-- Table structure for table `Tarea_Complejidad`
--

CREATE TABLE `Tarea_Complejidad` (
  `id_tareaComplejidad` int(11) NOT NULL,
  `id_tarea` int(11) DEFAULT NULL,
  `id_complejidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Tarea_Complejidad`
--

INSERT INTO `Tarea_Complejidad` (`id_tareaComplejidad`, `id_tarea`, `id_complejidad`) VALUES
(1, 1, 8),
(2, 1, 9),
(3, 1, 10),
(4, 1, 11),
(5, 1, 12),
(6, 1, 13),
(7, 1, 14),
(8, 1, 15),
(9, 1, 16),
(10, 1, 17),
(11, 1, 18),
(12, 1, 19),
(13, 1, 20),
(14, 1, 21),
(15, 1, 22),
(16, 1, 23),
(17, 1, 24),
(18, 1, 25),
(19, 1, 26),
(20, 1, 27),
(21, 1, 28),
(22, 1, 29),
(23, 1, 30),
(24, 1, 31),
(25, 2, 8),
(26, 2, 9),
(27, 2, 10),
(28, 2, 11),
(29, 2, 12),
(30, 2, 13),
(31, 2, 14),
(32, 2, 15),
(33, 2, 16),
(34, 2, 17),
(35, 2, 18),
(36, 2, 19),
(37, 2, 20),
(38, 2, 21),
(39, 2, 22),
(40, 2, 23),
(41, 2, 24),
(42, 2, 25),
(43, 2, 26),
(44, 2, 27),
(45, 2, 28),
(46, 2, 29),
(47, 2, 30),
(48, 2, 31),
(49, 3, 8),
(50, 3, 9),
(51, 3, 10),
(52, 3, 11),
(53, 3, 12),
(54, 3, 13),
(55, 3, 14),
(56, 3, 15),
(57, 3, 16),
(58, 3, 17),
(59, 3, 18),
(60, 3, 19),
(61, 3, 20),
(62, 3, 21),
(63, 3, 22),
(64, 3, 23),
(65, 3, 24),
(66, 3, 25),
(67, 3, 26),
(68, 3, 27),
(69, 3, 28),
(70, 3, 29),
(71, 3, 30),
(72, 3, 31),
(73, 4, 8),
(74, 4, 9),
(75, 4, 10),
(76, 4, 11),
(77, 4, 12),
(78, 4, 13),
(79, 4, 14),
(80, 4, 15),
(81, 4, 16),
(82, 4, 17),
(83, 4, 18),
(84, 4, 19),
(85, 4, 20),
(86, 4, 21),
(87, 4, 22),
(88, 4, 23),
(89, 4, 24),
(90, 4, 25),
(91, 4, 26),
(92, 4, 27),
(93, 4, 28),
(94, 4, 29),
(95, 4, 30),
(96, 4, 31),
(97, 5, 8),
(98, 5, 9),
(99, 5, 10),
(100, 5, 11),
(101, 5, 12),
(102, 5, 13),
(103, 5, 14),
(104, 5, 15),
(105, 5, 16),
(106, 5, 17),
(107, 5, 18),
(108, 5, 19),
(109, 5, 20),
(110, 5, 21),
(111, 5, 22),
(112, 5, 23),
(113, 5, 24),
(114, 5, 25),
(115, 5, 26),
(116, 5, 27),
(117, 5, 28),
(118, 5, 29),
(119, 5, 30),
(120, 5, 31),
(121, 6, 8),
(122, 6, 9),
(123, 6, 10),
(124, 6, 11),
(125, 6, 12),
(126, 6, 13),
(127, 6, 14),
(128, 6, 15),
(129, 6, 16),
(130, 6, 17),
(131, 6, 18),
(132, 6, 19),
(133, 6, 20),
(134, 6, 21),
(135, 6, 22),
(136, 6, 23),
(137, 6, 24),
(138, 6, 25),
(139, 6, 26),
(140, 6, 27),
(141, 6, 28),
(142, 6, 29),
(143, 6, 30),
(144, 6, 31),
(145, 7, 8),
(146, 7, 9),
(147, 7, 10),
(148, 7, 11),
(149, 7, 12),
(150, 7, 13),
(151, 7, 14),
(152, 7, 15),
(153, 7, 16),
(154, 7, 17),
(155, 7, 18),
(156, 7, 19),
(157, 7, 20),
(158, 7, 21),
(159, 7, 22),
(160, 7, 23),
(161, 7, 24),
(162, 7, 25),
(163, 7, 26),
(164, 7, 27),
(165, 7, 28),
(166, 7, 29),
(167, 7, 30),
(168, 7, 31),
(169, 8, 8),
(170, 8, 9),
(171, 8, 10),
(172, 8, 11),
(173, 8, 12),
(174, 8, 13),
(175, 8, 14),
(176, 8, 15),
(177, 8, 16),
(178, 8, 17),
(179, 8, 18),
(180, 8, 19),
(181, 8, 20),
(182, 8, 21),
(183, 8, 22),
(184, 8, 23),
(185, 8, 24),
(186, 8, 25),
(187, 8, 26),
(188, 8, 27),
(189, 8, 28),
(190, 8, 29),
(191, 8, 30),
(192, 8, 31),
(193, 9, 8),
(194, 9, 9),
(195, 9, 10),
(196, 9, 11),
(197, 9, 12),
(198, 9, 13),
(199, 9, 14),
(200, 9, 15),
(201, 9, 16),
(202, 9, 17),
(203, 9, 18),
(204, 9, 19),
(205, 9, 20),
(206, 9, 21),
(207, 9, 22),
(208, 9, 23),
(209, 9, 24),
(210, 9, 25),
(211, 9, 26),
(212, 9, 27),
(213, 9, 28),
(214, 9, 29),
(215, 9, 30),
(216, 9, 31),
(217, 10, 8),
(218, 10, 9),
(219, 10, 10),
(220, 10, 11),
(221, 10, 12),
(222, 10, 13),
(223, 10, 14),
(224, 10, 15),
(225, 10, 16),
(226, 10, 17),
(227, 10, 18),
(228, 10, 19),
(229, 10, 20),
(230, 10, 21),
(231, 10, 22),
(232, 10, 23),
(233, 10, 24),
(234, 10, 25),
(235, 10, 26),
(236, 10, 27),
(237, 10, 28),
(238, 10, 29),
(239, 10, 30),
(240, 10, 31);

-- --------------------------------------------------------

--
-- Table structure for table `Usuario`
--

CREATE TABLE `Usuario` (
  `nombre_usuario` varchar(130) DEFAULT NULL,
  `email_usuario` varchar(130) NOT NULL,
  `contraseña_usuario` varchar(130) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Usuario`
--

INSERT INTO `Usuario` (`nombre_usuario`, `email_usuario`, `contraseña_usuario`) VALUES
('Arturo Zapata', 'Artu_Z@outlook.com', 'r2-d2'),
('Camila Pérez Hernandez', 'CamilaPH@gmail.com', '</3'),
('Daniel', 'Daniel@hotmail.com', '1234'),
('Edgar Millares', 'Edgar_Millares@hotmail.com', 'papa-de-adri.3'),
('Yaneli Leyva', 'Eleyva_x@gmail.com', 'corazonRoto;('),
('Emily Aguirre', 'EmilyA@gmail.com', 'OdioaEddie04'),
('Frederico Zuñiga', 'Fede@gmail.com', 'fede442'),
('Fernando Calzada', 'Fer_Calzada@outlook.com', 'ferchisxxx2'),
('Francisco Forno', 'Franchesco_Forno@yahoo.com', '32100213'),
('Juan Sins', 'JC@yahoo.com', 'XXXjcp69xd'),
('Jordi Resendiz', 'Jordi_Wild@hotmail.com', 'dickBoy111'),
('Jorge Ramirez', 'Jorge_Ramirez@outlook.com', 'amoAPau1'),
('Julio Lopez', 'julius@gmail.com', 'juli69xd'),
('Lorena Rhoades', 'lore_rhoades@gmail.com', 'lr123x'),
('Luis Ramírez', 'luisRa@gmail.com', 'luigi123'),
('María José del Aguila', 'MJdelA@outlook.com', 'majo64'),
('Paulina Rubio', 'PauRubio@gmail.com', 'gatito47'),
('Paola Cuellar', 'pc@hotmail.com', 'pcueall'),
('Ricardo Valdes', 'RicardoV@yahoo.com', 'Xae43'),
('Sergio García', 'Serch_g@outlook.com', 'sghme321-//123()x');

-- --------------------------------------------------------

--
-- Table structure for table `Usuario_Proyecto`
--

CREATE TABLE `Usuario_Proyecto` (
  `id_usuarioProyecto` int(11) NOT NULL,
  `email_usuario` varchar(130) DEFAULT NULL,
  `id_proyecto` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Usuario_Proyecto`
--

INSERT INTO `Usuario_Proyecto` (`id_usuarioProyecto`, `email_usuario`, `id_proyecto`) VALUES
(1, 'Artu_Z@outlook.com', 1),
(2, 'CamilaPH@gmail.com', 1),
(3, 'Daniel@hotmail.com', 1),
(4, 'Edgar_Millares@hotmail.com', 1),
(5, 'Eleyva_x@gmail.com', 1),
(6, 'EmilyA@gmail.com', 1),
(7, 'Fede@gmail.com', 1),
(8, 'Fer_Calzada@outlook.com', 1),
(9, 'Franchesco_Forno@yahoo.com', 1),
(10, 'JC@yahoo.com', 1),
(11, 'Jordi_Wild@hotmail.com', 1),
(12, 'Jorge_Ramirez@outlook.com', 1),
(13, 'julius@gmail.com', 1),
(14, 'lore_rhoades@gmail.com', 1),
(15, 'luisRa@gmail.com', 1),
(16, 'MJdelA@outlook.com', 1),
(17, 'PauRubio@gmail.com', 1),
(18, 'pc@hotmail.com', 1),
(19, 'RicardoV@yahoo.com', 1),
(20, 'Serch_g@outlook.com', 1),
(21, 'Artu_Z@outlook.com', 2),
(22, 'CamilaPH@gmail.com', 2),
(23, 'Daniel@hotmail.com', 2),
(24, 'Edgar_Millares@hotmail.com', 2),
(25, 'Eleyva_x@gmail.com', 2),
(26, 'EmilyA@gmail.com', 2),
(27, 'Fede@gmail.com', 2),
(28, 'Fer_Calzada@outlook.com', 2),
(29, 'Franchesco_Forno@yahoo.com', 2),
(30, 'JC@yahoo.com', 2),
(31, 'Jordi_Wild@hotmail.com', 2),
(32, 'Jorge_Ramirez@outlook.com', 2),
(33, 'julius@gmail.com', 2),
(34, 'lore_rhoades@gmail.com', 2),
(35, 'luisRa@gmail.com', 2),
(36, 'MJdelA@outlook.com', 2),
(37, 'PauRubio@gmail.com', 2),
(38, 'pc@hotmail.com', 2),
(39, 'RicardoV@yahoo.com', 2),
(40, 'Serch_g@outlook.com', 2),
(41, 'Artu_Z@outlook.com', 3),
(42, 'CamilaPH@gmail.com', 3),
(43, 'Daniel@hotmail.com', 3),
(44, 'Edgar_Millares@hotmail.com', 3),
(45, 'Eleyva_x@gmail.com', 3),
(46, 'EmilyA@gmail.com', 3),
(47, 'Fede@gmail.com', 3),
(48, 'Fer_Calzada@outlook.com', 3),
(49, 'Franchesco_Forno@yahoo.com', 3),
(50, 'JC@yahoo.com', 3),
(51, 'Jordi_Wild@hotmail.com', 3),
(52, 'Jorge_Ramirez@outlook.com', 3),
(53, 'julius@gmail.com', 3),
(54, 'lore_rhoades@gmail.com', 3),
(55, 'luisRa@gmail.com', 3),
(56, 'MJdelA@outlook.com', 3),
(57, 'PauRubio@gmail.com', 3),
(58, 'pc@hotmail.com', 3),
(59, 'RicardoV@yahoo.com', 3),
(60, 'Serch_g@outlook.com', 3),
(61, 'Artu_Z@outlook.com', 4),
(62, 'CamilaPH@gmail.com', 4),
(63, 'Daniel@hotmail.com', 4),
(64, 'Edgar_Millares@hotmail.com', 4),
(65, 'Eleyva_x@gmail.com', 4),
(66, 'EmilyA@gmail.com', 4),
(67, 'Fede@gmail.com', 4),
(68, 'Fer_Calzada@outlook.com', 4),
(69, 'Franchesco_Forno@yahoo.com', 4),
(70, 'JC@yahoo.com', 4),
(71, 'Jordi_Wild@hotmail.com', 4),
(72, 'Jorge_Ramirez@outlook.com', 4),
(73, 'julius@gmail.com', 4),
(74, 'lore_rhoades@gmail.com', 4),
(75, 'luisRa@gmail.com', 4),
(76, 'MJdelA@outlook.com', 4),
(77, 'PauRubio@gmail.com', 4),
(78, 'pc@hotmail.com', 4),
(79, 'RicardoV@yahoo.com', 4),
(80, 'Serch_g@outlook.com', 4),
(81, 'Artu_Z@outlook.com', 5),
(82, 'CamilaPH@gmail.com', 5),
(83, 'Daniel@hotmail.com', 5),
(84, 'Edgar_Millares@hotmail.com', 5),
(85, 'Eleyva_x@gmail.com', 5),
(86, 'EmilyA@gmail.com', 5),
(87, 'Fede@gmail.com', 5),
(88, 'Fer_Calzada@outlook.com', 5),
(89, 'Franchesco_Forno@yahoo.com', 5),
(90, 'JC@yahoo.com', 5),
(91, 'Jordi_Wild@hotmail.com', 5),
(92, 'Jorge_Ramirez@outlook.com', 5),
(93, 'julius@gmail.com', 5),
(94, 'lore_rhoades@gmail.com', 5),
(95, 'luisRa@gmail.com', 5),
(96, 'MJdelA@outlook.com', 5),
(97, 'PauRubio@gmail.com', 5),
(98, 'pc@hotmail.com', 5),
(99, 'RicardoV@yahoo.com', 5),
(100, 'Serch_g@outlook.com', 5),
(101, 'Artu_Z@outlook.com', 6),
(102, 'CamilaPH@gmail.com', 6),
(103, 'Daniel@hotmail.com', 6),
(104, 'Edgar_Millares@hotmail.com', 6),
(105, 'Eleyva_x@gmail.com', 6),
(106, 'EmilyA@gmail.com', 6),
(107, 'Fede@gmail.com', 6),
(108, 'Fer_Calzada@outlook.com', 6),
(109, 'Franchesco_Forno@yahoo.com', 6),
(110, 'JC@yahoo.com', 6),
(111, 'Jordi_Wild@hotmail.com', 6),
(112, 'Jorge_Ramirez@outlook.com', 6),
(113, 'julius@gmail.com', 6),
(114, 'lore_rhoades@gmail.com', 6),
(115, 'luisRa@gmail.com', 6),
(116, 'MJdelA@outlook.com', 6),
(117, 'PauRubio@gmail.com', 6),
(118, 'pc@hotmail.com', 6),
(119, 'RicardoV@yahoo.com', 6),
(120, 'Serch_g@outlook.com', 6),
(121, 'Artu_Z@outlook.com', 7),
(122, 'CamilaPH@gmail.com', 7),
(123, 'Daniel@hotmail.com', 7),
(124, 'Edgar_Millares@hotmail.com', 7),
(125, 'Eleyva_x@gmail.com', 7),
(126, 'EmilyA@gmail.com', 7),
(127, 'Fede@gmail.com', 7),
(128, 'Fer_Calzada@outlook.com', 7),
(129, 'Franchesco_Forno@yahoo.com', 7),
(130, 'JC@yahoo.com', 7),
(131, 'Jordi_Wild@hotmail.com', 7),
(132, 'Jorge_Ramirez@outlook.com', 7),
(133, 'julius@gmail.com', 7),
(134, 'lore_rhoades@gmail.com', 7),
(135, 'luisRa@gmail.com', 7),
(136, 'MJdelA@outlook.com', 7),
(137, 'PauRubio@gmail.com', 7),
(138, 'pc@hotmail.com', 7),
(139, 'RicardoV@yahoo.com', 7),
(140, 'Serch_g@outlook.com', 7),
(141, 'Artu_Z@outlook.com', 8),
(142, 'CamilaPH@gmail.com', 8),
(143, 'Daniel@hotmail.com', 8),
(144, 'Edgar_Millares@hotmail.com', 8),
(145, 'Eleyva_x@gmail.com', 8),
(146, 'EmilyA@gmail.com', 8),
(147, 'Fede@gmail.com', 8),
(148, 'Fer_Calzada@outlook.com', 8),
(149, 'Franchesco_Forno@yahoo.com', 8),
(150, 'JC@yahoo.com', 8),
(151, 'Jordi_Wild@hotmail.com', 8),
(152, 'Jorge_Ramirez@outlook.com', 8),
(153, 'julius@gmail.com', 8),
(154, 'lore_rhoades@gmail.com', 8),
(155, 'luisRa@gmail.com', 8),
(156, 'MJdelA@outlook.com', 8),
(157, 'PauRubio@gmail.com', 8),
(158, 'pc@hotmail.com', 8),
(159, 'RicardoV@yahoo.com', 8),
(160, 'Serch_g@outlook.com', 8),
(161, 'Artu_Z@outlook.com', 9),
(162, 'CamilaPH@gmail.com', 9),
(163, 'Daniel@hotmail.com', 9),
(164, 'Edgar_Millares@hotmail.com', 9),
(165, 'Eleyva_x@gmail.com', 9),
(166, 'EmilyA@gmail.com', 9),
(167, 'Fede@gmail.com', 9),
(168, 'Fer_Calzada@outlook.com', 9),
(169, 'Franchesco_Forno@yahoo.com', 9),
(170, 'JC@yahoo.com', 9),
(171, 'Jordi_Wild@hotmail.com', 9),
(172, 'Jorge_Ramirez@outlook.com', 9),
(173, 'julius@gmail.com', 9),
(174, 'lore_rhoades@gmail.com', 9),
(175, 'luisRa@gmail.com', 9),
(176, 'MJdelA@outlook.com', 9),
(177, 'PauRubio@gmail.com', 9),
(178, 'pc@hotmail.com', 9),
(179, 'RicardoV@yahoo.com', 9),
(180, 'Serch_g@outlook.com', 9),
(181, 'Artu_Z@outlook.com', 10),
(182, 'CamilaPH@gmail.com', 10),
(183, 'Daniel@hotmail.com', 10),
(184, 'Edgar_Millares@hotmail.com', 10),
(185, 'Eleyva_x@gmail.com', 10),
(186, 'EmilyA@gmail.com', 10),
(187, 'Fede@gmail.com', 10),
(188, 'Fer_Calzada@outlook.com', 10),
(189, 'Franchesco_Forno@yahoo.com', 10),
(190, 'JC@yahoo.com', 10),
(191, 'Jordi_Wild@hotmail.com', 10),
(192, 'Jorge_Ramirez@outlook.com', 10),
(193, 'julius@gmail.com', 10),
(194, 'lore_rhoades@gmail.com', 10),
(195, 'luisRa@gmail.com', 10),
(196, 'MJdelA@outlook.com', 10),
(197, 'PauRubio@gmail.com', 10),
(198, 'pc@hotmail.com', 10),
(199, 'RicardoV@yahoo.com', 10),
(200, 'Serch_g@outlook.com', 10);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `CasoUso`
--
ALTER TABLE `CasoUso`
  ADD PRIMARY KEY (`id_casoUso`),
  ADD KEY `id_proyecto` (`id_proyecto`);

--
-- Indexes for table `Categoria`
--
ALTER TABLE `Categoria`
  ADD PRIMARY KEY (`id_categoria`);

--
-- Indexes for table `Complejidad`
--
ALTER TABLE `Complejidad`
  ADD PRIMARY KEY (`id_complejidad`);

--
-- Indexes for table `Proyecto`
--
ALTER TABLE `Proyecto`
  ADD PRIMARY KEY (`id_proyecto`);

--
-- Indexes for table `PuntosAgiles`
--
ALTER TABLE `PuntosAgiles`
  ADD PRIMARY KEY (`id_puntosAgiles`),
  ADD KEY `id_proyecto` (`id_proyecto`),
  ADD KEY `email_usuario` (`email_usuario`),
  ADD KEY `id_tareaComplejidad` (`id_tareaComplejidad`);

--
-- Indexes for table `Rol`
--
ALTER TABLE `Rol`
  ADD PRIMARY KEY (`id_rol`);

--
-- Indexes for table `RolProyecto_Usuario`
--
ALTER TABLE `RolProyecto_Usuario`
  ADD PRIMARY KEY (`id_rolProyectoUsuario`),
  ADD KEY `id_rolProyecto` (`id_rolProyecto`),
  ADD KEY `email_usuario` (`email_usuario`);

--
-- Indexes for table `Rol_Proyecto`
--
ALTER TABLE `Rol_Proyecto`
  ADD PRIMARY KEY (`id_rolProyecto`),
  ADD KEY `Rol_Proyecto_ibfk_1` (`id_proyecto`),
  ADD KEY `Rol_Proyecto_ibfk_2` (`id_rol`);

--
-- Indexes for table `Tarea`
--
ALTER TABLE `Tarea`
  ADD PRIMARY KEY (`id_tarea`),
  ADD KEY `Tarea_ibfk_1` (`id_categoria`);

--
-- Indexes for table `Tarea_Complejidad`
--
ALTER TABLE `Tarea_Complejidad`
  ADD PRIMARY KEY (`id_tareaComplejidad`),
  ADD KEY `Tarea_Complejidad_ibfk_1` (`id_tarea`),
  ADD KEY `Tarea_Complejidad_ibfk_2` (`id_complejidad`);

--
-- Indexes for table `Usuario`
--
ALTER TABLE `Usuario`
  ADD PRIMARY KEY (`email_usuario`);

--
-- Indexes for table `Usuario_Proyecto`
--
ALTER TABLE `Usuario_Proyecto`
  ADD PRIMARY KEY (`id_usuarioProyecto`),
  ADD KEY `email_usuario` (`email_usuario`),
  ADD KEY `id_proyecto` (`id_proyecto`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `CasoUso`
--
ALTER TABLE `CasoUso`
  MODIFY `id_casoUso` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=81;

--
-- AUTO_INCREMENT for table `Categoria`
--
ALTER TABLE `Categoria`
  MODIFY `id_categoria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `Complejidad`
--
ALTER TABLE `Complejidad`
  MODIFY `id_complejidad` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `Proyecto`
--
ALTER TABLE `Proyecto`
  MODIFY `id_proyecto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `PuntosAgiles`
--
ALTER TABLE `PuntosAgiles`
  MODIFY `id_puntosAgiles` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=301;

--
-- AUTO_INCREMENT for table `Rol`
--
ALTER TABLE `Rol`
  MODIFY `id_rol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `RolProyecto_Usuario`
--
ALTER TABLE `RolProyecto_Usuario`
  MODIFY `id_rolProyectoUsuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1388;

--
-- AUTO_INCREMENT for table `Rol_Proyecto`
--
ALTER TABLE `Rol_Proyecto`
  MODIFY `id_rolProyecto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=101;

--
-- AUTO_INCREMENT for table `Tarea`
--
ALTER TABLE `Tarea`
  MODIFY `id_tarea` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `Tarea_Complejidad`
--
ALTER TABLE `Tarea_Complejidad`
  MODIFY `id_tareaComplejidad` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=241;

--
-- AUTO_INCREMENT for table `Usuario_Proyecto`
--
ALTER TABLE `Usuario_Proyecto`
  MODIFY `id_usuarioProyecto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=201;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `CasoUso`
--
ALTER TABLE `CasoUso`
  ADD CONSTRAINT `CasoUso_ibfk_1` FOREIGN KEY (`id_proyecto`) REFERENCES `Proyecto` (`id_proyecto`);

--
-- Constraints for table `PuntosAgiles`
--
ALTER TABLE `PuntosAgiles`
  ADD CONSTRAINT `PuntosAgiles_ibfk_1` FOREIGN KEY (`id_proyecto`) REFERENCES `Proyecto` (`id_proyecto`),
  ADD CONSTRAINT `PuntosAgiles_ibfk_2` FOREIGN KEY (`email_usuario`) REFERENCES `Usuario` (`email_usuario`),
  ADD CONSTRAINT `PuntosAgiles_ibfk_3` FOREIGN KEY (`id_tareaComplejidad`) REFERENCES `Tarea_Complejidad` (`id_tareaComplejidad`);

--
-- Constraints for table `RolProyecto_Usuario`
--
ALTER TABLE `RolProyecto_Usuario`
  ADD CONSTRAINT `RolProyecto_Usuario_ibfk_1` FOREIGN KEY (`id_rolProyecto`) REFERENCES `Rol_Proyecto` (`id_rolProyecto`),
  ADD CONSTRAINT `RolProyecto_Usuario_ibfk_2` FOREIGN KEY (`email_usuario`) REFERENCES `Usuario` (`email_usuario`);

--
-- Constraints for table `Rol_Proyecto`
--
ALTER TABLE `Rol_Proyecto`
  ADD CONSTRAINT `Rol_Proyecto_ibfk_1` FOREIGN KEY (`id_proyecto`) REFERENCES `Proyecto` (`id_proyecto`) ON DELETE CASCADE,
  ADD CONSTRAINT `Rol_Proyecto_ibfk_2` FOREIGN KEY (`id_rol`) REFERENCES `Rol` (`id_rol`) ON DELETE CASCADE;

--
-- Constraints for table `Tarea`
--
ALTER TABLE `Tarea`
  ADD CONSTRAINT `Tarea_ibfk_1` FOREIGN KEY (`id_categoria`) REFERENCES `Categoria` (`id_categoria`) ON DELETE SET NULL;

--
-- Constraints for table `Tarea_Complejidad`
--
ALTER TABLE `Tarea_Complejidad`
  ADD CONSTRAINT `Tarea_Complejidad_ibfk_1` FOREIGN KEY (`id_tarea`) REFERENCES `Tarea` (`id_tarea`) ON DELETE CASCADE,
  ADD CONSTRAINT `Tarea_Complejidad_ibfk_2` FOREIGN KEY (`id_complejidad`) REFERENCES `Complejidad` (`id_complejidad`) ON DELETE CASCADE;

--
-- Constraints for table `Usuario_Proyecto`
--
ALTER TABLE `Usuario_Proyecto`
  ADD CONSTRAINT `Usuario_Proyecto_ibfk_1` FOREIGN KEY (`email_usuario`) REFERENCES `Usuario` (`email_usuario`),
  ADD CONSTRAINT `Usuario_Proyecto_ibfk_2` FOREIGN KEY (`id_proyecto`) REFERENCES `Proyecto` (`id_proyecto`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
