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
	$sql = "select * from grouptransaksi where id_grouptr = '".$_GET["id_grouptr"]."'";	
	$result = mysql_query($sql);	
	$rows = mysql_num_rows($result);
	$arr = array();
	while($obj = mysql_fetch_assoc($result))  
	{  
		$arr[] = $obj;  
	}
            for($i=0;$i<count($arr);$i++){
                if($arr[$i][pb_grouptr]==1){
                   $arr[$i][pb_grouptr] = 'Aktif'; 
                }
                else{
                    $arr[$i][pb_grouptr] = 'Tidak Aktif';
                }
                }
		$jsonresult = json_encode($arr);
		echo '({"total":"'.$nbrows.'","results":'.$jsonresult.'})';
}

else if($_GET['act'] == "edit")
{
        $pbgroup = $_POST['pb_grouptr'];
        if($pbgroup == 'aktif'){
            $pbgroup = '1';
        }
        else{
            $pbgroup = '0';
        }
	$sql = "update grouptransaksi set nm_grouptr = '".$_POST["nm_grouptr"]."',pb_grouptr ='".$pbgroup."'where id_grouptr='".$_POST["id_grouptr"]."'";
        mysql_query($sql) or die(mysql_error());	
	echo "{success:true}";

}

else if($_GET['act'] == "add")

{
    
          $f = $_POST['f'];
          
            $pb = $f['pb_grouptr'];
            if ($pb == 'Aktif'){
                $f['pb_grouptr'] = '1';
            }
            else{
                $f['pb_grouptr'] = '0';
            }
          $str="'".implode("','",$f)."'";
          $sql=mysql_query("insert into grouptransaksi(`id_grouptr`,`nm_grouptr`,`pb_grouptr`) values('null',".$str.")");
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
		$sql = "delete from grouptransaksi where id_grouptr ='".$_POST["del"]."'";	
		mysql_query($sql) or die(mysql_error());
		mysql_close();
}

else if((isset($_POST['act'])) == "cari")
{
   $idgroup = $_POST['id_grouptransaksi'];
   $nmgroup = $_POST['nm_grouptransaksi'];
   $pbgroup = $_POST['pb_grouptransaksi'];
   
   if ($pbgroup == 'Aktif'){
       $pbgroup = '1';
   }
   else if($pbgroup == 'Tidak Aktif'){
       $pbgroup = '0';
   }
   else{
       $pbgroup = '';
   }
   $query = "SELECT * FROM grouptransaksi WHERE id_grouptr LIKE '%".$idgroup."%'";
   if($nmgroup != ''){
      $query .= " AND nm_grouptr LIKE '%".$nmgroup."%'";
   };
   if($pbgroup != ''){
      $query .= " AND pb_grouptr = '".$pbgroup."'";
   };
 
   $result = mysql_query($query);
   $nbrows = mysql_num_rows($result);  
   if($nbrows>0){
    while($rec = mysql_fetch_array($result)){
            // render the right date format  
      $arr[] = $rec;
    }
            for($i=0;$i<count($arr);$i++){
                if($arr[$i][pb_grouptr]==1){
                   $arr[$i][pb_grouptr] = 'Aktif'; 
                }
                else{
                    $arr[$i][pb_grouptr] = 'Tidak Aktif';
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
                if($arr[$i][pb_grouptr]==1){
                   $arr[$i][pb_grouptr] = 'Aktif'; 
                }
                else{
                    $arr[$i][pb_grouptr] = 'Tidak Aktif';
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
