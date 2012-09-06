var nmgrouptr;       // this will be our columnmodel
var idgrouptr;
var pbgrouptr;
 
Ext.onReady(function(){
Ext.QuickTips.init();
var Checkbox = new Ext.grid.CheckboxSelectionModel();	
PemohonDataStore = new Ext.data.Store({
      id: 'PemohonDataStore',
      proxy: new Ext.data.HttpProxy({
                url: 'controller/grouptransaksi.php?act=show',      // File to connect to
                method: 'POST'
            }),
            baseParams:
		{
		    orderby:'idgrouptr',
                    sort:'DESC'
	  
	    }, // this parameter asks for listing
      reader: new Ext.data.JsonReader({   
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[ 
        {name: 'idgrouptr', type: 'int', mapping: 'idgrouptr'},
        {name: 'nmgrouptr', type: 'string', mapping: 'nmgrouptr'},
        {name: 'pbgrouptr', type: 'string', mapping: 'pbgrouptr'}
      ]),
      sortInfo:{field: 'idgrouptr', direction: "ASC"}
    });
     PemohonDataStore.load();
    PemohonColumnModel = new Ext.grid.ColumnModel(
    [   Checkbox,
      {
        header: 'Nama Group Transaksi',
        dataIndex: 'nmgrouptr',
        width: 150,
        hidden: false
      },{
        header: 'Status',
        dataIndex: 'pbgrouptr',
        width: 150,
        readOnly: true                     // we don't necessarily want to see this...
      }]
    );
    PemohonColumnModel.defaultSortable= true;

//==================================================//
	//                             FORM TAMBAH DATA                               //
	//==================================================//
	var tambah = new Ext.FormPanel({
		url:'controller/grouptransaksi.php?act=add',
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
            fieldLabel: 'Nama Group',			
			anchor: '80%',
			name: 'f[nmgrouptr]'
			
        },
        {
            xtype: 'combo',
            fieldLabel: 'Status',
            name: 'f[pbgrouptr]',
            anchor: '80%',
            store: new Ext.data.SimpleStore({
                    data: [
                            [0, 'Aktif'],
                            [1, 'Tidak Aktif']
                    ],
                    fields: ['value', 'text']
            }),
            mode: 'local',
            valueField: 'value',
            displayField: 'text',
            triggerAction: 'all',
            editable: false
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
	    title: 'Tambah Data Group Pemohon',	  
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
		
	//===================================================
	//                              FORM EDIT DATA                                      //
	//===================================================
	var Edit = new Ext.form.FormPanel({
	    url:'controller/grouptransaksi.php?act=edit',   
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
			id: 'idgrouptr',
			fields: [
				'idgrouptr','nmgrouptr','pbgrouptr'
			]
		}),
        items: 
		[
		new Ext.form.Hidden 
		({
                    name: 'idgrouptr'
		}),
		
	{
            xtype: 'textfield',
            fieldLabel: 'Nama Group Transaksi',			
			anchor: '80%',
			name: 'nmgrouptr',
                        id: 'nmgrouptr'
			
        },
	{
            xtype: 'combo',
            fieldLabel: 'Status Group',			
            anchor: '80%',
            store: ['aktif','tidak aktif'],
            displayField: 'pbgrouptr',
            typeAhead: true,
            mode: 'local',
            triggerAction: 'all',
            forceSelection: true,
            selectOnFocus:true,
            name: 'pbgrouptr'
        }			
		],
		
		buttons: [{
            text: 'Save',
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
	    width:400,
	    height:200,       
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
                        var abc = new Array();
			for(var i=0; i< m.length; i++){
				var rec = m[i];
                                abc.push(m[i].get("idgrouptr"));
				if(rec){
					PemohonDataStore.load({
						params:{del:rec.get("idgrouptr"),start:0,limit:10},
						callback: function(){

						}
					});store.remove(rec);
				}
			}
			alert(abc);
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
                                abc.push(m[i].get("idgrouptr"));
			}
                        PemohonDataStore.load({
                                params:{prt:abc.toString()},
                                callback: function(){
                                    te = '1';
                                    
                                }
                                
                        });
                        var si = setInterval(function() {
                            if (te=='1') {
                                window.location='assets/htmltodoc/laporan_grouptransaksi.doc';
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
      var SearchIdGroup;
      var SearchNmGroup;
      var SearchPbGroup;
 
//      SearchIdGroup= new Ext.form.TextField({
//          fieldLabel: 'ID Group',
//          maxLength: 20,
//          anchor : '95%',
//          maskRe: /([a-zA-Z0-9\s]+)$/
//            });
 
      SearchNmGroup = new Ext.form.TextField({
          fieldLabel: 'Nama Group',
          maxLength: 20,
          anchor : '95%',    
          maskRe: /([a-zA-Z0-9\s]+)$/  
            });
            
//      SearchPbGroup = new Ext.form.ComboBox({ 
//                        fieldLabel: 'Status',
//                        maxLength: 20,
//                        anchor : '95%',
//                        typeAhead: true,
//                        mode: 'local',
//                        triggerAction: 'all',
//                        forceSelection: true,
//                        selectOnFocus:true,
//                        emptyText: 'Pilih Data...',
//                        store: ['Aktif','Tidak Aktif'] 
//                    });
          
      GroupSearchForm = new Ext.FormPanel({
       labelAlign: 'top',
       bodyStyle: 'padding: 5px',
       width: 300,
       items: [{
         layout: 'form',
         border: false,
         items: [ SearchNmGroup],
         buttons: [{
               text: 'Search',
               handler: function listSearch(){
                            // render according to a SQL date format.

                            // change the store parameters
                                //PemohonDataStore.baseParams = ;
                            // Cause the datastore to do another query : 
                             PemohonDataStore.baseParams = {
                                act: 'cari',
                            //    idgrouptransaksi : SearchIdGroup.getValue(),
                                nmgrouptransaksi : SearchNmGroup.getValue()
                           //     pbgrouptransaksi : SearchPbGroup.getValue()
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
         height: 200,
         plain:true,
         layout: 'fit',
         items: GroupSearchForm
     });
     
 
     // once all is done, show the search window
        GroupSearchWindow.show();

        }
//


      function startAdvancedFilter(){
      // local vars
      
      var GroupFilterForm;
      var GroupFilterWindow;
      var FilterIdGroup;
      var FilterNmGroup;
      var FilterPbGroup;
 
//      FilterIdGroup= new Ext.form.TextField({
//          fieldLabel: 'ID Group',
//          maxLength: 20,
//          anchor : '95%',
//          maskRe: /([a-zA-Z0-9\s]+)$/
//            });
 
//      FilterNmGroup = new Ext.form.TextField({
//          fieldLabel: 'Nama Group',
//          maxLength: 20,
//          anchor : '95%',    
//          maskRe: /([a-zA-Z0-9\s]+)$/  
//            });
            
      FilterPbGroup = new Ext.form.ComboBox({ 
                        fieldLabel: 'Status',
                        maxLength: 20,
                        anchor : '95%',
                        typeAhead: true,
                        mode: 'local',
                        triggerAction: 'all',
                        forceSelection: true,
                        selectOnFocus:true,
                        emptyText: 'Pilih Data...',
                        store: ['Aktif','Tidak Aktif'] 
                    });
          
      GroupFilterForm = new Ext.FormPanel({
       labelAlign: 'top',
       bodyStyle: 'padding: 5px',
       width: 300,
       items: [{
         layout: 'form',
         border: false,
         items: [ FilterPbGroup],
         buttons: [{
               text: 'Filter',
               handler: function listFilter(){
                            // render according to a SQL date format.

                            // change the store parameters
                                //PemohonDataStore.baseParams = ;
                            // Cause the datastore to do another query : 
                             PemohonDataStore.baseParams = {
                                act: 'cari',
                            //    idgrouptransaksi : FilterIdGroup.getValue(),
                           //     nmgrouptransaksi : FilterNmGroup.getValue(),
                                pbgrouptransaksi : FilterPbGroup.getValue()
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
         }]
     });
     
     GroupFilterWindow = new Ext.Window({
         title: 'Filter Data Group Pemohon',
         closable:true,
         width: 200,
         height: 150,
         plain:true,
         layout: 'fit',
         items: GroupFilterForm
     });
     
 
     // once all is done, show the filter window
        GroupFilterWindow.show();

        }


	var EditorGrid =  new Ext.grid.EditorGridPanel({	    
		store: PemohonDataStore,
                title:'Data Group Transaksi',
                iconCls:'icon-grid',
		closable: true,
                loadMask: true,
		layout:'fit',
		autoWidth : true,
                height:350,
                autoScroll:true,
                stripeRows: true,
	    cm: PemohonColumnModel,		
		sm: Checkbox,
 
	    tbar:[	
			{
			    text: 'Tambah',		 
			    iconCls:'add',
			    handler: displayTambahForm
			}, '-', {
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
				handler: function()
				{
					 var m = EditorGrid.getSelectionModel().getSelections();
					 if(m.length > 0)
					 {
					    Edit.getForm().load({url:'controller/grouptransaksi.php?act=get&idgrouptr='+ m[0].get('idgrouptr'), waitMsg:'Loading'});
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
	    viewConfig: {
            forceFit:true
        },	    
        
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
