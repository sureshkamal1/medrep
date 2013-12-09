function categories () {
	$.ajax({
		type: "POST",
		url: url+"http://oneteamus.org/medicalrepbuilder/index.php/api/representative/login",
		data:{
			username:"ela",password:"ela"
		},
		complete:function(data){
			//alert(data.responseText);	
		},
		success: function(xml) {
			  //alert("xml"+xml);
         

			  $(xml).find('category').each(function(){
			  	     
					myArray={"background-type":$(this).attr('background-type'),"background":$(this).attr('background'), "icon":$(this).attr('icon'),"image":$(this).attr('image'), "name":$(this).find('name:first').text()};
					 
					localDatabase("set",$(this).attr('id'), myArray); 
					 
					 
					 
					p_id= $.isNumeric($(this).parent().parent().attr('id'))?$(this).parent().parent().attr('id'):"";

					insertRecord($(this).attr('id'),$(this).find('name:first').text(),p_id,$(this).attr('module'),"","","");
			  	    //alert('c_cat= '+$(this).find('name:first').text()+"    c_id= "+$(this).attr('id')+"    p_id= "+p_id+"    parentnode= "+ p_id);
					p_id=$(this).attr('id');

					
					$(this).find('items:first').each(function(){
					        $(this).children().each(function () {
								
								
								   myArray={"background-type":$(this).attr('background-type'),"background":$(this).attr('background'), "description":$(this).find('p:first').text(),"thumb":$(this).find('thumb:first').text(), "name":$(this).find('name:first').text(), "file":$(this).find('file:first').text()};
					 
					localDatabase("set",$(this).attr('id'), myArray); 
								
							        insertRecord($(this).attr('id'),$(this).find('name').text(),p_id,$(this).attr('type'),"","","");	
									//alert('c_cat= '+$(this).find('name').text()+"    c_id= "+$(this).attr('id')+"    p_id= "+p_id);	
				            }); 
				   });
			  });
              showleftmenus();
			 // alert(localDatabase("get",12).name);
		},
       error: function(xhr, status, error) {
            var err = eval( xhr.responseText );
            alert(err+"Please try again later");
       }
	});
			//alert("xml"+xml);
			
}