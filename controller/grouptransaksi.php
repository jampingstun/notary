<?php
 error_reporting(E_ALL & ~E_NOTICE & ~E_DEPRECATED);
  mysql_connect("localhost", "root", "") or
  die("Could not connect: " . mysql_error());
  mysql_select_db("notaris");
if($_GET['op']==grouptransaksi){   
    include 'view/wrapper.php';
    if ($_POST['simpan']) {
        $_GET['act']='add';
    }
}
if($_GET['act'] == "get")
{
	$sql = "select * from grouptransaksi where idgrouptr = '".$_GET["idgrouptr"]."'";	
	$result = mysql_query($sql);	
	$rows = mysql_num_rows($result);
	$arr = array();
	while($obj = mysql_fetch_assoc($result))  
	{  
		$arr[] = $obj;  
	}
            for($i=0;$i<count($arr);$i++){
                if($arr[$i][pbgrouptr]==1){
                   $arr[$i][pbgrouptr] = 'Aktif'; 
                }
                else{
                    $arr[$i][pbgrouptr] = 'Tidak Aktif';
                }
                }
		$jsonresult = json_encode($arr);
		echo '({"total":"'.$nbrows.'","results":'.$jsonresult.'})';
}

else if($_GET['act'] == "edit")
{
        $pbgroup = $_POST['pbgrouptr'];
        if($pbgroup == 'aktif'){
            $pbgroup = '1';
        }
        else{
            $pbgroup = '0';
        }
	$sql = "update grouptransaksi set nmgrouptr = '".$_POST["nmgrouptr"]."',pbgrouptr ='".$pbgroup."'where idgrouptr='".$_POST["idgrouptr"]."'";
        mysql_query($sql) or die(mysql_error());	
	echo "{success:true}";

}

else if($_GET['act'] == "add")

{
    
          $f = $_POST['f'];
          
            $pb = $f['pbgrouptr'];
            if ($pb == 'Aktif'){
                $f['pbgrouptr'] = '1';
            }
            else{
                $f['pbgrouptr'] = '0';
            }
          $str="'".implode("','",$f)."'";
          $sql=mysql_query("insert into grouptransaksi(`idgrouptr`,`nmgrouptr`,`pbgrouptr`) values('null',".$str.")");
          if ($sql)
                    {
                    echo "{success:true}";
                } 
                    else
                    {
                    echo "{success: false, errors: { reason: 'upload failed!!' }}";
                }
}

else if(isset($_POST["del"]))
{
		$sql = "delete from grouptransaksi where idgrouptr ='".$_POST["del"]."'";	
		mysql_query($sql) or die(mysql_error());
		mysql_close();
}

else if(isset($_POST["prt"]))
{
    header('Location: http://'.$_SERVER["SERVER_NAME"].'/notary/assets/htmltodoc/laporan_grouptransaksi.php?idgrouptr='.$_POST["prt"]);
}

else if((isset($_POST['act'])) == "cari")
{
   $idgroup = $_POST['idgrouptransaksi'];
   $nmgroup = $_POST['nmgrouptransaksi'];
   $pbgroup = $_POST['pbgrouptransaksi'];
   
   if ($pbgroup == 'Aktif'){
       $pbgroup = '1';
   }
   else if($pbgroup == 'Tidak Aktif'){
       $pbgroup = '0';
   }
   else{
       $pbgroup = '';
   }
   $query = "SELECT * FROM grouptransaksi WHERE idgrouptr LIKE '%".$idgroup."%'";
   if($nmgroup != ''){
      $query .= " AND nmgrouptr LIKE '%".$nmgroup."%'";
   };
   if($pbgroup != ''){
      $query .= " AND pbgrouptr = '".$pbgroup."'";
   };
 
   $result = mysql_query($query);
   $nbrows = mysql_num_rows($result);  
   if($nbrows>0){
    while($rec = mysql_fetch_array($result)){
            // render the right date format  
      $arr[] = $rec;
    }
            for($i=0;$i<count($arr);$i++){
                if($arr[$i][pbgrouptr]==1){
                   $arr[$i][pbgrouptr] = 'Aktif'; 
                }
                else{
                    $arr[$i][pbgrouptr] = 'Tidak Aktif';
                }
                }
    $jsonresult = json_encode($arr);
    echo '({"total":"'.$nbrows.'","results":'.$jsonresult.'})';
   } else {
    echo '({"total":"0", "results":""})';
   }
}

else if ($_GET['act'] == 'show') {
    $query = "SELECT * FROM grouptransaksi";
	$result = mysql_query($query);
	$nbrows = mysql_num_rows($result);	
	if($nbrows>0){
		while($rec = mysql_fetch_array($result)){
			$arr[] = $rec;
		}
                for($i=0;$i<count($arr);$i++){
                if($arr[$i][pbgrouptr]==1){
                   $arr[$i][pbgrouptr] = 'Aktif'; 
                }
                else{
                    $arr[$i][pbgrouptr] = 'Tidak Aktif';
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
