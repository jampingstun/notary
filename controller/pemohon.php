<?php
 error_reporting(E_ALL & ~E_NOTICE & ~E_DEPRECATED);
  mysql_connect("localhost", "root", "") or
  die("Could not connect: " . mysql_error());
  mysql_select_db("notaris"); 
if($_GET['op']==pemohon){  
    include 'view/wrapper.php';   
    if ($_POST['simpan']) {
        $_GET['act']='add';
    }
}

if($_GET["act"] == "get")
{
	$sql = "select * from pemohon where idpemohon = '".$_GET["idpemohon"]."'";	
	$result = mysql_query($sql);	
	$nbrows = mysql_num_rows($result);
        $i = 0;
        if($nbrows>0){
		while($rec = mysql_fetch_assoc($result)){
                        $arr = $rec;
                        $a = $arr['idgrouppemohon'];
                        $sqla = mysql_query("SELECT nm_grouppemohon FROM grouppemohon WHERE id_grouppemohon='".$a."'");
                        $rows = mysql_num_rows($sqla);
                        if($rows>0){
                            while($record = mysql_fetch_array($sqla)){
                               $array = $record;
                            }
                        }
                        if($arr['pbpemohon'] == '1'){
                           $arr['pbpemohon'] = 'Aktif';
                        }
                        else{
                            $arr['pbpemohon'] = 'Tidak Aktif';
                        }
                        $info = json_decode($arr['infopemohon'], true);
                        unset($arr['infopemohon']);
                        $fusion = array_merge($arr,$info,$array);
                        $ar[] = (json_encode($fusion));
		}
                $list = implode(",",$ar);
		echo '({"total":"'.$nbrows.'","results":['.$list.']})';
	} else {
		echo '({"total":"0", "results":""})';
	}
}

else if($_GET["act"] == "edit")
{
	$f = $_POST['f'];
        $idgrouppemohon = $_POST['nm_grouppemohon'];
        $pbpemohon = $_POST['pbpemohon'];
        $idpemohon = $_POST['idpemohon'];
        if($pbpemohon == 'Aktif'){
                $pbpemohon = '1';
            }
            else{
                $pbpemohon = '0';
            }
        $sqla = mysql_query("SELECT id_grouppemohon FROM grouppemohon WHERE nm_grouppemohon='".$idgrouppemohon."'");
        $row = mysql_num_rows($sqla);
        if($row>0){
        while($recs = mysql_fetch_array($sqla)){
                $arr = $recs['id_grouppemohon'];
                    }
        }
        $j = json_encode($f);
        $sql = "update pemohon set idpemohon='".$_POST["idpemohon"]."', idgrouppemohon = '".$arr."',tgldaftarpemohon = '".$_POST["tgldaftarpemohon"]."',infopemohon='".$j."',pbpemohon='".$pbpemohon."' where idpemohon='".$idpemohon."'";	
	mysql_query($sql) or die(mysql_error());
        echo "{success:true}";
        $sql = "delete from tbl_index where tipe='pemohon' and id='".$idpemohon."'";
        $indexconfig = array(
            'pemohon'=>array('noktp','nama','alamat','tempat','tglahir','agama','pekerjaan','notelp'),
        );
        mysql_query($sql) or die(mysql_error());
        foreach ($indexconfig['pemohon'] as $v) {
            $sql = "insert into tbl_index (tipe,id,kode,isi) values ('pemohon','".$idpemohon."','".$v."','".$f[$v]."')";
            mysql_query($sql) or die(mysql_error());
    }

}

else if($_GET['act'] == "add")

{
    $f = $_POST['f'];
    $idgrouppemohon = $_POST['grouppemohon'];
    $tgldaftar = $_POST['tgldaftar'];
    $pbpemohon = $_POST['pbpemohon'];
        if($pbpemohon == 'Aktif'){
                $pbpemohon = '1';
            }
            else{
                $pbpemohon = '0';
            }
    $sqla = mysql_query("SELECT id_grouppemohon FROM grouppemohon WHERE nm_grouppemohon='".$idgrouppemohon."'");
    $row = mysql_num_rows($sqla);
    if($row>0){
    while($recs = mysql_fetch_array($sqla)){
            $arr = $recs['id_grouppemohon'];
                }
    }
    $j = json_encode($f);
        $sql = "INSERT INTO pemohon (idpemohon, idgrouppemohon, tgldaftarpemohon, infopemohon, pbpemohon) VALUES ('null','".$arr."','".$tgldaftar."','".$j."','".$pbpemohon."')";
        $sql_query = mysql_query($sql);
        if ($sql_query)
	  {
          echo "{success:true}";
      } 
	  else
	  {
           echo "{success: false, errors: { reason: '".$arr."' }}";
      }
      
      
        $sql_lastid = "SELECT LAST_INSERT_ID()";
        $id = mysql_query($sql_lastid) or die(mysql_error());
        while ($row = mysql_fetch_array($id)) {
            $last_id = $row[0];
        }
        $sql = "delete from tbl_index where tipe='pemohon' and id='".$last_id."'";
        $indexconfig = array(
            'pemohon'=>array('noktp','nama','alamat','tempat','tglahir','agama','pekerjaan','notelp'),
        );
        mysql_query($sql) or die(mysql_error());
        foreach ($indexconfig['pemohon'] as $v) {
            $sql = "insert into tbl_index (tipe,id,kode,isi) values ('pemohon','".$last_id."','".$v."','".$f[$v]."')";
            mysql_query($sql) or die(mysql_error());
    }
}

