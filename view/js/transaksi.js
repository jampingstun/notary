var id_transaksi;         // this will be our datastore
var tglmasuk;       // this will be our columnmodel
var id_pemohon;
var id_grouptr;
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
                url: 'controller/transaksi.php?act=show',      // File to connect to
                method: 'POST'
            }),
            baseParams:
		{
		    orderby:'id_transaksi',
                    sort:'DESC'
	  
	    }, // this parameter asks for listing
      reader: new Ext.data.JsonReader({   
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[ 
        {name: 'id_transaksi', type: 'int', mapping: 'id_transaksi'},
        {name: 'tglmasuk', type: 'string', mapping: 'tglmasuk'},
        {name: 'noktp', type: 'int', mapping: 'noktp'},
        {name: 'nm_grouptr', type: 'string', mapping: 'nm_grouptr'},
        {name: 'judul', type: 'string', mapping: 'judul'},
        {name: 'jmlberkas', type: 'int', mapping: 'jmlberkas'},
        {name: 'status', type: 'string', mapping: 'status'},
        {name: 'jmlberkasselesai', type: 'int', mapping: 'jmlberkasselesai'},
        {name: 'harga', type: 'int', mapping: 'harga'},
        {name: 'sudahbayar', type: 'string', mapping: 'sudahbayar'},
        {name: 'tglselesai', type: 'string', mapping: 'tglselesai'}
      ]),
      sortInfo:{field: 'id_transaksi', direction: "ASC"}
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
        {name: 'id_grouptr', type: 'int', mapping: 'id_grouptr'},
        {name: 'nm_grouptr', type: 'string', mapping: 'nm_grouptr'},
        {name: 'pb_grouptr', type: 'string', mapping: 'pb_grouptr'},  
      ]),
      sortInfo:{field: 'id_grouptr', direction: "ASC"}
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
        {name: 'nm_grouppemohon', type: 'string', mapping: 'nm_grouppemohon'},
        {name: 'tgldaftarpemohon', type: 'string', mapping: 'tgldaftarpemohon'},
        {name: 'noktp', type: 'string', mapping: 'noktp'},
        {name: 'pbpemohon', type: 'string', mapping: 'pbpemohon'}
      ]),
      sortInfo:{field: 'idpemohon', direction: "ASC"}
    });
 DataStore.load();
 PemohonColumnModel = new Ext.grid.ColumnModel(
    [   Checkbox,
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
        dataIndex: 'nm_grouptr',
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
      ,{
        header: 'Tanggal Selesai',
        dataIndex: 'tglselesai',
        width: 100,
        editor: new Ext.form.TextField({  // rules about editing
            allowBlank: false,
            maxLength: 20,
            maskRe: /([a-zA-Z0-9\s]+)$/   // alphanumeric + spaces allowed
          })
      }]
    );
    PemohonColumnModel.defaultSortable= true;
 

