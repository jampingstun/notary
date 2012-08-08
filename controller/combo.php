<?php
error_reporting(E_ALL & ~E_NOTICE & ~E_DEPRECATED);
  mysql_connect("localhost", "root", "") or
  die("Could not connect: " . mysql_error());
  mysql_select_db("notaris");      
  if($_GET['act'] == 'grouppemohon'){
        $query = "SELECT * FROM grouppemohon";
	$result = mysql_query($query);
	$nbrows = mysql_num_rows($result);	
	if($nbrows>0){
		while($rec = mysql_fetch_array($result)){
			$arr[] = $rec;
		}
		$jsonresult = json_encode($arr);
		echo '({"total":"'.$nbrows.'","results":'.$jsonresult.'})';
	} else {
		echo '({"total":"0", "results":""})';
	}
  }
  else if($_GET['act'] == 'grouptransaksi'){
      $query = "SELECT * FROM grouptransaksi";
      $result = mysql_query($query);
      $nbrows = mysql_num_rows($result);
      if($nbrows>0){
          while($rec = mysql_fetch_assoc($result)){
              $arr[] = $rec;
          }
      $jsonresult = json_encode($arr);
      echo '({"total":"'.$nbrows.'","results":'.$jsonresult.'})';
	} else {
		echo '({"total":"0", "results":""})';
	}
  }
?>
