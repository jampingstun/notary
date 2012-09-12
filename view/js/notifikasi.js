var idtransaksi;         // this will be our datastore
var tglmasuk;       // this will be our columnmodel
var idpemohon;
var idgrouptr;
var judul;
var jmlberkas;
var status;
var jmlberkasselesai;
var harga;
var sudahbayar;
var tglselesai;
 
Ext.onReady(function(){
Ext.QuickTips.init();
var Checkbox = new Ext.grid.CheckboxSelectionModel();
//var scrl = new Ext.grid.determineScrollbars();
PemohonDataStore = new Ext.data.Store({
      id: 'PemohonDataStore',
      proxy: new Ext.data.HttpProxy({
                url: 'controller/notifikasi.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:
		{
		    orderby:'idtransaksi',
                    sort:'DESC'
	  
	    }, // this parameter asks for listing
      reader: new Ext.data.JsonReader({   
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[ 
        {name: 'idtransaksi', type: 'int', mapping: 'idtransaksi'},
        {name: 'tglmasuk', type: 'string', mapping: 'tglmasuk'},
        {name: 'noktp', type: 'int', mapping: 'noktp'},
        {name: 'nmgrouptr', type: 'string', mapping: 'nmgrouptr'},
        {name: 'judul', type: 'string', mapping: 'judul'},
        {name: 'jmlberkas', type: 'int', mapping: 'jmlberkas'},
        {name: 'status', type: 'string', mapping: 'status'},
        {name: 'jmlberkasselesai', type: 'int', mapping: 'jmlberkasselesai'},
        {name: 'harga', type: 'int', mapping: 'harga'},
        {name: 'sudahbayar', type: 'string', mapping: 'sudahbayar'},
        {name: 'tglselesai', type: 'string', mapping: 'tglselesai'}
      ]),
      sortInfo:{field: 'idtransaksi', direction: "ASC"}
    });
     PemohonDataStore.load();
    var ComboDataStore = new Ext.data.Store({
      id:'ComboDataStore',
      proxy: new Ext.data.HttpProxy({
          url: 'controller/combo.php?act=grouptransaksi',
          method: 'POST'
      }),
      reader: new Ext.data.JsonReader({
          root: 'results',
          totalProperty: 'total'
      },
      [
        {name: 'idgrouptr', type: 'int', mapping: 'idgrouptr'},
        {name: 'nmgrouptr', type: 'string', mapping: 'nmgrouptr'},
        {name: 'pbgrouptr', type: 'string', mapping: 'pbgrouptr'},  
      ]),
      sortInfo:{field: 'idgrouptr', direction: "ASC"}
  });
  ComboDataStore.load();
  
 DataStore = new Ext.data.Store({
      id: 'PemohonDataStore',
      proxy: new Ext.data.HttpProxy({
                url: 'controller/pemohon.php?act=show',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task: "LISTING"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({   
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total'
      },[ 
        {name: 'idpemohon', type: 'int', mapping: 'idpemohon'},
        {name: 'nmgrouppemohon', type: 'string', mapping: 'nmgrouppemohon'},
        {name: 'tgldaftarpemohon', type: 'string', mapping: 'tgldaftarpemohon'},
        {name: 'noktp', type: 'string', mapping: 'noktp'},
        {name: 'pbpemohon', type: 'string', mapping: 'pbpemohon'}
      ]),
      sortInfo:{field: 'idpemohon', direction: "ASC"}
    });
 DataStore.load();
 PemohonColumnModel = new Ext.grid.ColumnModel(
    [   Checkbox,{
        header: 'Tanggal Selesai',
        dataIndex: 'tglselesai',
        width: 100,
        editor: new Ext.form.TextField({  // rules about editing
            allowBlank: false,
            maxLength: 20,
            maskRe: /([a-zA-Z0-9\s]+)$/   // alphanumeric + spaces allowed
          })
      },
      {
        header: 'Tanggal Masuk',
        dataIndex: 'tglmasuk',
        width: 110,
        hidden: false
  
      },{
        header: 'No KTP Pemohon',
        dataIndex: 'noktp',
        width: 100,
        editor: new Ext.form.TextField({
          allowBlank: false,
          maxLength: 20,
          maskRe: /([a-zA-Z0-9\s]+)$/
          })
      },{
        header: 'Group Transaksi',
        dataIndex: 'nmgrouptr',
        width: 120,
        readOnly: true                     // we don't necessarily want to see this...
      },{
        header: 'Judul',
        dataIndex: 'judul',
        width: 120,
        readOnly: true
      },{
        header: 'Jumlah Berkas',
        dataIndex: 'jmlberkas',
        width: 100,
        readOnly: true
      },{
        header: 'Status',
        dataIndex: 'status',
        width: 100,
        readOnly: true
      },{
        header: 'Jumlah Berkas Selesai',
        dataIndex: 'jmlberkasselesai',
        width: 120,
        readOnly: true
      }
      ,{
        header: "Harga",
        dataIndex: 'harga',
        width: 120,
        readOnly: true
      },{
        header: 'Sudah Bayar',
        dataIndex: 'sudahbayar',
        width: 100,
        readOnly: true
      }
      ]
    );
    PemohonColumnModel.defaultSortable= true;
 

//==================================================//
	//                             FORM TAMBAH DATA                               //
	//==================================================//
	var tambah = new Ext.FormPanel({
		url:'controller/setnotifikasi.php?act=add',
		baseParams:{
			act:"add"
		},
        width: 450,         		
	autoheight:true,
        bodyStyle:'padding:5px 5px 0',		                
        labelWidth: 130,		
        defaults: {allowBlank: false},
		
        items: [
	
	{
            xtype: 'textfield',
            fieldLabel: 'Konfigurasi Hari',			
            anchor: '80%',
            name: 'notif'	
        }	
		],
        buttons: [{
            text: 'Atur',
            handler: function(){
              
			  tambah.getForm().submit({
	                               
				success: function(tambah, o)
				{ 							 
					PemohonDataStore.reload();
					TambahForm.hide();	
				},
						
				failure: function(tambah, o)
				{							 
					Ext.MessageBox.alert('Warning','Failur');    
				}     
	            });
                
            }
        },{
            text: 'Reset',
            handler: function()
			{
                tambah.getForm().reset();
            }
        }]
    });
 
       
	var TambahForm = new Ext.Window({      
	    title: 'Tambah Data',	  
	    closable:true,
            closeAction:'hide',	 
	    width:500,
	    height:150,       
            layout: 'fit',		       
		    
		listeners : {
			show : function () {
				tambah.getForm().reset();
			}
		},
		modal: true,
		items: tambah
	    });
		
	function displayTambahForm(){
	    if(!TambahForm.isVisible())
		{      
	       TambahForm.show();
	    } 
		else 
		{
	       TambahForm.toFront();
	    }
	  }
          
     function del(btn)
                {
		if(btn == 'yes')
		{
			var m = EditorGrid.getSelectionModel().getSelections();
			var store = EditorGrid.getStore();
			
			for(var i=0; i< m.length; i++){
				var rec = m[i];
				if(rec){
					PemohonDataStore.load({
						params:{del:rec.get("idtransaksi"),start:0,limit:10},
						callback: function(){	
						}
					});store.remove(rec);
				}
			}
			
		}
	}
        
      function startAdvancedSearch(){
      var GroupSearchForm;
      var GroupSearchWindow;
      var Searchdata1;
      var Searchisi1;
      var Searchdata2;
      var Searchisi2;
     Searchdata1 = new Ext.form.ComboBox({ 
                        fieldLabel: 'Cari Berdasarkan',
                        maxLength: 20,
                        anchor : '95%',
                        typeAhead: true,
                        mode: 'local',
                        triggerAction: 'all',
                        forceSelection: true,
                        selectOnFocus:true,
                        emptyText: 'Pilih Data...',
                        store: ['tglmasuk', 'judul', 'jmlberkas', 'status', 'jmlberkasselesai', 'tglselesai'] 
                    });
      Searchisi1= new Ext.form.TextField({
          fieldLabel: 'Tulis Data',
          maxLength: 20,
          anchor : '95%',
          maskRe: /([a-zA-Z0-9\s]+)$/
            });

       Searchdata2 = new Ext.form.ComboBox({ 
                        fieldLabel: 'Cari Berdasarkan',
                        maxLength: 20,
                        anchor : '95%',
                        typeAhead: true,
                        mode: 'local',
                        triggerAction: 'all',
                        forceSelection: true,
                        selectOnFocus:true,
                        emptyText: 'Pilih Data...',
                        store: ['tglmasuk', 'judul', 'jmlberkas', 'status', 'jmlberkasselesai', 'tglselesai']
                    });
                    
      Searchisi2 = new Ext.form.TextField({
          fieldLabel: 'Tulis Data',
          maxLength: 20,
          anchor : '95%',    
          maskRe: /([a-zA-Z0-9\s]+)$/  
            });
          
      GroupSearchForm = new Ext.FormPanel({
       labelAlign: 'top',
       bodyStyle: 'padding: 5px',
       width: 300,
       items: [{
         layout: 'form',
         border: false,
         items: [ Searchdata1,Searchisi1,Searchdata2,Searchisi2],
         buttons: [{
               text: 'Search',
               handler: function listSearch(){
                             PemohonDataStore.baseParams = {
                                act: 'cari',
                                tipedata1: Searchdata1.getValue(),
                                data1 : Searchisi1.getValue(),
                                tipedata2: Searchdata2.getValue(),
                                data2 : Searchisi2.getValue()
                                    };
                            PemohonDataStore.reload();
                        }
             },{
               text: 'Reset',
               handler: function resetSearch(){
                        // reset the store parameters
                                PemohonDataStore.baseParams = {
                                        task: 'LISTING'
                                };
                        // Cause the datastore to do another query : 
                        PemohonDataStore.reload();
                        GroupSearchWindow.close();
                    }
             }]
         }]
     });
     
     GroupSearchWindow = new Ext.Window({
         title: 'Cari Data Group Pemohon',
         closable:true,
         width: 200,
         height: 350,
         plain:true,
         layout: 'fit',
         items: GroupSearchForm
     });
     
        GroupSearchWindow.show();

        }
		  
	var EditorGrid =  new Ext.grid.GridPanel({	    
		store: PemohonDataStore,
                title:'Data Transaksi',
                iconCls:'icon-grid',
		closable: true,
                loadMask: true,
                autoWidth : true,
                height: 'auto',
                layout:'fit',
                autoScroll:true,
                stripeRows: true,
                enableColLock:false,
                cm: PemohonColumnModel,		
		sm: Checkbox,
                selModel: new Ext.grid.RowSelectionModel({singleSelect:false}),
 
	    tbar:[	
			{
			    text: 'Konfigurasi Hari',		 
                            iconCls:'add',
                            tooltip:'Konfigurasi Hari Pemberitahuan',
			    handler: displayTambahForm
			},'-', {
                            text: 'Cari',
                            tooltip: 'Pencarian Data',
                            handler: startAdvancedSearch,  // search function
                            iconCls:'search'               // we'll need to add this to our css
                        },'-', 
			{
				text:'Set Selesai',
				iconCls:'remove',
                                tooltip:'Hapus data yang dipilih',
				handler: function()
				{
					var m = EditorGrid.getSelectionModel().getSelections();
					if(m.length > 0)
					{
						Ext.MessageBox.confirm('Konfirmasi', 'Apakah Anda Yakin Menghapus Field Ini?' , del);						
					}
					else
					{
						Ext.MessageBox.alert('Warning', 'Pilih Salah Satu Yang Mau Anda Hapus');
					}
				}
			
			}
 		],    
        
	collapsible: true,
        animCollapse: true,
        
	    
	  
	    bbar: new Ext.PagingToolbar({
            pageSize: 11,
            store: PemohonDataStore,
            displayInfo: true,
            displayMsg: 'Menampilkan data {0} - {1} dari {2}',
            emptyMsg: "Tidak ada data"
        })
	    });
  EditorGrid.render('dok');      // Load the data
 
  });