//==================================================//
	//                             FORM TAMBAH DATA                               //
	//==================================================//
	var tambah = new Ext.FormPanel({
		url:'controller/transaksi.php?act=add',
		baseParams:{
			act:"add"
		},
        width: 450,         		
	autoheight:true,
        bodyStyle:'padding:5px 5px 0',		                
        labelWidth: 130,		
        defaults: {allowBlank: false},
		
        items: [
        {xtype: 'datefield',
            fieldLabel: 'Tanggal Masuk',
			anchor: '80%',
			name: 'f[tglmasuk]',
                        format: 'Y-m-d'
        },
		
	{
            xtype: 'combo',
            fieldLabel: 'No KTP',			
            anchor: '80%',
            store: DataStore,
            local: true,
            displayField: 'noktp',
            typeAhead: true,
            mode: 'local',
            triggerAction: 'all',
            forceSelection: true,
            selectOnFocus:true,
            name: 'noktp'		
        },
		{
            xtype: 'combo',
            fieldLabel: 'Group Transaksi',
            store: ComboDataStore,
            local: true,
            anchor: '80%',
            displayField: 'nm_grouptr',
            typeAhead: true,
            mode: 'local',
            triggerAction: 'all',
            forceSelection: true,
            selectOnFocus:true,
            emptyText: 'Pilih Group ...',
            name: 'nm_grouptr'
        },{
            xtype: 'textfield',
            fieldLabel: 'Judul',			
			anchor: '80%',
			name: 'f[judul]'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Jumlah Berkas',			
			anchor: '80%',
			name: 'f[jmlberkas]'
        },
        {
            xtype: 'combo',
            fieldLabel: 'status',			
            anchor: '80%',
            displayField: 'status',
            typeAhead: true,
            mode: 'local',
            triggerAction: 'all',
            forceSelection: true,
            selectOnFocus:true,
            emptyText: 'Pilih Status ...',
            name: 'status',
            store: ['Selesai','Belum Selesai']
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Jumlah Berkas Selesai',			
			anchor: '80%',
			name: 'f[jmlberkasselesai]'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Harga',			
			anchor: '80%',
			name: 'f[harga]'
        },
        {
            xtype: 'combo',
            fieldLabel: 'Sudah Bayar',			
            anchor: '80%',
            displayField: 'sudahbayar',
            typeAhead: true,
            mode: 'local',
            triggerAction: 'all',
            forceSelection: true,
            selectOnFocus: true,
            emptyText: 'Pilih Status ...',
            name: 'sudahbayar',
            store: ['Sudah','Belum']
        },
        {
            xtype: 'datefield',
            fieldLabel: 'Tanggal Selesai',			
			anchor: '80%',
			name: 'f[tglselesai]',
                        format: 'Y-m-d'
        }
		
		
			
		],
        buttons: [{
            text: 'Save',
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
	    height:450,       
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
		
	//===================================================
	//                              FORM EDIT DATA                                      //
	//===================================================
	var Edit = new Ext.form.FormPanel({
	    url:'controller/transaksi.php?act=edit',   
		baseParams:{
			act:"edit"
		},		
		 
                width: 450,         		
                autoheight:true,
                bodyStyle:'padding:5px 5px 0',		                
                labelWidth: 130,		
		frame:true,        
		reader: new Ext.data.JsonReader ({
			root: 'results',
			totalProperty: 'total',
			id: 'id_pemohon',
			fields: [
				'id_transaksi','tglmasuk','noktp','nm_grouptr','judul','jmlberkas','status','jmlberkasselesai','harga','sudahbayar','tglselesai'
			]
		}),
        items: 
		[
		new Ext.form.Hidden 
		({
			name: 'id_transaksi'					
		}),
        {xtype: 'datefield',
            fieldLabel: 'Tanggal Masuk',
			anchor: '80%',
			name: 'tglmasuk',
                        id: 'tglmasuk',
                        format: 'Y-m-d'
        },
		
		{
            xtype: 'combo',
            fieldLabel: 'No KTP',			
            anchor: '80%',
            store: DataStore,
            local: true,
            displayField: 'noktp',
            typeAhead: true,
            mode: 'local',
            triggerAction: 'all',
            forceSelection: true,
            selectOnFocus:true,
            name: 'noktp'		
        },
		{
            xtype: 'combo',
            fieldLabel: 'Group Transaksi',
            store: ComboDataStore,
            local: true,
            anchor: '80%',
            displayField: 'nm_grouptr',
            typeAhead: true,
            mode: 'local',
            triggerAction: 'all',
            forceSelection: true,
            selectOnFocus:true,
            emptyText: 'Pilih Group ...',
            name: 'nm_grouptr'
        },{
            xtype: 'textfield',
            fieldLabel: 'Judul',			
			anchor: '80%',
			name: 'judul',
                        id: 'judul'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Jumlah Berkas',			
			anchor: '80%',
			name: 'jmlberkas',
                        id: 'jmlberkas'
        },
        {
            xtype: 'combo',
            fieldLabel: 'status',			
            anchor: '80%',
            displayField: 'status',
            typeAhead: true,
            mode: 'local',
            triggerAction: 'all',
            forceSelection: true,
            selectOnFocus:true,
            emptyText: 'Pilih Status ...',
            name: 'status',
            store: ['Selesai','Belum Selesai']
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Jumlah Berkas Selesai',			
			anchor: '80%',
			name: 'jmlberkasselesai',
                        id: 'jmlberkasselesai'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Harga',			
			anchor: '80%',
			name: 'harga',
                        id: 'harga'
        },
        {
            xtype: 'combo',
            fieldLabel: 'Sudah Bayar',			
            anchor: '80%',
            displayField: 'sudahbayar',
            typeAhead: true,
            mode: 'local',
            triggerAction: 'all',
            forceSelection: true,
            selectOnFocus: true,
            emptyText: 'Pilih Status ...',
            name: 'sudahbayar',
            store: ['Sudah','Belum']
        },
        {
            xtype: 'datefield',
            fieldLabel: 'Tanggal Selesai',			
			anchor: '80%',
			name: 'tglselesai',
                        id: 'tglselesai',
                        format: 'Y-m-d'
        }				
		],
		
		buttons: [{
            text: 'SAVE',
			handler:function()
			{
				Edit.getForm().submit
				({
					waitMsg:'Simpan Data...',
					
					success: function(form, action) 
					{
						Ext.MessageBox.alert('Succcess', 'Edit Data Berhasil');
						PemohonDataStore.load({params:{start:0,limit:11}});
						EditForm.hide();
						Edit.getForm().reset();
					},
															
					failure: function(form, action)
					{
						Ext.MessageBox.alert('Error', 'Edit Data Gagal');
						Edit.getForm().reset();
					}
					
				})
			}
        },
		{
            text: 'Cancel',
			handler: function()
			{
				EditForm.hide();
			}
        }]
	});
	var EditForm = new Ext.Window({
            title: 'Edit Input',
            closable:true,
            closeAction:'hide',	 
	    width:500,
	    height:500,       
            layout: 'fit',		
            modal: true,		
        items: [
			Edit
		]
    });
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
						params:{del:rec.get("id_transaksi"),start:0,limit:10},
						callback: function(){	
						}
					});store.remove(rec);
				}
			}
			
		}
	}
        
        function startAdvancedSearch(){
      // local vars
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
                            // render according to a SQL date format.

                            // change the store parameters
                                //PemohonDataStore.baseParams = ;
                            // Cause the datastore to do another query : 
                             PemohonDataStore.baseParams = {
                                act: 'cari',
                                tipedata1: Searchdata1.getValue(),
                                data1 : Searchisi1.getValue(),
                                tipedata2: Searchdata2.getValue(),
                                data2 : Searchisi2.getValue()
                                    };
                            // Cause the datastore to do another query :
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
     
 
     // once all is done, show the search window
        GroupSearchWindow.show();

        }
		  
	var EditorGrid =  new Ext.grid.GridPanel({	    
		store: PemohonDataStore,
                title:'Data Transaksi',
                iconCls:'icon-grid',
		closable: true,
                loadMask: true,
                autoWidth : true,
                height:350,
                layout:'fit',
                autoScroll:true,
                stripeRows: true,
                enableColLock:false,
                cm: PemohonColumnModel,		
		sm: Checkbox,
                selModel: new Ext.grid.RowSelectionModel({singleSelect:false}),
 
	    tbar:[	
			{
			    text: 'Tambah',		 
                            iconCls:'add',
                            tooltip:'Tambah data baru',
			    handler: displayTambahForm
			},'-', {
                            text: 'Cari',
                            tooltip: 'Pencarian Data',
                            handler: startAdvancedSearch,  // search function
                            iconCls:'search'               // we'll need to add this to our css
                        },'-', 
	    
     		{
				text:'Edit',
				iconCls:'edit',
                                tooltip:'Edit data yang dipilih',
				handler: function()
				{
					 var m = EditorGrid.getSelectionModel().getSelections();
					 if(m.length > 0)
					 {
					    Edit.getForm().load({url:'controller/transaksi.php?act=get&id_transaksi='+ m[0].get('id_transaksi'), waitMsg:'Loading'});
						EditForm.show();			 
					 }
					 else
					 {
						Ext.MessageBox.alert('Warning', 'Pilih Salah Satu Yang Mau Anda Edit');
					 }
				}
		 
			},'-', 
			
			{
				text:'Hapus',
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
//	    viewConfig: {
//            forceFit:true
//        },	    
        
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
