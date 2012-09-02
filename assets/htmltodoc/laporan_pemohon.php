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
                $result = mysql_query("SELECT * FROM grouppemohon gp JOIN pemohon p 
                                       USING(idgrouppemohon) WHERE p.idpemohon='{$_GET['idpemohon']}'");
                if (mysql_num_rows($result)>0 or die(mysql_error())) {
                    $i = 0;
                    $info = array();
                    while ($row = mysql_fetch_array($result)) {
                        $info = json_decode($row['infopemohon'], true);
                        echo '<tr>';
                        echo '<th>'.$i.'</th>';
                        echo '<th>'.$row['nm_grouppemohon'].'</th>';
                        echo '<th>'.$row['tgldaftarpemohon'].'</th>';
                        echo '<th>'.$info['noktp'].'</th>';
                        echo '<th>'.$info['nama'].'</th>';
                        echo '<th>'.$info['alamat'].'</th>';
                        echo '<th>'.$info['tempat'].', '.$info['tglahir'].'</th>';
                        echo '<th>'.$info['agama'].'</th>';
                        echo '<th>'.$info['pekerjaan'].'</th>';
                        echo '<th>'.$info['notelp'].'</th>';
                        echo '</tr>';
                        $i++;
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