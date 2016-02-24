-- phpMyAdmin SQL Dump
-- version 4.2.7.1
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 22-02-2016 a las 11:20:59
-- Versión del servidor: 5.5.39
-- Versión de PHP: 5.4.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `practica_clientes`
--
CREATE DATABASE IF NOT EXISTS `practica_clientes` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `practica_clientes`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `academia`
--

DROP TABLE IF EXISTS `academia`;
CREATE TABLE IF NOT EXISTS `academia` (
`id` int(11) NOT NULL,
  `nombre` varchar(20) NOT NULL,
  `direccion` varchar(50) NOT NULL,
  `codigo_postal` int(5) NOT NULL,
  `telefono` int(9) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alumnos`
--

DROP TABLE IF EXISTS `alumnos`;
CREATE TABLE IF NOT EXISTS `alumnos` (
  `dni` varchar(9) NOT NULL DEFAULT '',
  `nombre` varchar(20) DEFAULT NULL,
  `apellidos` varchar(30) DEFAULT NULL,
  `telefono` int(9) NOT NULL,
  `correo` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `idiomas`
--

DROP TABLE IF EXISTS `idiomas`;
CREATE TABLE IF NOT EXISTS `idiomas` (
`id` int(11) NOT NULL,
  `nombre` varchar(10) DEFAULT NULL,
  `libro` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `matriculas`
--

DROP TABLE IF EXISTS `matriculas`;
CREATE TABLE IF NOT EXISTS `matriculas` (
`id` int(11) NOT NULL,
  `fecha` date DEFAULT NULL,
  `dni_alumno` varchar(9) DEFAULT NULL,
  `dni_profesor` varchar(9) DEFAULT NULL,
  `id_idioma` int(11) DEFAULT NULL,
  `id_academia` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `profesor`
--

DROP TABLE IF EXISTS `profesor`;
CREATE TABLE IF NOT EXISTS `profesor` (
  `dni` varchar(9) NOT NULL DEFAULT '',
  `nombre` varchar(20) DEFAULT NULL,
  `apellidos` varchar(30) DEFAULT NULL,
  `telefono` int(9) NOT NULL,
  `correo` varchar(30) NOT NULL,
  `id_academia` int(11) DEFAULT NULL,
  `id_idioma` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `academia`
--
ALTER TABLE `academia`
 ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `alumnos`
--
ALTER TABLE `alumnos`
 ADD PRIMARY KEY (`dni`);

--
-- Indices de la tabla `idiomas`
--
ALTER TABLE `idiomas`
 ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `matriculas`
--
ALTER TABLE `matriculas`
 ADD PRIMARY KEY (`id`), ADD KEY `fk_dni_alumno_matri` (`dni_alumno`), ADD KEY `fk_dni_prof_matri` (`dni_profesor`), ADD KEY `fk_id_academia_matri` (`id_academia`), ADD KEY `fk_id_idioma_matri` (`id_idioma`);

--
-- Indices de la tabla `profesor`
--
ALTER TABLE `profesor`
 ADD PRIMARY KEY (`dni`), ADD KEY `fk_id_academia` (`id_academia`), ADD KEY `fk_id_idioma` (`id_idioma`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `academia`
--
ALTER TABLE `academia`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `idiomas`
--
ALTER TABLE `idiomas`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `matriculas`
--
ALTER TABLE `matriculas`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `matriculas`
--
ALTER TABLE `matriculas`
ADD CONSTRAINT `fk_dni_alumno_matri` FOREIGN KEY (`dni_alumno`) REFERENCES `alumnos` (`dni`),
ADD CONSTRAINT `fk_dni_prof_matri` FOREIGN KEY (`dni_profesor`) REFERENCES `profesor` (`dni`),
ADD CONSTRAINT `fk_id_academia_matri` FOREIGN KEY (`id_academia`) REFERENCES `academia` (`id`),
ADD CONSTRAINT `fk_id_idioma_matri` FOREIGN KEY (`id_idioma`) REFERENCES `idiomas` (`id`);

--
-- Filtros para la tabla `profesor`
--
ALTER TABLE `profesor`
ADD CONSTRAINT `fk_id_academia` FOREIGN KEY (`id_academia`) REFERENCES `academia` (`id`),
ADD CONSTRAINT `fk_id_idioma` FOREIGN KEY (`id_idioma`) REFERENCES `idiomas` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