else if(isset($_POST["del"]))
{
		$sql = "delete from pemohon where idpemohon ='".$_POST["del"]."'";	
		mysql_query($sql) or die(mysql_error());
                $sql = mysql_query("delete from tbl_index where tipe='pemohon' and id='".$_POST["del"]."'");
		mysql_close();
}
else if((isset($_POST['act'])) == "cari")
{
$tipe1 = $_POST['tipedata1'];
$data1 = $_POST['data1'];
$sql = "SELECT * FROM tbl_index WHERE tipe='pemohon' and kode='".$tipe1."' and isi='".$data1."'";
$data = mysql_query($sql) or die(mysql_error());
if (mysql_num_rows($data)>0) {
    while ($row = mysql_fetch_array($data)) {
        $id = $row['id'];
    }
    $sql = "SELECT * FROM pemohon WHERE idpemohon='".$id."'";
    $result = mysql_query($sql) or die(mysql_error());
    $nbrows = mysql_num_rows($result);  
	if($nbrows>0){
		while($rec = mysql_fetch_assoc($result)){
                        $arr = $rec;
                        $a = $arr['idgrouppemohon'];
                        $sqla = mysql_query("SELECT nm_grouppemohon FROM grouppemohon WHERE id_grouppemohon='".$a."'");
                        $rows = mysql_num_rows($sqla);
                        if($rows>0){
                            while($record = mysql_fetch_array($sqla)){
                               $array = $record;
                            }
                        }
                        if($arr['pbpemohon'] == '1'){
                           $arr['pbpemohon'] = 'Aktif';
                        }
                        else{
                            $arr['pbpemohon'] = 'Tidak Aktif';
                        }
                        $info = json_decode($arr['infopemohon'], true);
                        unset($arr['infopemohon']);
                        $fusion = array_merge($arr,$info,$array);
                        $ar[] = (json_encode($fusion));
		}
                $list = implode(",",$ar);
		echo '({"total":"'.$nbrows.'","results":['.$list.']})';
	} else {
		echo '({"total":"0", "results":""})';
	}
}
}
else if($_GET['act'] == "show"){
     $query = "SELECT * FROM pemohon";
	$result = mysql_query($query);
	$nbrows = mysql_num_rows($result);
	if($nbrows>0){
		while($rec = mysql_fetch_assoc($result)){
                        $arr = $rec;
                        $a = $arr['idgrouppemohon'];
                        $sqla = mysql_query("SELECT nm_grouppemohon FROM grouppemohon WHERE id_grouppemohon='".$a."'");
                        $rows = mysql_num_rows($sqla);
                        $array = array();
                        if($rows>0){
                            while($record = mysql_fetch_array($sqla)){
                               $array = $record;
                            }
                        }
                        if($arr['pbpemohon'] == '1'){
                           $arr['pbpemohon'] = 'Aktif';
                        }
                        else{
                            $arr['pbpemohon'] = 'Tidak Aktif';
                        }
                        $info = json_decode($arr['infopemohon'], true);
                        unset($arr['infopemohon']);
                        $fusion = array_merge($arr,$info,$array);
                        $ar[] = (json_encode($fusion));
		}
                $list = implode(",",$ar);
		echo '({"total":"'.$nbrows.'","results":['.$list.']})';
	} else {
		echo '({"total":"0", "results":""})';
	}
}

function datagroup() {
    $gp = array();
    $sql = 'SELECT * FROM grouppemohon';
    $result = mysql_query($sql) or die (mysql_error());
    $i= 0;
    while($r=mysql_fetch_array($result)) {
        $gp[$i] = $r['nm_grouppemohon'];
        $i++;
    } 
    return $gp;
}

function codeDate ($date) {
	$tab = explode ("-", $date);
	$r = $tab[1]."/".$tab[2]."/".$tab[0];
	return $r;
}
 //