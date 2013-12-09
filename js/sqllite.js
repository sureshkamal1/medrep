//  Declare SQL Query for SQLite

var createStatement = "CREATE TABLE IF NOT EXISTS items(item_id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, parent INTEGER, type TEXT, size INTEGER , created_date DATE,updated_date DATE)";

var selectanitem= "SELECT  * FROM items where item_id=? ";

var selectAllStatement = "SELECT * FROM items";

var selectMainCatStatement = "SELECT item_id, name FROM items where parent='' ";

var selectMainSubCatStatement=  "SELECT item_id, name FROM items where parent=? and type='flow'";

var selectItemsStatement=  "SELECT * FROM items where parent=?";


var insertStatement = "INSERT INTO items (item_id,name,parent,type,size,created_date,updated_date) VALUES (?, ?,?,?,?,?,?)";

var updateStatement = "UPDATE items SET createddate = ?, updateddate = ?,filesize=?,filename=?,filetype=? WHERE id=?";

var deleteStatement = "DELETE FROM items WHERE id=?";

var dropStatement = "DROP TABLE items";

 var db = openDatabase("med_rep", "1.0", "Medical Reprsentative", 200000);  // Open SQLite Database

var dataset;

var DataType;

 function initDatabase()  // Function Call When Page is ready.

{
		
    try {

        if (!window.openDatabase)  // Check browser is supported SQLite or not.

        {

            alert('Databases are not supported in this browser.');

        }

        else {
          
            createTable();  // If supported then call Function for create table in SQLite

        }

    }

    catch (e) {

        if (e == 2) {

            // Version number mismatch. 

            console.log("Invalid database version.");

        } else {

            console.log("Unknown error " + e + ".");

        }

        return;

    }

}

function createTable()  // Function for Create Table in SQLite.

{

    db.transaction(function (tx) { tx.executeSql(createStatement, [], showRecords, onError); });

}

function insertRecord(item_id,name,parent,type,size,created_date,updated_date) // Get value from Input and insert record . Function Call when Save/Submit Button Click..
{
    
	  
	    //var name = $('input:text[id=name]').val();
		 
      //  var parent = $('input:text[id=parent]').val();
		
		//var type = $('input:text[id=type]').val();
		
		//var size = $('input:text[id=size]').val();
		
		//var createddate = $('input:text[id=createddate]').val();

       // var updateddate = $('input:text[id=updateddate]').val();
        
        

       db.transaction(function (tx) { tx.executeSql(insertStatement,[item_id,name,parent,type,size,created_date,updated_date ], loadAndReset, onError); });

        //tx.executeSql(SQL Query Statement,[ Parameters ] , Sucess Result Handler Function, Error Result Handler Function );

}

function deleteRecord(id) // Get id of record . Function Call when Delete Button Click..

{

    var iddelete = id.toString();

    db.transaction(function (tx) { tx.executeSql(deleteStatement, [id], showRecords, onError); alert("Delete Sucessfully"); });

    resetForm();

}

function updateRecord() // Get id of record . Function Call when Delete Button Click..

{

    var createddatetemp = $('input:text[id=createddate]').val();

        var updateddatetemp = $('input:text[id=updateddate]').val();
        
        var filesizetemp = $('input:text[id=filesize]').val();

        var filenametemp = $('input:text[id=filename]').val();

        var filetypetemp = $('input:text[id=filetype]').val();

    var useridupdate = $("#id").val();

    db.transaction(function (tx) { tx.executeSql(updateStatement, [ updateddatetemp, filesizetemp, filenametemp,filetypetemp,Number(useridupdate) ], loadAndReset, onError); });

}

function dropTable() // Function Call when Drop Button Click.. Talbe will be dropped from database.

{

    db.transaction(function (tx) { tx.executeSql(dropStatement, [], showRecords, onError); });

    resetForm();

    initDatabase();

}

function loadRecord(i) // Function for display records which are retrived from database.

{

    var item = dataset.item(i);

    $("#createddate").val((item['createddate']).toString());

    $("#updateddate").val((item['updateddate']).toString());

    $("#filesize").val((item['filesize']).toString());

    $("#filename").val((item['filename']).toString());

    $("#filetype").val((item['filetype']).toString());

    $("#id").val((item['id']).toString());

}

function resetForm() // Function for reset form input values.

{

    $("#createddate").val("");

    $("#updateddate").val("");

    $("#filesize").val("");

    $("#filename").val("");

    $("#filetype").val("");

    $("#id").val("");

}

function loadAndReset() //Function for Load and Reset...

{

    resetForm();

    showRecords()

}

function onError(tx, error) // Function for Hendeling Error...

{

    alert(error.message);

}

function showRecords() // Function For Retrive data from Database Display records as list

