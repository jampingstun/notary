<?php
if (is_file("laporan_pemohon.doc")) {
    $filedoc = "laporan_pemohon.doc";
    $filehtml = "laporan_pemohon.html";
    unlink($filedoc);
    unlink($filehtml);
}
ob_start(); 
?>
<!DOCTYPE html>
<html>
    <head><title></title></head>
    <body>
        <table border="1" style="font-weight:normal">
            <thead>
                <tr>
                    <th>No</th>
                    <th>Group Pemohon</th>
                    <th>Tanggal Daftar</th>
                    <th>No KTP</th>
                    <th>Nama</th>
                    <th>Alamat</th>
                    <th>Tempat, Tgl Lahir</th>
                    <th>Agama</th>
                    <th>Pekerjaan</th>
                    <th>No Telp</th>
                </tr>
            </thead>
            <tbody>
                <?php
                include '../../config.php';
                include '../../funct/common.php';
                $idpemohoncetak = array();
                $idpemohoncetak = explode(',',$_GET['idpemohon']);
                for($i=0;$i<sizeof($idpemohoncetak);$i++) {
                   $result = mysql_query("SELECT * FROM grouppemohon gp JOIN pemohon p 
                                        USING(idgrouppemohon) WHERE p.idpemohon='{$idpemohoncetak[$i]}'");
                    if (mysql_num_rows($result)>0 or die(mysql_error())) {
                        $info = array();
                        $j = $i + 1;
                        while ($row = mysql_fetch_array($result)) {
                            $info = json_decode($row['infopemohon'], true);
                            echo '<tr>';
                            echo '<td>'.$j.'</td>';
                            echo '<td>'.$row['nmgrouppemohon'].'</td>';
                            echo '<td>'.$row['tgldaftarpemohon'].'</td>';
                            echo '<td>'.$info['noktp'].'</td>';
                            echo '<td>'.$info['nama'].'</td>';
                            echo '<td>'.$info['alamat'].'</th>';
                            echo '<td>'.$info['tempat'].', '.$info['tglahir'].'</td>';
                            echo '<td>'.$info['agama'].'</td>';
                            echo '<td>'.$info['pekerjaan'].'</td>';
                            echo '<td>'.$info['notelp'].'</td>';
                            echo '</tr>';
                        } 
                    } 
                }
                
                ?>
            </tbody>
        </table>
    </body>
</html>
<?php
file_put_contents('laporan_pemohon.html', ob_get_contents());
session_start();
include("html_to_doc.inc.php");
$htmltodoc= new HTML_TO_DOC();
$htmltodoc->createDoc('laporan_pemohon.html','laporan_pemohon');
?>