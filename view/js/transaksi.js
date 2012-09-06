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
                url: 'controller/transaksi.php?act=show',      // File to connect to
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
            displayField: 'nmgrouptr',
            typeAhead: true,
            mode: 'local',
            triggerAction: 'all',
            forceSelection: true,
            selectOnFocus:true,
            emptyText: 'Pilih Group ...',
            name: 'nmgrouptr'
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
			id: 'idpemohon',
			fields: [
				'idtransaksi','tglmasuk','noktp','nmgrouptr','judul','jmlberkas','status','jmlberkasselesai','harga','sudahbayar','tglselesai'
			]
		}),
        items: 
		[
		new Ext.form.Hidden 
		({
			name: 'idtransaksi'					
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
            displayField: 'nmgrouptr',
            typeAhead: true,
            mode: 'local',
            triggerAction: 'all',
            forceSelection: true,
            selectOnFocus:true,
            emptyText: 'Pilih Group ...',
            name: 'nmgrouptr'
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
						params:{del:rec.get("idtransaksi"),start:0,limit:10},
						callback: function(){	
						}
					});store.remove(rec);
				}
			}
			
		}
	}
  function prt(btn)
	{
		if(btn == 'yes')
		{
			var m = EditorGrid.getSelectionModel().getSelections();
			var store = EditorGrid.getStore();
			var abc = new Array();
                        var te = '0';
			for(var i=0; i< m.length; i++){
				var rec = m[i];
                                abc.push(m[i].get("idtransaksi"));
			}
                        PemohonDataStore.load({
                                params:{prt:abc.toString()},
                                callback: function(){
                                    te = '1';
                                    
                                }
                                
                        });
                        var si = setInterval(function() {
                            if (te=='1') {
                                window.location='assets/htmltodoc/laporan_transaksi.doc';
                                clearInterval(si);
                                te=='0';
                            }
                        }, 10); 
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
		  
                  
  	//////////////////////////////////////////
        //                 FILTER FILTER
       //////////////////////////////////////////////////////////////// 
        
    function startAdvancedFilter(){
      // local vars
      var GroupFilterForm;
      var GroupFilterWindow;
      var drmsk,smmsk,drsel,smsel,selesai,group,lunas;

      drmsk = new Ext.form.DateField({
          fieldLabel: 'Dari',
          maxLength: 10,
          format: 'd-m-Y',
          anchor: '100%',
          maskRe: /([a-zA-Z0-9\s]+)$/
            });
           
      smmsk = new Ext.form.DateField({
          fieldLabel: 'Sampai',
          maxLength: 10,
          format: 'd-m-Y',
          anchor: '100%',
          maskRe: /([a-zA-Z0-9\s]+)$/  
            });
            
      drsel = new Ext.form.DateField({
          fieldLabel: 'Dari',
          maxLength: 10,
          format: 'd-m-Y',
          anchor: '100%',
          maskRe: /([a-zA-Z0-9\s]+)$/
            });
           
      smsel = new Ext.form.DateField({
          fieldLabel: 'Sampai',
          maxLength: 10,
          format: 'd-m-Y',
          anchor: '100%',
          maskRe: /([a-zA-Z0-9\s]+)$/  
            });
      
      selesai = new Ext.form.ComboBox({ 
                        fieldLabel: 'Status',
                        maxLength: 20,
                        anchor : '100%',
                        typeAhead: true,
                        mode: 'local',
                        triggerAction: 'all',
                        forceSelection: true,
                        selectOnFocus:true,
                        emptyText: '',
                        store: ['Selesai','Belum Selesai'] 
                    });
                    
      lunas = new Ext.form.ComboBox({ 
                        fieldLabel: 'Status',
                        maxLength: 20,
                        anchor : '100%',
                        typeAhead: true,
                        mode: 'local',
                        triggerAction: 'all',
                        forceSelection: true,
                        selectOnFocus:true,
                        emptyText: '',
                        store: ['Lunas','Belum Lunas'] 
                    });
                    
      group = new Ext.form.ComboBox({
          fieldLabel: 'Group Transaksi',
            store: ComboDataStore,
            local: true,
            anchor: '100%',
            displayField: 'nmgrouptr',
            typeAhead: true,
            mode: 'local',
            triggerAction: 'all',
            forceSelection: true,
            selectOnFocus:true,
            emptyText: '',
            name: 'grouptr'
      });       
                    
      GroupFilterForm = new Ext.FormPanel({
       layout: 'anchor',
       items: [{
         layout: 'form',
         title: 'Tanggal Masuk',
         border: false,
         anchor: '100%',
         items: [drmsk,smmsk]
         },{
         layout: 'form',
         title: 'Tanggal Selesai',
         border: false,
         anchor: '100%',
         items: [drsel,smsel]
         },{
         layout: 'form',
         title: 'Selesai',
         border: false,
         anchor: '100%',
         items: [selesai]
         },{
         layout: 'form',
         title: 'Pembayaran',
         border: false,
         anchor: '100%',
         items: [lunas]
         },{
         layout: 'form',
         title: 'Group',
         border: false,
         anchor: '100%',
         items: [group]
         }],
       buttons: [{
               text: 'Filter',
               handler: function listFilter(){
                            // render according to a SQL date format.

                            // change the store parameters
                            // PemohonDataStore.baseParams = ;
                            // Cause the datastore to do another query : 
                            var vdrmsk,vsmmsk;
                            if(drmsk.getValue() != '' && smmsk.getValue() != '' ){
                                vdrmsk = drmsk.getValue().dateFormat('d-m-Y');
                                vsmmsk = smmsk.getValue().dateFormat('d-m-Y');
                            }
                            
                            var vdrsel,vsmsel;
                            if(drsel.getValue() != '' && smsel.getValue() != '' ){
                                vdrsel = drsel.getValue().dateFormat('d-m-Y');
                                vsmsel = smsel.getValue().dateFormat('d-m-Y');
                            }
                             PemohonDataStore.baseParams = {
                                fil: 'filter',
                                drmsk: vdrmsk,
                                smmsk : vsmmsk,
                                drsel: vdrsel,
                                smsel : vsmsel,
                                lunas : lunas.getValue(),
                                selesai: selesai.getValue(),
                                group: group.getValue()
//                                tipedata2: Filterdata2.getValue(),
//                                data2 : Filterisi2.getValue()
                                    };
                            // Cause the datastore to do another query :
                            PemohonDataStore.reload();
                        }
             },{
               text: 'Reset',
               handler: function resetFilter(){
                        // reset the store parameters
                                PemohonDataStore.baseParams = {
                                        task: 'LISTING'
                                };
                        // Cause the datastore to do another query : 
                        PemohonDataStore.reload();
                        GroupFilterWindow.close();
                    }
             
         }]
     });
     
     GroupFilterWindow = new Ext.Window({
         title: 'Filter Data Group Transaksi',
         closable:true,
         width: 300,
         height: 600,
         x: 100,
         plain:true,
         layout: 'fit',
         items: GroupFilterForm
     });
     
 
     // once all is done, show the filter window
        GroupFilterWindow.show();

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
                        },'-', {
                            text: 'Filter',
                            tooltip: 'Filter Data',
                            handler: startAdvancedFilter,  // search function
                            iconCls:'filter'               // we'll need to add this to our css
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
					    Edit.getForm().load({url:'controller/transaksi.php?act=get&idtransaksi='+ m[0].get('idtransaksi'), waitMsg:'Loading'});
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
			
			},'-',
                        
                        {
				text:'Cetak',
				iconCls:'print',
                                tooltip:'Cetak data yang dipilih',
				handler: function()
				{
					var m = EditorGrid.getSelectionModel().getSelections();
					if(m.length > 0)
					{
						Ext.MessageBox.confirm('Konfirmasi', 'Apakah Anda Yakin Mencetak Field Ini?' , prt);						
					}
					else
					{
						Ext.MessageBox.alert('Warning', 'Pilih Salah Satu Yang Mau Anda Cetak');
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
