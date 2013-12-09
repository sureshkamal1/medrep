var url = '';
function design() {
	
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
			data=[];
		$(xml).find('media_path').each(function(){
			   	 	
			data.push($(this).text());
					
		});
		
		myArray={"content":data[0],"pages":data[1],"design_media_path":$(xml).find('design_media_path').text()};
		localDatabase("set","media_path", myArray); 
		
		
		$(xml).find('design').each(function(){
	
	   if($(this).attr ('name')=="tabbed"){
	   	
	   		//colours		
		myArray={"tabbed":{"font_family":$(this).find('font_family').text(),"background_color":$(this).find('background_color').text(),"background_image":$(this).find('background_image').text(),"header_logo":$(this).find('header_logo').text(),"top_bar":$(this).find('top_bar').text(),"bottom_bar":$(this).find('bottom_bar').text(),"list_bg":$(this).find('list_bg').text(),"odd_row":$(this).find('odd_row').text(),"even_row":$(this).find('even_row').text(),"highlight_row":$(this).find('highlight_row').text(),"sub_section_tab":$(this).find('sub_section_tab').text(),"sub_section_tab_highlight":$(this).find('sub_section_tab_highlight').text(),"footer_color":$(this).find('footer_color').text(),"title_font":$(this).find('title_font').text(),"content_font":$(this).find('content_font').text()}};
		
		localDatabase("set","design", myArray);   
	   }
            

		//alert(localDatabase("get","media_path").tabbed.content);

	   
			});
			
			$(xml).find('home').each(function(){
				
				bg=$(this).attr('bg');
				ipad=$(this).attr('ipad');
				ipadretina=$(this).attr('ipadretina');
				launchimage=$(this).attr('launchimage');
				launchimage_iphone5=$(this).attr('launchimage_iphone5');
				launchimage_ipad=$(this).attr('launchimage_ipad');
				launchimage_ipadretina=$(this).attr('launchimage_ipadretina');
				header=$(this).attr('header');
				
			//profile Image
				profile_image=$(this).find('profile').attr('image');
			//profile Image
				phone_image=$(this).find('phone').attr('image');
				
				footer_color=$(this).find('footer_color').text();
				footer_border_color=$(this).find('footer_border_color').text();

			 $(this).find('buttons').each(function(){
					iconset=$(this).attr('iconset');
				   opacity=$(this).attr('opacity');
				   butn_ipadretina=$(this).attr('ipadretina');
					
					button_bg=$(this).find('button_bg').text();
					button_text_color=$(this).find('button_text_color').text();
					button_overlay_color=$(this).find('button_overlay_color').text();

				});
				
				
			   myArray={"home":{"bg":bg,"ipad":ipad,"ipadretina":ipadretina,"launchimage":launchimage,"launchimage_iphone5":launchimage_iphone5,"launchimage_ipad":launchimage_ipad,"launchimage_ipadretina":launchimage_ipadretina,"header":header,"profile_image":profile_image,"phone_image":phone_image},"buttons":{"iconset":iconset,"opacity":opacity,"ipadretina":butn_ipadretina,"button_bg":button_bg,"button_text_color":button_text_color,"button_overlay_color":button_overlay_color},"footer":{"footer_color":footer_color,"footer_border_color":footer_border_color}};	
				localDatabase("set","home", myArray); 
				
				 
			});
			
			$(xml).find('styles').each(function(){
				
				font=$(this).find('font').text();
				header=$(this).find('header').text(); 
				
				nav_bar=$(this).find('nav_bar').text();
				nav_bar_opacity=$(this).find('nav_bar').attr('opacity');
				
				tab_bg=$(this).find('tab_bg').text();
				tab_bg_opacity=$(this).find('tab_bg').attr('opacity');

				table_bg=$(this).find('table_bg').text();
				table_bg_opacity=$(this).find('table_bg').attr('opacity');

				even_row=$(this).find('even_row').text();
				even_row_opacity=$(this).find('even_row').attr('opacity');		
				
				odd_row=$(this).find('odd_row').text();
				odd_row_opacity=$(this).find('odd_row').attr('opacity');
				
                separator=$(this).find('separator').text();

				title_text=$(this).find('title_text').text();

				global_text=$(this).find('global_text').text();

				alt_text=$(this).find('alt_text').text();

				page_bg=$(this).find('page_bg').text();

			   myArray={"font":font,"header":header,"nav_bar":nav_bar,"nav_bar_opacity":nav_bar_opacity,"table_bg":table_bg,"table_bg_opacity":table_bg_opacity,"even_row":even_row,"even_row_opacity":even_row_opacity,"odd_row":odd_row,"odd_row_opacity":odd_row_opacity,"separator":separator,"title_text":title_text,"global_text":global_text,"alt_text":alt_text,"page_bg":page_bg};					
				

				localDatabase("set","styles", myArray);    
				         });
			

		  //  $('body').css({'font-family':font_family,'background-color':background_color,'background-Image':background_image});
		  //	  $('.logo img').attr('src', header_logo);
          //  $('.ui-bar-a').css({'background':top_bar});
			
				  },
       error: function(xhr, status, error) {
           var err = eval( xhr.responseText );
           }

				  
				  });
				  
		$(".menulist li").click(function() {
			            
		  $(".menulist li").removeClass("highlight_row"); 
           $(this).addClass("highlight_row");      
       });
	   
}