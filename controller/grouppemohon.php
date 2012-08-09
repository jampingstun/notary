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
	$sql = "select * from grouppemohon where id_grouppemohon = '".$_GET["id_grouppemohon"]."'";	
	$result = mysql_query($sql);	
	$rows = mysql_num_rows($result);
	$arr = array();
	while($obj = mysql_fetch_assoc($result))  
	{  
		$arr[] = $obj;  
	}
        for($i=0;$i<count($arr);$i++){
                if($arr[$i][pb_grouppemohon]==1){
                   $arr[$i][pb_grouppemohon] = 'Aktif'; 
                }
                else{
                    $arr[$i][pb_grouppemohon] = 'Tidak Aktif';
                }
                }
		$jsonresult = json_encode($arr);
		echo '({"total":"'.$rows.'","results":'.$jsonresult.'})';
}

else if($_GET['act'] == "edit")
{
        $pbgroup = $_POST['pb_grouppemohon'];
        if($pbgroup == 'aktif'){
            $pbgroup = '1';
        }
        else{
            $pbgroup = '0';
        }
	$sql = "update grouppemohon set nm_grouppemohon = '".$_POST["nm_grouppemohon"]."',pb_grouppemohon ='".$pbgroup."'where id_grouppemohon='".$_POST["id_grouppemohon"]."'";
        mysql_query($sql) or die(mysql_error());	
	echo "{success:true}";

}

else if($_GET['act'] == "add")

{
   $f = $_POST['f'];
    $pb = $f['pb_grouppemohon'];
    if ($pb == 'Aktif'){
        $f['pb_grouppemohon'] = '1';
    }
    else{
        $f['pb_grouppemohon'] = '0';
    }
    
    $info = json_encode($f);
  // echo 'one';
  //  die('resop');

    $erno = $f['nm_grouppemohon'].$f['pb_grouppemohon'].$info;
    //echo $str;
    //$sql=mysql_query("insert into grouppemohon(id_grouppemohon,nm_grouppemohon,pb_grouppemohon,infogrouppemohon) values(NULL,'".$f['nm_grouppemohon']."','".$f['pb_grouppemohon']."','".$info."')"); //ojo dibrusek
    $sql=mysql_query("insert into grouppemohon(id_grouppemohon,nm_grouppemohon,pb_grouppemohon) values(NULL,'".$f['nm_grouppemohon']."','".$f['pb_grouppemohon']."')");
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
		$sql = "delete from grouppemohon where id_grouppemohon ='".$_POST["del"]."'";	
		mysql_query($sql) or die(mysql_error());
		mysql_close();
}

else if((isset($_POST['act'])) == "cari")
{
   $idgroup = $_POST['id_grouppemohon'];
   $nmgroup = $_POST['nm_grouppemohon'];
   $pbgroup = $_POST['pb_grouppemohon'];
   
   if ($pbgroup == 'Aktif'){
       $pbgroup = '1';
   }
   else if($pbgroup == 'Tidak Aktif'){
       $pbgroup = '0';
   }
   else{
       $pbgroup = '';
   }
   
   $query = "SELECT * FROM grouppemohon WHERE id_grouppemohon LIKE '%".$idgroup."%'";
   if($nmgroup != ''){
      $query .= " AND nm_grouppemohon LIKE '%".$nmgroup."%'";
   };
   if($pbgroup != ''){
      $query .= " AND pb_grouppemohon = '".$pbgroup."'";
   };
   
   $result = mysql_query($query);
   $nbrows = mysql_num_rows($result);  
   if($nbrows>0){
    while($rec = mysql_fetch_array($result)){
            // render the right date format  
      $arr[] = $rec;
    }
            for($i=0;$i<count($arr);$i++){
                if($arr[$i][pb_grouppemohon]==1){
                   $arr[$i][pb_grouppemohon] = 'Aktif'; 
                }
                else{
                    $arr[$i][pb_grouppemohon] = 'Tidak Aktif';
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
                if($arr[$i][pb_grouppemohon]==1){
                   $arr[$i][pb_grouppemohon] = 'Aaktif'; 
                }
                else{
                    $arr[$i][pb_grouppemohon] = 'Tidak Aktif';
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
