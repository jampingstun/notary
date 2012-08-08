        <div class="span9">
            <div class="well" style="background-color: white;">
                <div class="page-header"> 
<p class="brand" style="margin: 0; margin-left: 35%; margin-top: 25px; padding: 10;">
<img src="assets/img/icon-add-user.png">&nbsp;&nbsp;<a style="padding-right: 12px;" class="label label-info">&nbsp;&nbsp;
     Form Data Pemohon <br></a></p>
<!--    <a style="padding-right:25px;"> Masukkan Data Identitas Pemohon</a>-->
                </div>
                <br/>
        <form class="form-horizontal" method="POST" style="padding-right: 0%;">
<!--                <div class="page-header">
                    <h3>Identitas Pemohon</h3>
                </div>-->
            <div class="accordion" id="accordion1">
            <div class="accordion-group">
              <div class="accordion-heading">
                <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion1" href="#collapse1" style="background-color:whitesmoke;">
                  Masukkan Data Identitas Pemohon
                </a>
              </div>
              <div id="collapse1" class="accordion-body collapse in">
                <div class="accordion-inner">

                    <div class="control-group">
                    <label class="control-label">Nama</label>
                    <div class="controls">
                    <input type="text" class="input-large" name="f[nama]">
                    </div>
                    </div>
            
                    <div class="control-group">
                    <label class="control-label">Tempat</label>
                    <div class="controls">
                    <input type="text" class="input" name="f[tempat]">
                    </div>
                    </div>
            
                    <div class="control-group">
                    <label class="control-label">Tgl Lahir</label>
                    <div class="controls">
                    <input type="text" class="input" name="f[tglahir]">
                    </div>
                    </div>
                    
                    <div class="control-group">
                        <label class="control-label">Alamat</label>
                    <div class="controls">
                    <input type="text" class="input" name="f[alamat]">
                    </div>
                    </div>
            
                    <div class="control-group">
                    <label class="control-label">Agama</label>
                    <div class="controls">
                    <input type="text" class="input" name="f[agama]">
                    </div>
                    </div>
            
                    <div class="control-group">
                    <label class="control-label">Pekerjaan</label>
                    <div class="controls">
                    <input type="text" class="input" name="f[pekerjaan]">
                    </div>
                    </div>
                    
                    <div class="control-group">
                    <label class="control-label">No Telepon</label>
                    <div class="controls">
                    <input type="text" class="input" name="f[notelp]">
                    </div>
                    </div> 
                    
                    <div class="control-group">
                    <label class="control-label">Tanggal Daftar</label>
                    <div class="controls">
                    <div class="input-append date" id="dp3" data-date="<?php echo date("Y-m-d") ?>" data-date-format="yyyy-mm-dd" onclick="datet()">
                    <input class="span2" size="16" type="text" name="f[tgldaftar]" value="<?php echo date("Y-m-d") ?>">
                    <span class="add-on"><i class="icon-th"></i></span>
                    </div>
                     <script>
                      function datet(){
                         $('#dp3').datepicker();
                         //$('#dp3').datepicker('show');                          
                      }
                    </script>
                    </div>
                    </div>
                    
                    <div class="control-group">
                    <label class="control-label" for="select01">Group Pemohon</label>
                    <div class="controls">
                    <select name="f[grouppemohon]">
                        <?php
                        $group = datagroup();
                        foreach($group as $v) {
                            echo '<option>'.$v.'</option>';
                        }
                        ?>
                    </select>
                    </div>
                </div>
                    
            </div>
        </div>
    </div>
</div>
                                            
             <br/>
             <br/>
                <div class="form-actions">
                <input type="submit" class="btn btn-primary" name="simpan" value="Simpan"/>
                <a onclick="history.go(-1)" class="btn">Batal</a>
            </div>

        </form>
            </div>
        </div>
    </div>
</div>