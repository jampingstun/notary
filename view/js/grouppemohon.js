var nmgroppemohon;       // this will be our columnmodel
var idgrouppemohon;
var pbgrouppemohon;
 
Ext.onReady(function(){
  Ext.QuickTips.init();
var Checkbox = new Ext.grid.CheckboxSelectionModel();	
PemohonDataStore = new Ext.data.Store({
      id: 'PemohonDataStore',
      proxy: new Ext.data.HttpProxy({
                url: 'controller/grouppemohon.php?act=show',      // File to connect to
                method: 'POST'
            }),
            baseParams:
		{
		    orderby:'idgrouppemohon',
                    sort:'DESC'
	  
	    }, // this parameter asks for listing
      reader: new Ext.data.JsonReader({   
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
        {name: 'idgrouppemohon', type: 'int', mapping: 'idgrouppemohon'},
        {name: 'nmgrouppemohon', type: 'string', mapping: 'nmgrouppemohon'},
        {name: 'pbgrouppemohon', type: 'string', mapping: 'pbgrouppemohon'}
      ]),
      sortInfo:{field: 'idgrouppemohon', direction: "ASC"}
    });
    
     PemohonDataStore.load();
    PemohonColumnModel = new Ext.grid.ColumnModel(
    [   Checkbox,
//        {
//        header: 'ID Group Pemohon',
//        readOnly: true,
//        dataIndex: 'idgrouppemohon', // this is where the mapped name is important!
//        width: 150,
//        hidden: false
//      },
      {
        header: 'Nama Group Pemohon',
        dataIndex: 'nmgrouppemohon',
        width: 150,
        hidden: false
      },{
        header: 'Status',
        dataIndex: 'pbgrouppemohon',
        width: 150,
        readOnly: true                     // we don't necessarily want to see this...
      }]
    );
    PemohonColumnModel.defaultSortable= true;
 
  //// Load the data
    // Display our window
 
//});

//======================form searching=======================//


//==================================================//
	//                             FORM TAMBAH DATA                               //
	//==================================================//
	var tambah = new Ext.FormPanel({
		url:'controller/grouppemohon.php?act=add',
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
			name: 'f[nmgrouppemohon]'
        },
        {
            xtype: 'combo',
            fieldLabel: 'Status',
            name: 'f[pbgrouppemohon]',
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
                    //      window.location='http://localhost/notproj/controller/grouppemohon.php?act=add';
			  tambah.getForm().submit({ 
	                              
				success: function(tambah, o)
				{ 				
                                  //  alert(o.response.responseText);
					PemohonDataStore.reload();
					TambahForm.hide();	
				},
						
				failure: function(tambah, o)
				{			
                                    alert(o.response.responseText);
                                      //  alert(o.response.responseText);
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
	    url:'controller/grouppemohon.php?act=edit',   
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
			id: 'idgrouppemohon',
			fields: [
				'idgrouppemohon','nmgrouppemohon','pbgrouppemohon'
			]
		}),
        items: 
		[
		new Ext.form.Hidden
		({
			name: 'idgrouppemohon'					
		}),
		
	{
            xtype: 'textfield',
            fieldLabel: 'Nama Group',			
			anchor: '80%',
			name: 'nmgrouppemohon',
                        id: 'nmgrouppemohon'
			
        },
	{
            xtype: 'combo',
            fieldLabel: 'Status Group',			
            anchor: '80%',
            store: ['aktif','tidak aktif'],
            displayField: 'pbgrouppemohon',
            typeAhead: true,
            mode: 'local',
            triggerAction: 'all',
            forceSelection: true,
            selectOnFocus:true,
            name: 'pbgrouppemohon'
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
            title: 'Edit Data Group Pemohon',
            closable:true,
            closeAction:'hide',	 
	    width:500,
	    height:150,       
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
						params:{del:rec.get("idgrouppemohon"),start:0,limit:10},
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
                                abc.push(m[i].get("idgrouppemohon"));
			}
                        PemohonDataStore.load({
                                params:{prt:abc.toString()},
                                callback: function(){
                                    te = '1';
                                    
                                }
                                
                        });
                        var si = setInterval(function() {
                            if (te=='1') {
                                window.location='assets/htmltodoc/laporan_grouppemohon.doc';
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
//      var SearchIdGroup;
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
            
      SearchPbGroup =   new Ext.form.ComboBox({ 
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
          
      GroupSearchForm = new Ext.FormPanel({
       labelAlign: 'top',
       bodyStyle: 'padding: 5px',
       width: 300,
       items: [{
         layout: 'form',
         border: false,
         items: [ SearchNmGroup,SearchPbGroup],
         buttons: [{
               text: 'Search',
               handler: function listSearch(){
                            // render according to a SQL date format.

                            // change the store parameters
                                //PemohonDataStore.baseParams = ;
                            // Cause the datastore to do another query : 
                             PemohonDataStore.baseParams = {
                                act: 'cari',
                                //idgrouppemohon: SearchIdGroup.getValue(),
                                nmgrouppemohon : SearchNmGroup.getValue(),
                                pbgrouppemohon : SearchPbGroup.getValue()
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
		
                
 function startAdvancedFilter(){
      // local vars
      var GroupFilterForm;
      var GroupFilterWindow;
//      var FilterIdGroup;
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
            
      FilterPbGroup =   new Ext.form.ComboBox({ 
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
         items: [FilterPbGroup],
         buttons: [{
               text: 'Filter',
               handler: function listFilter(){
                            // render according to a SQL date format.

                            // change the store parameters
                                //PemohonDataStore.baseParams = ;
                            // Cause the datastore to do another query : 
                             PemohonDataStore.baseParams = {
                                act: 'cari',
                                //idgrouppemohon: FilterIdGroup.getValue(),
                              //  nmgrouppemohon : FilterNmGroup.getValue(),
                                pbgrouppemohon : FilterPbGroup.getValue()
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
                title:'Data Group Pemohon',
                iconCls:'icon-grid',
		closable: true,
                defaults:{autoScroll:true},
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
					    Edit.getForm().load({url:'controller/grouppemohon.php?act=get&idgrouppemohon='+ m[0].get('idgrouppemohon'), waitMsg:'Loading'});
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
