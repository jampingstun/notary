<?php
error_reporting(E_ALL & ~E_NOTICE & ~E_DEPRECATED);
  mysql_connect("localhost", "root", "") or
  die("Could not connect: " . mysql_error());
  mysql_select_db("notaris"); 
  
  $num = mysql_query("SELECT idnotifikasi FROM notifikasi ORDER BY idnotifikasi DESC LIMIT 1");
  $rows = mysql_num_rows($num);
  if($rows>0){
      while($rec = mysql_fetch_array($num)){
          $id=$rec['idnotifikasi'];
      }
  }
  $query = mysql_query("SELECT * FROM notifikasi where idnotifikasi='".$id."'");
  $rows = mysql_num_rows($query);
  if($rows>0){
      while($rec = mysql_fetch_array($query)){
          $ar=$rec['konfigurasi'];
      }
  }
  $day = date('Y-m-d');
  $date = new DateTime($day);
  $add = 'P'.$ar.'D';
  $date->add(new DateInterval($add));
  $day2 = $date->format('Y-m-d');
        $query = "SELECT * FROM transaksi WHERE status='0' AND tglselesai BETWEEN '".$day."' AND '".$day2."'";
	$result = mysql_query($query);
	$nbrows = mysql_num_rows($result);
	if($nbrows>0){
		while($rec = mysql_fetch_assoc($result)){
			$rec['tglmasuk']=codeDate($rec['tglmasuk']);
                        $rec['tglselesai']=codeDate($rec['tglselesai']);
			$arr = $rec;
                        $a = $arr['idgrouptr'];
                        $sqla = mysql_query("SELECT nmgrouptr FROM grouptransaksi WHERE idgrouptr='".$a."'");
                        $nrows = mysql_num_rows($sqla);
                        $arrays = array();
                        if($nrows>0){
                            while($records = mysql_fetch_assoc($sqla)){
                               $arrays = $records;
                            }
                        }
                        unset($arr['idgrouptr']);
                        if($arr['status'] == '1'){
                           $arr['status'] = 'Selesai';
                        }
                        else{
                            $arr['status'] = 'Belum Selesai';
                        }
                        
                        if($arr['sudahbayar'] == '1'){
                           $arr['sudahbayar'] = 'Sudah';
                        }
                        else{
                            $arr['sudahbayar'] = 'Belum';
                        }
                        $sql = mysql_query('SELECT infopemohon FROM pemohon WHERE idpemohon = '.$arr['idpemohon'].' ');
                        $rows = mysql_num_rows($sql);
                        if($rows>0){
                           while($record = mysql_fetch_assoc($sql)){
                               $array = $record;
                           }
                        }
                        $info = json_decode($array['infopemohon'],true);
                        $noktp['noktp'] = $info['noktp'];
                        $data[] = array_merge($arr,$arrays,$noktp);
		}
		$jsonresult = json_encode($data);
		echo '({"total":"'.$nbrows.'","results":'.$jsonresult.'})';
	} else {
		echo '({"total":"0", "results":""})';
	}
        
        function datagroup() {
    $gp = array();
    $sql = 'SELECT * FROM grouptransaksi';
    $result = mysql_query($sql) or die (mysql_error());
    $i= 0;
    while($r=mysql_fetch_array($result)) {
        $gp[$i] = $r['nmgrouptr'];
        $i++;
    } 
    return $gp;
}

if(isset($_POST["del"]))
{
		$sql = "update transaksi set status='1' where idtransaksi='".$_POST["del"]."'";	
		mysql_query($sql) or die(mysql_error());
                mysql_close();
}

function datanoktp() {
    $gp = array();
    $sql = 'SELECT * FROM pemohon';
    $result = mysql_query($sql) or die (mysql_error());
    $i= 0;
    while($r=mysql_fetch_assoc($result)) {
        $arr = $r['infopemohon'];
        $noktp = json_decode($arr,true);
        $gp[$i] = $noktp['noktp'];
        $i++;
    }
    $ag = implode(",",$gp);
    return $ag;
}

function addQuote()
{
  $string = datanoktp();
  $array = explode(',', $string);
  $newArray = array();
  foreach($array as $value)
  {
    $newArray[] = '"' . $value . '"';
  }
  $newString = "[".implode(',', $newArray)."]";
  return $newString;
}

function codeDate ($date) {
	$tab = explode ("-", $date);
	$r = $tab[1]."-".$tab[2]."-".$tab[0];
	return $r;
}
?>