{

    $("#results").html('')

    db.transaction(function (tx) {

        tx.executeSql(selectAllStatement, [], function (tx, result) {
        
            dataset = result.rows;

            for (var i = 0, item = null; i < dataset.length; i++) {

                item = dataset.item(i);

                var linkeditdelete = '<li>' + item['createddate'] + ' , ' + item['updateddate'] + ' ' + item['filesize'] + '' + item['filename'] + '' + item['filetype'] + '   ' + '<a href="#" onclick="loadRecord(' + i + ');">edit</a>' + '    ' +

                                            '<a href="#" onclick="deleteRecord(' + item['id'] + ');">delete</a></li>';

                $("#results").append(linkeditdelete);

            }

        });

    });

}
function showleftmenus(){
	  window.design_media_path=localDatabase("get","media_path").design_media_path; 
	  window.content_media_path=localDatabase("get","media_path").content; 
          // alert(design_media_path);

db.transaction(function (tx) {

        tx.executeSql(selectMainCatStatement, [], function (tx, result) {

            dataset = result.rows;

             
            for (var i = 0, item = null; i < dataset.length; i++) {

                item = dataset.item(i);
                      var src="";
                      if(item['item_id']=="1"){
                        src="images/icon_blueHeart.png";
                      }else if(item['item_id']=="3"){
                        src="images/icon_electro.png";
                      }
                leftmenu="<li><a href='#' onclick='showTopmenu("+item['item_id']+")' class='maincat"+i+"'><img class= 'icon_first' src='"+src+"'/><span style='color:#1699C8'>"+item['name']+"</span></a></li>"; //left side main category list menu
				          

				 $(".menulist").append(leftmenu);
				 
                 $(".maincat0").click();
				  
            }
            $('.menulist').listview('refresh');
		
        });
		
      
    });
	
}
function showTopmenu(id){
	
db.transaction(function (tx) {

        tx.executeSql(selectanitem, [id], function (tx, result) {

            dataset = result.rows;
             seg_control="";
            for (var i = 0, item = null; i < dataset.length; i++) {

                item = dataset.item(i);
                  $('.container_title h1').html(item['name']);

            }

        });
		

    });
	
	
db.transaction(function (tx) {

        tx.executeSql(selectMainSubCatStatement, [id], function (tx, result) {

            dataset = result.rows;
             seg_control="";
            for (var i = 0, item = null; i < dataset.length; i++) {

                item = dataset.item(i);

                seg_control+= '<a href="#" onclick="showItems('+item['item_id']+')" data-role="button" class="topmenu'+i+'">'+item['name']+'</a>';
					      
						  
				//alert(seg_control);		  
						 
						  

            }
	     $('.seg_control .ui-controlgroup-controls').html(seg_control);
		 $('[data-role="controlgroup"]').controlgroup().trigger('create');
		 $( ".seg_control" ).controlgroup( "option", "type", "horizontal" );	
         $(".topmenu0").click();
        });

		

    });

		
}

function showItems(id){
	
db.transaction(function (tx) {
        tx.executeSql(selectItemsStatement, [id], function (tx, result) {

            dataset = result.rows;
             var sec_thumbs="";
            for (var i = 0, item = null; i < dataset.length; i++) {

                item = dataset.item(i);
				data=localDatabase("get",item['item_id']);
			  
			    thumb= typeof myVar !== 'undefined'?$(this).parent().parent().attr('id'):"";
				
				if(i==0)booklet=' <img src="'+getThumbimage(item['type'])+'" alt="'+item['type']+'" class="main_booklet" />  <img src="images/expand.png" class="expand" onclick="showfile('+item['item_id']+')">';
				
				
				//alert(data.thumb+"id"+item['item_id']);
				sec_thumbs+='<div class="sec_thumbs sec_thumbs'+i+'" align="center" data-item-id="'+item['item_id']+'" data-type="'+item['type']+'"> ';
                             sec_thumbs+='<img src="'+getThumbimage(item['type'])+'" />';
                             sec_thumbs+='<p>'+item['name']+'</p>';
                             sec_thumbs+='</div>';	      


            }
			$('.thumbs').html(sec_thumbs);
            $('.booklet').html(booklet);
			$('.sec_thumbs').unbind('click');
			$('.sec_thumbs').click(function(){
				bookletOpen($(this).attr("data-item-id"),$(this).attr("data-type"));
			});
        });	
	    
	});
	
	
}
function showfile(id){
	
db.transaction(function (tx) {
        tx.executeSql(selectanitem, [id], function (tx, result) {

            dataset = result.rows;
             var sec_thumbs="";
            for (var i = 0, item = null; i < dataset.length; i++) {

                item = dataset.item(i);
				
				   if(item['type']=='flow') showItems(id);
				   
	               else if(item['type']=="audio") app.openVideo(content_media_path+localDatabase("get",id).file);
	                
				   else if(item['type']=="documents") app.openPDF(content_media_path+localDatabase("get",id).file);
	             
				   else if(item['type']=="pdf") app.openPDF(content_media_path+localDatabase("get",id).file);
	               
				   else if(item['type']=="video") app.openVideo(content_media_path+localDatabase("get",id).file);
					

            }
			//$('.booklet').html(booklet);

        });	
	    
	});
	
	
	
	
	
	               
					
	}
function getThumbimage(type){
	if(type=="flow") return "images/icon_source.png";
	else if(type=="audio") return "images/thumb_audio.png";
	else if(type=="documents") return "images/thumb_pdf.png";
	else if(type=="pdf") return "images/thumb_pdf.png";
	else if(type=="video") return "images/thumb_video.png";
	    
	}
function bookletOpen(id,type){
	if(type=="flow")  showItems(id);
	else {
	   booklet=' <img src="'+getThumbimage(type)+'" alt="'+type+'" class="main_booklet" />  <img src="images/expand.png" class="expand" onclick="showfile('+id+')">';
	   //alert(booklet);
	   $('.booklet').html(booklet);
		}

}
