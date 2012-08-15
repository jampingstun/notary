<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
$f['nm_grouppemohon'] = 'ada';
$f['nama'] = 'budi';
$_POST['f']= $f;
$_GET["act"] = 'edit';
$group = datanoktp();
foreach($group as $v) {
echo ',.$v.,';
}
include 'transaksi.php';
?>
