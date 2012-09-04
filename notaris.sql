-- phpMyAdmin SQL Dump
-- version 3.3.9
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Sep 04, 2012 at 09:45 AM
-- Server version: 5.5.8
-- PHP Version: 5.3.5

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `notaris`
--

-- --------------------------------------------------------

--
-- Table structure for table `grouppemohon`
--

CREATE TABLE IF NOT EXISTS `grouppemohon` (
  `idgrouppemohon` int(11) NOT NULL AUTO_INCREMENT,
  `nmgrouppemohon` varchar(30) NOT NULL,
  `pbgrouppemohon` tinyint(4) NOT NULL,
  PRIMARY KEY (`idgrouppemohon`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `grouppemohon`
--

INSERT INTO `grouppemohon` (`idgrouppemohon`, `nmgrouppemohon`, `pbgrouppemohon`) VALUES
(4, 'UNY', 1);

-- --------------------------------------------------------

--
-- Table structure for table `grouptransaksi`
--

CREATE TABLE IF NOT EXISTS `grouptransaksi` (
  `idgrouptr` int(11) NOT NULL AUTO_INCREMENT,
  `nmgrouptr` varchar(30) NOT NULL,
  `pbgrouptr` tinyint(4) NOT NULL,
  PRIMARY KEY (`idgrouptr`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `grouptransaksi`
--

INSERT INTO `grouptransaksi` (`idgrouptr`, `nmgrouptr`, `pbgrouptr`) VALUES
(2, 'Vidusia', 1);

-- --------------------------------------------------------

--
-- Table structure for table `notifikasi`
--

CREATE TABLE IF NOT EXISTS `notifikasi` (
  `idnotifikasi` int(11) NOT NULL AUTO_INCREMENT,
  `konfigurasi` int(11) NOT NULL,
  PRIMARY KEY (`idnotifikasi`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=11 ;

--
-- Dumping data for table `notifikasi`
--

INSERT INTO `notifikasi` (`idnotifikasi`, `konfigurasi`) VALUES
(1, 3),
(7, 4),
(8, 15),
(9, 3),
(10, 9);

-- --------------------------------------------------------

--
-- Table structure for table `pemohon`
--

CREATE TABLE IF NOT EXISTS `pemohon` (
  `idpemohon` int(11) NOT NULL AUTO_INCREMENT,
  `idgrouppemohon` int(11) NOT NULL,
  `tgldaftarpemohon` date NOT NULL,
  `infopemohon` text NOT NULL,
  `pbpemohon` tinyint(4) NOT NULL,
  PRIMARY KEY (`idpemohon`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=43 ;

--
-- Dumping data for table `pemohon`
--

INSERT INTO `pemohon` (`idpemohon`, `idgrouppemohon`, `tgldaftarpemohon`, `infopemohon`, `pbpemohon`) VALUES
(35, 4, '0000-00-00', '{"noktp":"123456789","nama":"Test","tempat":"Bantul","tglahir":"6-05-1992","alamat":"Bantul","agama":"Islam","pekerjaan":"Programmer","notelp":"085729764034","tgldaftar":"2012-08-28"}', 0),
(41, 4, '0000-00-00', '{"noktp":"343543","nama":"gdfgfd","tempat":"fgfd","tglahir":"fgfd","alamat":"fdgdf","agama":"fgdf","pekerjaan":"fdgdf","notelp":"fgfdg","tgldaftar":"2012-09-02"}', 0),
(42, 4, '0000-00-00', '{"noktp":"123","nama":"","tempat":"","tglahir":"","alamat":"","agama":"","pekerjaan":"","notelp":"","tgldaftar":"2012-09-03"}', 0);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_index`
--

CREATE TABLE IF NOT EXISTS `tbl_index` (
  `tipe` varchar(20) NOT NULL,
  `id` int(11) NOT NULL,
  `kode` varchar(20) NOT NULL,
  `isi` varchar(200) NOT NULL,
  KEY `id` (`id`),
  KEY `kode` (`kode`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_index`
--

INSERT INTO `tbl_index` (`tipe`, `id`, `kode`, `isi`) VALUES
('pemohon', 26, 'tempat', 'dfgfdgdf'),
('pemohon', 27, 'nama', 'po'),
('pemohon', 27, 'alamat', 'op'),
('pemohon', 28, 'nama', 'popo'),
('pemohon', 29, 'noktp', ''),
('pemohon', 29, 'nama', 'test'),
('pemohon', 29, 'alamat', 'dgfgfdgd'),
('pemohon', 29, 'tempat', 'gfgf'),
('pemohon', 29, 'tglahir', ''),
('pemohon', 29, 'agama', 'dfdsgg'),
('pemohon', 29, 'pekerjaan', 'fgfdgf'),
('pemohon', 29, 'notelp', ''),
('pemohon', 35, 'noktp', '123456789'),
('pemohon', 35, 'nama', 'Test'),
('pemohon', 35, 'alamat', 'Bantul'),
('pemohon', 35, 'tempat', 'Bantul'),
('pemohon', 35, 'tglahir', '6-05-1992'),
('pemohon', 35, 'agama', 'Islam'),
('pemohon', 35, 'pekerjaan', 'Programmer'),
('pemohon', 35, 'notelp', '085729764034'),
('pemohon', 39, 'noktp', 'defsdf'),
('pemohon', 39, 'nama', ''),
('pemohon', 39, 'alamat', ''),
('pemohon', 39, 'tempat', ''),
('pemohon', 39, 'tglahir', ''),
('pemohon', 39, 'agama', ''),
('pemohon', 39, 'pekerjaan', ''),
('pemohon', 39, 'notelp', ''),
('pemohon', 41, 'noktp', '343543'),
('pemohon', 41, 'nama', 'gdfgfd'),
('pemohon', 41, 'alamat', 'fdgdf'),
('pemohon', 41, 'tempat', 'fgfd'),
('pemohon', 41, 'tglahir', 'fgfd'),
('pemohon', 41, 'agama', 'fgdf'),
('pemohon', 41, 'pekerjaan', 'fdgdf'),
('pemohon', 41, 'notelp', 'fgfdg'),
('pemohon', 42, 'noktp', '123'),
('pemohon', 42, 'nama', ''),
('pemohon', 42, 'alamat', ''),
('pemohon', 42, 'tempat', ''),
('pemohon', 42, 'tglahir', ''),
('pemohon', 42, 'agama', ''),
('pemohon', 42, 'pekerjaan', ''),
('pemohon', 42, 'notelp', '');

-- --------------------------------------------------------

--
-- Table structure for table `transaksi`
--

CREATE TABLE IF NOT EXISTS `transaksi` (
  `idtransaksi` int(11) NOT NULL AUTO_INCREMENT,
  `tglmasuk` date NOT NULL,
  `idpemohon` int(11) NOT NULL,
  `idgrouptr` int(11) NOT NULL,
  `judul` varchar(30) NOT NULL,
  `jmlberkas` int(11) NOT NULL,
  `status` tinyint(4) NOT NULL,
  `jmlberkasselesai` int(11) NOT NULL,
  `harga` int(11) NOT NULL,
  `sudahbayar` int(11) NOT NULL,
  `tglselesai` date NOT NULL,
  PRIMARY KEY (`idtransaksi`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `transaksi`
--

INSERT INTO `transaksi` (`idtransaksi`, `tglmasuk`, `idpemohon`, `idgrouptr`, `judul`, `jmlberkas`, `status`, `jmlberkasselesai`, `harga`, `sudahbayar`, `tglselesai`) VALUES
(1, '2012-08-09', 35, 2, 'dfdsfds', 0, 0, 0, 0, 0, '2012-08-09');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `username` varchar(20) NOT NULL,
  `password` varchar(50) NOT NULL,
  `akses` varchar(20) NOT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`username`, `password`, `akses`) VALUES
('admin', 'admin', 'admin');
