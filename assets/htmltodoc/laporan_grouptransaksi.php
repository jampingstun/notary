<?php
if (is_file("laporan_grouptransaksi.doc")) {
    $filedoc = "laporan_grouptransaksi.doc";
    $filehtml = "laporan_grouptransaksi.html";
    unlink($filedoc);
    unlink($filehtml);
}
ob_start(); 
?>
<!DOCTYPE html>
<html>
    <head><title></title></head>
    <body>
        <table border='1' cellpadding='0' cellspacing='0' style='border-collapse: collapse' bordercolor='#000000'>
            <thead>
                <tr bgcolor=#CCCCCC>
                    <th>No</th>
                    <th>Nama</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                <?php
                include 'db_cetak.php';
                $idgrouppemohoncetak = array();
                $idgrouppemohoncetak = explode(',',$_GET['idgrouptr']);
                for($i=0;$i<sizeof($idgrouppemohoncetak);$i++) {
                   $result = mysql_query("SELECT * FROM grouptransaksi gp WHERE gp.idgrouptr='{$idgrouppemohoncetak[$i]}'");
                    if (mysql_num_rows($result)>0 or die(mysql_error())) {
                        $j = $i + 1;
                        while ($row = mysql_fetch_array($result)) {
                            echo '<tr>';
                            echo '<td>'.$j.'</td>';
                            echo '<td>'.$row['nmgrouptr'].'</td>';
                            if ($row['pbgrouptr']=='1') {
                                echo '<td>Aktif</td>';
                            } else {
                                echo '<td>Tidak Aktif</td>';
                            }
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
file_put_contents('laporan_grouptransaksi.html', ob_get_contents());
session_start();
include("html_to_doc.inc.php");
$htmltodoc= new HTML_TO_DOC();
$htmltodoc->createDoc('laporan_grouptransaksi.html','laporan_grouptransaksi');
?>
