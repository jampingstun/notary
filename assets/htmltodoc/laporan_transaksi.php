<?php
if (is_file("laporan_transaksi.doc")) {
    $filedoc = "laporan_transaksi.doc";
    $filehtml = "laporan_transaksi.html";
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
                    <th>Tanggal Masuk</th>
                    <th>No KTP Pemohon</th>
                    <th>Group Transaksi</th>
                    <th>Judul</th>
                    <th>Jumlah Berkas</th>
                    <th>Status</th>
                    <th>Jumlah Berkas Selesai</th>
                    <th>Harga</th>
                    <th>Sudah Bayar</th>
                    <th>Tanggal Selesai/th>
                </tr>
            </thead>
            <tbody>
                <?php
                include '../../config.php';
                include '../../funct/common.php';
                $idtransaksicetak = array();
                $idtransaksicetak = explode(',',$_GET['idtransaksi']);
                for($i=0;$i<sizeof($idtransaksicetak);$i++) {
                   $result = mysql_query("SELECT * FROM grouptransaksi gt JOIN transaksi t 
                                        USING(id_grouptr) JOIN pemohon p USING(idpemohon) WHERE t.idtransaksi='{$idtransaksicetak[$i]}'");
                    if (mysql_num_rows($result)>0 or die(mysql_error())) {
                        $info = array();
                        $j = $i + 1;
                        while ($row = mysql_fetch_array($result)) {
                            $info = json_decode($row['infopemohon'], true);
                            echo '<tr>';
                            echo '<td>'.$j.'</td>';
                            echo '<td>'.$row['tglmasuk'].'</td>';
                            echo '<td>'.$info['noktp'].'</td>';
                            echo '<td>'.$row['nmgrouptr'].'</td>';
                            echo '<td>'.$row['judul'].'</td>';
                            echo '<td>'.$row['jmlberkas'].'</th>';
                            echo '<td>'.$row['status'].'</td>';
                            echo '<td>'.$row['jmlberkasselesai'].'</td>';
                            echo '<td>'.$row['harga'].'</td>';
                            echo '<td>'.$row['sudahbayar'].'</td>';
                            echo '<td>'.$row['tglselesai'].'</td>';
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
file_put_contents('laporan_transaksi.html', ob_get_contents());
session_start();
include("html_to_doc.inc.php");
$htmltodoc= new HTML_TO_DOC();
$htmltodoc->createDoc('laporan_transaksi.html','laporan_transaksi');
?>