<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
error_reporting(E_ALL & ~E_NOTICE & ~E_DEPRECATED);
  mysql_connect("localhost", "root", "") or
  die("Could not connect: " . mysql_error());
  mysql_select_db("notaris"); 
if($_GET['op']=='setnotifikasi'){  
    include 'view/wrapper.php';   
    if ($_POST['simpan']) {
        $_GET['act']='add';
    }
}
if($_GET["act"] == "add")
{
$sql = mysql_query("INSERT INTO notifikasi VALUES('null','".$_POST['notif']."')");;
}
?>
