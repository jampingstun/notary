        <div class="span9">
            <div class="well" style="background-color: white;">
                <div class="page-header">
<p class="brand" style="margin: 0; margin-left: 35%; margin-top: 25px; padding: 10;">
<img src="assets/img/icon/glyphicons_071_book.png">&nbsp;&nbsp;<a style="padding-right: 12px;" class="label label-info" >&nbsp;&nbsp;
     Form Data Transaksi <br></a></p>
                </div>
                
        <form class="form-horizontal" method="POST" style="padding-right: 0%;">
                <div class="page-header">
 <h3><a style="padding-right: 12px;" class="label label-info">Identitas Transaksi</a></h3>
                </div>
            <div class="accordion" id="accordion1">
            <div class="accordion-group">
              <div class="accordion-heading">
                <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion1" href="#collapse1" style="background-color:whitesmoke;">
                  Masukkan Data
                </a>
              </div>
              <div id="collapse1" class="accordion-body collapse in">
                <div class="accordion-inner">
                    <div class="control-group">
                     
                    <div class="control-group">
                    <label class="control-label">Tanggal Masuk</label>
                    <div class="controls">
                    <div class="input-append date" id="dp3" data-date="<?php echo date("Y-m-d") ?>" data-date-format="yyyy-mm-dd" onclick="datet()">
                        <input class="span2" size="16" type="text" name="f[tglmasuk]" value="<?php echo date("Y-m-d") ?>">
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
                    <label class="control-label">No KTP</label>
                    <div class="controls">
                    <input type="text" name="noktp" data-provide="typeahead" data-items="4" data-source="<?php
                        $group = addQuote();
                        echo htmlentities($group);
                        ?>">
                    </div>
                    <script>
                    $('.typeahead').typeahead()
                    </script>
                    </div>
                    
                    <div class="control-group">
                    <label class="control-label" for="select01">Group Transaksi</label>
                    <div class="controls">
                    <select name="nmgrouptr">
                        <?php
                        $group = datagroup();
                        foreach($group as $v) {
                            echo '<option>'.$v.'</option>';
                        }
                        ?>
                    </select>
                    </div>
                </div>
                    
                    <div class="control-group">
                    <label class="control-label">Judul</label>
                    <div class="controls">
                    <input type="text" class="input" name="f[judul]">
                    </div>
                    </div> 
                    
                    <div class="control-group">
                    <label class="control-label">Jumlah Berkas</label>
                    <div class="controls">
                    <input type="text" class="input" name="f[jmlberkas]">
                    </div>
                    </div> 
                    
            </div>
        </div>
            </div>
            </div>
                
                <div class="page-header">
<h3><a style="padding-right: 12px;" class="label label-info">Data Transaksi</a></h3>
                </div>
            <div class="accordion" id="accordion2">
            <div class="accordion-group">
              <div class="accordion-heading">
                <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapse2" style="background-color:whitesmoke;">
                  Masukkan Data
                </a>
              </div>
              <div id="collapse2" class="accordion-body collapse in">
                <div class="accordion-inner"> 
                    
                    <div class="control-group">
                    <label class="control-label">Status</label>
                    <div class="controls">
                     <label class="checkbox">
                     <input type="checkbox" name="status" value="Selesai"> Selesai
                     </label>
                    </div>
                    </div>
                  
                    <div class="control-group">
                    <label class="control-label">Jumlah Berkas Selesai</label>
                    <div class="controls">
                    <input type="text" class="input" name="f[jmlberkasselesai]">
                    </div>
                    </div> 
                    
                    <div class="control-group">
                    <label class="control-label">Harga</label>
                    <div class="controls">
                    <div class="input-prepend">
                    <span class="add-on">Rp</span><input class="span2" id="prependedInput" name="f[harga]" size="16" type="text">
                    </div>
                    </div>
                    </div> 
                    
                    <div class="control-group">
                    <label class="control-label">Status</label>
                    <div class="controls">
                     <label class="checkbox">
                     <input type="checkbox" name="sudahbayar" value="Sudah"> Sudah Bayar
                     </label>
                    </div>
                    </div>
                    
                    <div class="control-group">
                    <label class="control-label">Tanggal Selesai</label>
                    <div class="controls">
                    <div class="input-append date" id="dp4" data-date="<?php echo date("Y-m-d") ?>" data-date-format="yyyy-mm-dd" onclick="dates()">
                    <input class="span2" size="16" type="text" name="f[tglselesai]" value="<?php echo date("Y-m-d") ?>">
                    <span class="add-on"><i class="icon-th"></i></span>
                    </div>
                     <script>
                      function dates(){
                         $('#dp4').datepicker();
                         //$('#dp3').datepicker('show');                          
                      }
                    </script>
                    </div>
                    </div>
                    
            </div>
        </div>
                
    </div>
</div>                                  
             <br/>
             <br/>
            <div class="form-actions">
                <input type="submit" class="btn btn-primary" name="simpan" value="simpan"/>
                    <a onclick="history.go(-1)" class="btn">Batal</a>
            </div>
            </div>
        </form>
        </div>
    </div>
</div>
</div>
</div>
