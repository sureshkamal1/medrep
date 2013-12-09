/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
 
var app = {

    flag:0,
    // Application Constructor
    initialize: function() {
        console.log("init");
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
		design();
		initDatabase();
		dropTable();
		categories();
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
		
	deviceType = (navigator.userAgent.match(/iPad/i))  == "iPad" ? "iPad" : (navigator.userAgent.match(/iPhone/i))  == "iPhone" ? "iPhone" : (navigator.userAgent.match(/Android/i)) == "Android" ? "Android" : (navigator.userAgent.match(/BlackBerry/i)) == "BlackBerry" ? "BlackBerry" : "null";
        app.receivedEvent('deviceready');
		
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
		alert(id);
        // var parentElement = document.getElementById(id);
        // var listeningElement = parentElement.querySelector('.listening');
        // var receivedElement = parentElement.querySelector('.received');

        // listeningElement.setAttribute('style', 'display:none;');
        // receivedElement.setAttribute('style', 'display:block;');

        // console.log('Received Event: ' + id);
		
        
    },
    viewContent:function(){
        if(app.flag == 0){
                      
            $('.container_menu').css({'width':'0px','display':'none'});
            $('.container_content').css({'width':'100%','left':'0px'});
            $('.ic_case_study').css({'right':'30%'});
            app.flag = 1;         

        }else{

            $('.container_menu').css({'width':'31%','display':''});
            $('.container_content').css({'width':'69%','left':'31%'});
            $('.ic_case_study').css({'right':'75%'});
            app.flag = 0;
        }
		
		
    

    },
    viewDownLoadPage:function(){
        if(app.flag == 0){
             document.getElementById('downlaodbook').style.display = 'block';     
               document.getElementById('mainbook').style.display = 'none';     
           $('.container_menu').css({'width':'0px','display':'none'});
           $('.container_content').css({'width':'100%','left':'0px'});
            $('.ic_case_study').css({'right':'30%'});
            app.flag = 1;         

        }else{
  document.getElementById('downlaodbook').style.display = 'none'; 
   document.getElementById('mainbook').style.display = 'block';     
           $('.container_menu').css({'width':'31%','display':''});
            $('.container_content').css({'width':'69%','left':'31%'});
            $('.ic_case_study').css({'right':'75%'});
            app.flag = 0;
        }
		
		
    

    },
    downBatchFile:function(i){
      var fileTransfer = new FileTransfer();
    // 	alert(i);
    
	 if(i == 0){
      var uri = encodeURI("http://bledsoebrace.com/salesapp/nemi.mp4");
      var filePath = "/mnt/sdcard/nemi.mp4";
       document.getElementById('clickMe11').innerHTML="Please Wait! Downloading File from " + "http://bledsoebrace.com/salesapp/nemi.mp4" ; 
    } else  if(i == 1){
      var uri = encodeURI("http://bledsoebrace.com/salesapp/elbow.png");
      var filePath = "/mnt/sdcard/elbow.png";
       document.getElementById('clickMe11').innerHTML="Please Wait! Downloading File from " + "http://bledsoebrace.com/salesapp/elbow.png" ; 
    } else  if(i == 2){
      var uri = encodeURI("http://bledsoebrace.com/salesapp/test11.pdf");
      var filePath = "/mnt/sdcard/test11";
       document.getElementById('clickMe11').innerHTML="Please Wait! Downloading File from " + "http://bledsoebrace.com/salesapp/test11.pdf" ; 
    } else  if(i == 3){
      var uri = encodeURI("http://bledsoebrace.com/salesapp/test.pdf");
      var filePath = "/mnt/sdcard/text.pdf";
       document.getElementById('clickMe11').innerHTML="Please Wait! Downloading File from " + "http://bledsoebrace.com/salesapp/test.pdf" ; 
    }
 
     fileTransfer.download(
	            uri,
	            filePath,
	            function(entry) {
	                 document.getElementById('clickMe11').innerHTML="Download complete: " + entry.fullPath;
	                 i++;
	                  
	                 if(i<4){
	                 app.downBatchFile(i);
	                 } else {
	                 navigator.notification.activityStop();
	                }
	           },
	            function(error) {
	         document.getElementById('clickMe11').innerHTML="download error source " + error.source;
	                document.getElementById('clickMe11').innerHTML="download error target " + error.target;
	                document.getElementById('clickMe11').innerHTML="upload error code" + error.code;
	               navigator.notification.activityStop();
	            },
	            true,
	            {
	            }
	         );
			
    
    },
    downFile:function(id){
    if(deviceType == "Android"){
   file_path = "/mnt/sdcard/";
    var fileTransfer = new FileTransfer();
    var val1 =  document.getElementById(id).value;
    if(val1 == 'Download File All'){
 			 navigator.notification.activityStart("Please Wait ", "downloading...");
 			app.downBatchFile(0);
 			 
	}
     else{ 
     if(val1 == 'Download File 1'){
      var uri = encodeURI("http://bledsoebrace.com/salesapp/nemi.mp4");
      var filePath = file_path+"nemi.mp4";
       document.getElementById('clickMe11').innerHTML="Please Wait! Downloading File from " + "http://bledsoebrace.com/salesapp/nemi.mp4" ; 
    } else  if(val1 == 'Download File 2'){
      var uri = encodeURI("http://bledsoebrace.com/salesapp/elbow.png");
      var filePath = "/mnt/sdcard/elbow.png";
       document.getElementById('clickMe11').innerHTML="Please Wait! Downloading File from " + "http://bledsoebrace.com/salesapp/elbow.png" ; 
    } else  if(val1 == 'Download File 3'){
      var uri = encodeURI("http://bledsoebrace.com/salesapp/test11.pdf");
      var filePath = "/mnt/sdcard/test11";
       document.getElementById('clickMe11').innerHTML="Please Wait! Downloading File from " + "http://bledsoebrace.com/salesapp/test11.pdf" ; 
    } else  if(val1 == 'Download File 4'){
      var uri = encodeURI("http://bledsoebrace.com/salesapp/test.pdf");
      var filePath = "/mnt/sdcard/text.pdf";
       document.getElementById('clickMe11').innerHTML="Please Wait! Downloading File from " + "http://bledsoebrace.com/salesapp/test.pdf" ; 
    }
	 navigator.notification.activityStart("Please Wait ", "downloading...");
	
	fileTransfer.download(
	            uri,
	            filePath,
	            function(entry) {
	             navigator.notification.activityStop();
	                 document.getElementById('clickMe11').innerHTML="Download complete: " + entry.fullPath;
	           },
	            function(error) {
	             navigator.notification.activityStop();
	         document.getElementById('clickMe11').innerHTML="download error source " + error.source;
	                document.getElementById('clickMe11').innerHTML="download error target " + error.target;
	                document.getElementById('clickMe11').innerHTML="upload error code" + error.code;
	            },
	            true,
	            {
	            }
	         );
	}
	}
	},
    openVideo:function(url){ alert(url);
        window.open(url, '_blank','location=yes');
    },
    openPDF:function(url){ alert(url);
        window.open(url, '_blank','location=yes');
    },

    openImage:function(){ alert(url);
        window.open(url, '_blank','location=yes');
    }
	
}; 
