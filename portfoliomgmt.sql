-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 08, 2022 at 09:22 AM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 7.4.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `portfoliomgmt`
--

-- --------------------------------------------------------

--
-- Table structure for table `stock_details`
--

CREATE TABLE `stock_details` (
  `id` int(11) NOT NULL,
  `stockName` varchar(100) NOT NULL,
  `transcType` varchar(4) NOT NULL,
  `quantity` varchar(255) NOT NULL,
  `amount` varchar(255) NOT NULL,
  `transacDate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `stock_details`
--

INSERT INTO `stock_details` (`id`, `stockName`, `transcType`, `quantity`, `amount`, `transacDate`) VALUES
(1, 'SBI', 'Buy', '100', '10', '2022-06-01'),
(2, 'SBI', 'Buy', '10', '9', '2022-06-09'),
(3, 'SBI', 'Sell', '80', '11', '2022-06-14'),
(4, 'RBB', 'Buy', '100', '10', '2022-06-29'),
(5, 'SBI', 'Sell', '4', '15', '2022-07-02'),
(6, 'SBI', 'Buy', '10', '111', '2022-06-01');

-- --------------------------------------------------------

--
-- Table structure for table `stock_symbols`
--

CREATE TABLE `stock_symbols` (
  `id` int(11) NOT NULL,
  `stockName` varchar(255) NOT NULL,
  `stockSymbol` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `stock_symbols`
--

INSERT INTO `stock_symbols` (`id`, `stockName`, `stockSymbol`) VALUES
(1, 'Nepal SBI Bank', 'SBI'),
(2, 'Rastriya Banijya Bank Limited', 'RBB'),
(3, 'NIC ASIA Bank', 'NIC');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `stock_details`
--
ALTER TABLE `stock_details`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `stock_symbols`
--
ALTER TABLE `stock_symbols`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `stock_details`
--
ALTER TABLE `stock_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `stock_symbols`
--
ALTER TABLE `stock_symbols`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
