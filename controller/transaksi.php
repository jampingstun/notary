<?php
 error_reporting(E_ALL & ~E_NOTICE & ~E_DEPRECATED);
  mysql_connect("localhost", "root", "") or
  die("Could not connect: " . mysql_error());
  mysql_select_db("notaris");

if($_GET['op']==transaksi){   
    include 'view/wrapper.php'; 
    if ($_POST['simpan']) {
        $_GET['act']='add';
    }
}
if($_GET['act'] == "get")
{
	$sql = "select * from transaksi where id_transaksi = '".$_GET["id_transaksi"]."'";	
	$result = mysql_query($sql);	
	$nbrows = mysql_num_rows($result);
	$arr = array();
	if($nbrows>0){
		while($rec = mysql_fetch_assoc($result)){
			$rec['tglmasuk']=codeDate($rec['tglmasuk']);
                        $rec['tglselesai']=codeDate($rec['tglselesai']);
			$arr = $rec;
                        $a = $arr['id_grouptr'];
                        $sqla = mysql_query("SELECT nm_grouptr FROM grouptransaksi WHERE id_grouptr='".$a."'");
                        $nrows = mysql_num_rows($sqla);
                        $arrays = array();
                        if($nrows>0){
                            while($records = mysql_fetch_assoc($sqla)){
                               $arrays = $records;
                            }
                        }
                        unset($arr['id_grouptr']);
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
                        $sql = mysql_query('SELECT infopemohon FROM pemohon WHERE idpemohon = '.$arr['id_pemohon'].' ');
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
}

else if($_GET['act'] == "edit")
{
	$sql = mysql_query("SELECT id FROM tbl_index WHERE isi = '".$_POST['noktp']."'");
        $nbrows = mysql_num_rows($sql);
        if($nbrows > 0){
            while($rec = mysql_fetch_array($sql)){
                $idpemohon = $rec['id'];
            }
        }
        $sql = mysql_query("SELECT id_grouptr FROM grouptransaksi WHERE nm_grouptr = '".$_POST['nm_grouptr']."'");
        $nbrows = mysql_num_rows($sql);
        if($nbrows > 0){
            while($rec = mysql_fetch_array($sql)){
                $idgrouptr = $rec['id_grouptr'];
            }
        }
        $status = $_POST['status'];
        $sudahbayar = $_POST['sudahbayar'];
        if($status == 'Selesai'){
            $status = 1;
        }
        else{
            $status = 0;
        }
        if($sudahbayar == 'Sudah'){
            $sudahbayar = 1;
        }
        else{
            $sudahbayar = 0;
        }
        $sql = "update transaksi set tglmasuk = '".$_POST["tglmasuk"]."',id_pemohon = '".$idpemohon."',id_grouptr ='".$idgrouptr."',
            judul='".$_POST["judul"]."',jmlberkas='".$_POST["jmlberkas"]."', status='".$status."',jmlberkasselesai='".$_POST["jmlberkasselesai"]."',harga='".$_POST["harga"]."',sudahbayar='".$sudahbayar."',
                tglselesai='".$_POST["tglselesai"]."' where id_transaksi='".$_POST["id_transaksi"]."'";	
	mysql_query($sql) or die(mysql_error());	
	echo "{success:true}";

}

else if($_GET['act'] == "add")

{
     $f = $_POST['f'];
     $sql = mysql_query("SELECT id FROM tbl_index WHERE isi = '".$_POST['noktp']."'");
        $nbrows = mysql_num_rows($sql);
        if($nbrows > 0){
            while($rec = mysql_fetch_array($sql)){
                $idpemohon = $rec['id'];
            }
        }
        $sql = mysql_query("SELECT id_grouptr FROM grouptransaksi WHERE nm_grouptr = '".$_POST['nm_grouptr']."'");
        $nbrows = mysql_num_rows($sql);
        if($nbrows > 0){
            while($rec = mysql_fetch_array($sql)){
                $idgrouptr = $rec['id_grouptr'];
            }
        }
        $status = $_POST['status'];
        $sudahbayar = $_POST['sudahbayar'];
        if($status == 'Selesai'){
            $status = 1;
        }
        else{
            $status = 0;
        }
        if($sudahbayar == 'Sudah'){
            $sudahbayar = 1;
        }
        else{
            $sudahbayar = 0;
        }
          
      $str="'".implode("','",$f)."'";
            $sql_query = mysql_query("INSERT INTO transaksi(`id_transaksi`,`tglmasuk`,`judul`,`jmlberkas`,`jmlberkasselesai`,`harga`,`tglselesai`,`id_grouptr`,`id_pemohon`,`status`,`sudahbayar`) VALUES('null',".$str.",".$idgrouptr.",".$idpemohon.",".$status.",".$sudahbayar.")");
            if ($sql_query)
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
		$sql = "delete from transaksi where id_transaksi ='".$_POST["del"]."'";	
		mysql_query($sql) or die(mysql_error());
		mysql_close();
}

else if((isset($_POST['act'])) == "cari")
{
$tipe1 = $_POST['tipedata1'];
$data1 = $_POST['data1'];
$tipe2 = $_POST['tipedata2'];
$data2 = $_POST['data2'];
   $query = "SELECT * FROM transaksi WHERE id_grouptr LIKE '%".$idgroup."%'";
   if($data1 != ''){
      $query .= " AND ".$tipe1." LIKE '%".$data1."%'";
   };
   if($data2 != ''){
       $query .= " AND ".$tipe2." LIKE '%".$data2."%'";
   };
 
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

else if($_GET['act'] == "show"){
    $query = "SELECT * FROM transaksi";
    $result = mysql_query($query);
    $nbrows = mysql_num_rows($result);	
	if($nbrows>0){
		while($rec = mysql_fetch_assoc($result)){
			$rec['tglmasuk']=codeDate($rec['tglmasuk']);
                        $rec['tglselesai']=codeDate($rec['tglselesai']);
			$arr = $rec;
                        $a = $arr['id_grouptr'];
                        $sqla = mysql_query("SELECT nm_grouptr FROM grouptransaksi WHERE id_grouptr='".$a."'");
                        $nrows = mysql_num_rows($sqla);
                        $arrays = array();
                        if($nrows>0){
                            while($records = mysql_fetch_assoc($sqla)){
                               $arrays = $records;
                            }
                        }
                        unset($arr['id_grouptr']);
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
                        $sql = mysql_query('SELECT infopemohon FROM pemohon WHERE idpemohon = '.$arr['id_pemohon'].' ');
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
}

function datagroup() {
    $gp = array();
    $sql = 'SELECT * FROM grouptransaksi';
    $result = mysql_query($sql) or die (mysql_error());
    $i= 0;
    while($r=mysql_fetch_array($result)) {
        $gp[$i] = $r['nm_grouptr'];
        $i++;
    } 
    return $gp;
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
    return $gp;
}

function codeDate ($date) {
	$tab = explode ("-", $date);
	$r = $tab[1]."-".$tab[2]."-".$tab[0];
	return $r;
}

?>
