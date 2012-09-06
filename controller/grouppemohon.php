<?php
////////////////////////////////////////////////////////
// DATABASE.PHP
////////////////////////////////////////////////////////
 error_reporting(E_ALL & ~E_NOTICE & ~E_DEPRECATED);
  mysql_connect("localhost", "root", "") or
  die("Could not connect: " . mysql_error());
  mysql_select_db("notaris");
// Encodes a YYYY-MM-DD into a MM-DD-YYYY string
if($_GET['op']==grouppemohon){   
    include 'view/wrapper.php';
    if ($_POST['simpan']) {
        $_GET['act']='add';
    }
}  
if($_GET['act'] == "get")
{
	$sql = "select * from grouppemohon where idgrouppemohoon = '".$_GET["idgrouppemohoon"]."'";	
	$result = mysql_query($sql);	
	$rows = mysql_num_rows($result);
	$arr = array();
	while($obj = mysql_fetch_assoc($result))  
	{  
		$arr[] = $obj;  
	}
        for($i=0;$i<count($arr);$i++){
                if($arr[$i][pbgrouppemohon]==1){
                   $arr[$i][pbgrouppemohon] = 'Aktif'; 
                }
                else{
                    $arr[$i][pbgrouppemohon] = 'Tidak Aktif';
                }
                }
		$jsonresult = json_encode($arr);
		echo '({"total":"'.$rows.'","results":'.$jsonresult.'})';
}

else if($_GET['act'] == "edit")
{
        $pbgroup = $_POST['pbgrouppemohon'];
        if($pbgroup == 'aktif'){
            $pbgroup = '1';
        }
        else{
            $pbgroup = '0';
        }
	$sql = "update grouppemohon set nmgrouppemohon = '".$_POST["nmgrouppemohon"]."',pbgrouppemohon ='".$pbgroup."'where idgrouppemohoon='".$_POST["idgrouppemohoon"]."'";
        mysql_query($sql) or die(mysql_error());	
	echo "{success:true}";

}

else if($_GET['act'] == "add")

{
   $f = $_POST['f'];
    $pb = $f['pbgrouppemohon'];
    if ($pb == 'Aktif'){
        $f['pbgrouppemohon'] = '1';
    }
    else{
        $f['pbgrouppemohon'] = '0';
    }
    
    $info = json_encode($f);
  // echo 'one';
  //  die('resop');

    $erno = $f['nmgrouppemohon'].$f['pbgrouppemohon'].$info;
    //echo $str;
    //$sql=mysql_query("insert into grouppemohon(idgrouppemohoon,nmgrouppemohon,pbgrouppemohon,infogrouppemohon) values(NULL,'".$f['nmgrouppemohon']."','".$f['pbgrouppemohon']."','".$info."')"); //ojo dibrusek
    $sql=mysql_query("insert into grouppemohon(idgrouppemohoon,nmgrouppemohon,pbgrouppemohon) values(NULL,'".$f['nmgrouppemohon']."','".$f['pbgrouppemohon']."')");
    //echo "{$sql}";
    if ($sql)
                    {
                    echo "{success:true}";
                } 
                    else
                    {
                    echo "{success: false, errors: { reason: '.$erno.' }}";
                }
}

else if(isset($_POST["del"]))
{
		$sql = "delete from grouppemohon where idgrouppemohoon ='".$_POST["del"]."'";	
		mysql_query($sql) or die(mysql_error());
		mysql_close();
}

else if(isset($_POST["prt"]))
{
    header('Location: http://'.$_SERVER["SERVER_NAME"].'/notary/assets/htmltodoc/laporan_grouppemohon.php?idgrouppemohon='.$_POST["prt"]);
}

else if((isset($_POST['act'])) == "cari")
{
   $idgroup = $_POST['idgrouppemohoon'];
   $nmgroup = $_POST['nmgrouppemohon'];
   $pbgroup = $_POST['pbgrouppemohon'];
   
   if ($pbgroup == 'Aktif'){
       $pbgroup = '1';
   }
   else if($pbgroup == 'Tidak Aktif'){
       $pbgroup = '0';
   }
   else{
       $pbgroup = '';
   }
   
   $query = "SELECT * FROM grouppemohon WHERE idgrouppemohon LIKE '%".$idgroup."%'";
   if($nmgroup != ''){
      $query .= " AND nmgrouppemohon LIKE '%".$nmgroup."%'";
   };
   if($pbgroup != ''){
      $query .= " AND pbgrouppemohon = '".$pbgroup."'";
   };
   
 //  echo $query;
   
   $result = mysql_query($query);
   $nbrows = mysql_num_rows($result);  
   if($nbrows>0){
    while($rec = mysql_fetch_array($result)){
            // render the right date format  
      $arr[] = $rec;
    }
            for($i=0;$i<count($arr);$i++){
                if($arr[$i][pbgrouppemohon]==1){
                   $arr[$i][pbgrouppemohon] = 'Aktif'; 
                }
                else{
                    $arr[$i][pbgrouppemohon] = 'Tidak Aktif';
                }
                }
    $jsonresult = json_encode($arr);
    echo '({"total":"'.$nbrows.'","results":'.$jsonresult.'})';
   } else {
    echo '({"total":"0", "results":""})';
   }
}

else if ($_GET['act'] == 'show') {
    $query = "SELECT * FROM grouppemohon";
	$result = mysql_query($query);
	$nbrows = mysql_num_rows($result);	
	if($nbrows>0){
		while($rec = mysql_fetch_array($result)){
			$arr[] = $rec;
		}
                
                for($i=0;$i<count($arr);$i++){
                if($arr[$i][pbgrouppemohon]==1){
                   $arr[$i][pbgrouppemohon] = 'Aktif'; 
                }
                else{
                    $arr[$i][pbgrouppemohon] = 'Tidak Aktif';
                }
                }
                
		$jsonresult = json_encode($arr);
		echo '({"total":"'.$nbrows.'","results":'.$jsonresult.'})';
	} else {
		echo '({"total":"0", "results":""})';
	}
}
function codeDate ($date) {
	$tab = explode ("-", $date);
	$r = $tab[1]."/".$tab[2]."/".$tab[0];
	return $r;
}
?>
