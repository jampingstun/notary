-- phpMyAdmin SQL Dump
-- version 3.4.5
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Sep 06, 2012 at 10:22 AM
-- Server version: 5.5.16
-- PHP Version: 5.3.8

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=10 ;

--
-- Dumping data for table `grouppemohon`
--

INSERT INTO `grouppemohon` (`idgrouppemohon`, `nmgrouppemohon`, `pbgrouppemohon`) VALUES
(7, 'Bank', 1),
(8, 'Individu', 1),
(9, 'none', 0);

-- --------------------------------------------------------

--
-- Table structure for table `grouptransaksi`
--

CREATE TABLE IF NOT EXISTS `grouptransaksi` (
  `idgrouptr` int(11) NOT NULL AUTO_INCREMENT,
  `nmgrouptr` varchar(30) NOT NULL,
  `pbgrouptr` tinyint(4) NOT NULL,
  PRIMARY KEY (`idgrouptr`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=16 ;

--
-- Dumping data for table `grouptransaksi`
--

INSERT INTO `grouptransaksi` (`idgrouptr`, `nmgrouptr`, `pbgrouptr`) VALUES
(3, 'Pengajuan PT', 1),
(4, 'Pengajuan CV', 1),
(5, 'Sewa Menyewa', 1),
(6, 'Fidusia', 1),
(7, 'Hak Tanggungan', 1),
(8, 'Balik Nama', 0),
(9, 'Jual Beli', 1),
(10, 'Hibah', 1),
(11, 'Tukar Menukar', 1),
(12, 'Pembagian Hak Bersama', 1),
(13, 'Turun Waris', 1),
(14, 'Pemecahan Sertifikat tanah', 1),
(15, 'Konversi', 1);

-- --------------------------------------------------------

--
-- Table structure for table `notifikasi`
--

CREATE TABLE IF NOT EXISTS `notifikasi` (
  `idnotifikasi` int(11) NOT NULL AUTO_INCREMENT,
  `konfigurasi` int(11) NOT NULL,
  PRIMARY KEY (`idnotifikasi`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=17 ;

--
-- Dumping data for table `notifikasi`
--

INSERT INTO `notifikasi` (`idnotifikasi`, `konfigurasi`) VALUES
(11, 1),
(12, 30),
(13, 1),
(14, 7),
(15, 90),
(16, 30);

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
  PRIMARY KEY (`idpemohon`),
  KEY `idgrouppemohon` (`idgrouppemohon`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=7 ;

--
-- Dumping data for table `pemohon`
--

INSERT INTO `pemohon` (`idpemohon`, `idgrouppemohon`, `tgldaftarpemohon`, `infopemohon`, `pbpemohon`) VALUES
(1, 8, '0000-00-00', '{"noktp":"123456","nama":"contoh 1","tempat":"yogyakarta","tglahir":"31-03-1992","alamat":"yogyakarta","agama":"islam","pekerjaan":"Wirausaha","notelp":"087564555677","tgldaftar":"2012-08-27"}', 0),
(2, 8, '2012-08-22', '{"noktp":"1234567","nama":"joko","tempat":"klaten","tglahir":"31-03-1992","alamat":"klaten","agama":"islam","pekerjaan":"Guru","notelp":"087867878789"}', 1),
(3, 8, '2012-08-28', '{"noktp":"9809809","nama":"Suseno","tempat":"Bantul","tglahir":"1992-02-01","alamat":"Yogyakarta","agama":"Islam","pekerjaan":"Petani","notelp":"09879877666"}', 1),
(4, 7, '2012-09-05', '{"noktp":"123131","nama":"Suranto","tempat":"klaten","tglahir":"1990-01-01","alamat":"klaten","agama":"lain","pekerjaan":"pegawai","notelp":"09878787636"}', 0),
(5, 7, '2012-09-05', '{"noktp":"09788768","nama":"jurt","tempat":"","tglahir":"","alamat":"","agama":"","pekerjaan":"","notelp":""}', 0),
(6, 8, '2012-09-05', '{"noktp":"56436","nama":"gery","tempat":"klaten","tglahir":"31-03-1992","alamat":"klaten","agama":"islam","pekerjaan":"dosen","notelp":"09789675765"}', 0);

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
('pemohon', 1, 'noktp', '123456'),
('pemohon', 1, 'nama', 'contoh 1'),
('pemohon', 1, 'alamat', 'yogyakarta'),
('pemohon', 1, 'tempat', 'yogyakarta'),
('pemohon', 1, 'tglahir', '31-03-1992'),
('pemohon', 1, 'agama', 'islam'),
('pemohon', 1, 'pekerjaan', 'Wirausaha'),
('pemohon', 1, 'notelp', '087564555677'),
('pemohon', 2, 'noktp', '1234567'),
('pemohon', 2, 'nama', 'joko'),
('pemohon', 2, 'alamat', 'klaten'),
('pemohon', 2, 'tempat', 'klaten'),
('pemohon', 2, 'tglahir', '31-03-1992'),
('pemohon', 2, 'agama', 'islam'),
('pemohon', 2, 'pekerjaan', 'Guru'),
('pemohon', 2, 'notelp', '087867878789'),
('pemohon', 3, 'noktp', '9809809'),
('pemohon', 3, 'nama', 'Suseno'),
('pemohon', 3, 'alamat', 'Yogyakarta'),
('pemohon', 3, 'tempat', 'Bantul'),
('pemohon', 3, 'tglahir', '1992-02-01'),
('pemohon', 3, 'agama', 'Islam'),
('pemohon', 3, 'pekerjaan', 'Petani'),
('pemohon', 3, 'notelp', '09879877666'),
('pemohon', 4, 'noktp', '123131'),
('pemohon', 4, 'nama', 'Suranto'),
('pemohon', 4, 'alamat', 'klaten'),
('pemohon', 4, 'tempat', 'klaten'),
('pemohon', 4, 'tglahir', '1990-01-01'),
('pemohon', 4, 'agama', 'lain'),
('pemohon', 4, 'pekerjaan', 'pegawai'),
('pemohon', 4, 'notelp', '09878787636'),
('pemohon', 5, 'noktp', '09788768'),
('pemohon', 5, 'nama', 'jurt'),
('pemohon', 5, 'alamat', ''),
('pemohon', 5, 'tempat', ''),
('pemohon', 5, 'tglahir', ''),
('pemohon', 5, 'agama', ''),
('pemohon', 5, 'pekerjaan', ''),
('pemohon', 5, 'notelp', ''),
('pemohon', 6, 'noktp', '56436'),
('pemohon', 6, 'nama', 'gery'),
('pemohon', 6, 'alamat', 'klaten'),
('pemohon', 6, 'tempat', 'klaten'),
('pemohon', 6, 'tglahir', '31-03-1992'),
('pemohon', 6, 'agama', 'islam'),
('pemohon', 6, 'pekerjaan', 'dosen'),
('pemohon', 6, 'notelp', '09789675765'),
('pemohon', 0, 'noktp', '123131'),
('pemohon', 0, 'nama', 'Suranto'),
('pemohon', 0, 'alamat', 'klaten'),
('pemohon', 0, 'tempat', 'klaten'),
('pemohon', 0, 'tglahir', '1990-01-01'),
('pemohon', 0, 'agama', 'kristen'),
('pemohon', 0, 'pekerjaan', 'pegawai'),
('pemohon', 0, 'notelp', '09878787636');

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
  PRIMARY KEY (`idtransaksi`),
  KEY `id_pemohon` (`idpemohon`),
  KEY `id_grouptr` (`idgrouptr`),
  KEY `id_transaksi` (`idtransaksi`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `transaksi`
--

INSERT INTO `transaksi` (`idtransaksi`, `tglmasuk`, `idpemohon`, `idgrouptr`, `judul`, `jmlberkas`, `status`, `jmlberkasselesai`, `harga`, `sudahbayar`, `tglselesai`) VALUES
(1, '2012-08-27', 1, 4, 'Contoh pengajuan 1', 3, 1, 0, 0, 0, '2012-09-30'),
(2, '2012-09-01', 2, 14, 'Tanah bertuah', 8, 1, 2, 30000000, 0, '2012-11-07'),
(3, '2012-08-26', 2, 3, 'j', 8, 1, 8, 2000000, 1, '2012-08-31');

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

--
-- Constraints for dumped tables
--

--
-- Constraints for table `pemohon`
--
ALTER TABLE `pemohon`
  ADD CONSTRAINT `pemohon_ibfk_1` FOREIGN KEY (`idgrouppemohon`) REFERENCES `grouppemohon` (`idgrouppemohon`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `transaksi`
--
ALTER TABLE `transaksi`
  ADD CONSTRAINT `transaksi_ibfk_1` FOREIGN KEY (`idpemohon`) REFERENCES `pemohon` (`idpemohon`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `transaksi_ibfk_2` FOREIGN KEY (`idgrouptr`) REFERENCES `grouptransaksi` (`idgrouptr`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
