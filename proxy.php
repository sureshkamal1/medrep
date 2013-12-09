<?php
/*--------------------------------------------------------------/
| PROXY.PHP														|
| Created By: Eric-Sebastien Lachance							|
| Contact: eslachance@gmail.com									|
| Description: This proxy does a POST or GET request from any	|
|              page on the authorized domain to the defined URL	|
/--------------------------------------------------------------*/
error_reporting( E_ALL & ~E_NOTICE );
   ini_set( 'display_errors', false);    
   


// Destination URL: Where this proxy leads to.
$destinationURL = '';

// That's it for configuration!

if(!function_exists('apache_request_headers')) {
// Function is from: http://www.electrictoolbox.com/php-get-headers-sent-from-browser/
    function apache_request_headers() {
        $headers = array();
        foreach($_SERVER as $key => $value) {
            if(substr($key, 0, 5) == 'HTTP_') {
                $headers[str_replace(' ', '-', ucwords(str_replace('_', ' ', strtolower(substr($key, 5)))))] = $value;
            }
        }
        return $headers;
    }
}

// Figure out requester's IP to shipt it to X-Forwarded-For
$ip = '';
if (!empty($_SERVER['HTTP_CLIENT_IP'])) { 
        $ip = $_SERVER['HTTP_CLIENT_IP'];
        //echo "HTTP_CLIENT_IP: ".$ip;
} elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
        //echo "HTTP_X_FORWARDED_FOR: ".$ip;
} else {
        $ip = $_SERVER['REMOTE_ADDR'];
        //echo "REMOTE_ADDR: ".$ip;
}


//if($domainName == $RequestDomain) {

        $method = $_SERVER['REQUEST_METHOD'];
        $data=$_REQUEST;
        if($method=="GET"){
        	$destinationURL=$_GET['url'];
        }
        else if($method!="DELETE"){
        	$destinationURL=$_POST['url'];
        }
       
        if($method=="DELETE"){
        	$params = Array();
        	parse_str(file_get_contents('php://input'), $params);
			$GLOBALS["_{$method}"] = $params;
			$_REQUEST = $params + $_REQUEST;
			$response = deleteAction($_REQUEST['url'],$_REQUEST); 
        }
        else{
			$response = proxy_request($destinationURL, $_REQUEST, $method);
		}
		if($response['status']=='err'){
			header("HTTP/1.0 404 Not Found");
			echo "$destinationURL is not accessible. Please check the url and try again later.";
		}else{
			$headerArray = explode("\r\n", $response[header]);
			foreach($headerArray as $headerLine) {
				header($headerLine,false);
			}
			echo $response[content];
		}
 		
 // } else {

  //      echo "HTTP Referer is not recognized. Cancelling all actions";

 // }

function proxy_request($url, $data, $method) {
// Based on post_request from http://www.jonasjohn.de/snippets/php/post-request.htm
        global $ip;
        // Convert the data array into URL Parameters like a=b&foo=bar etc.
        
        $data = http_build_query($data);
        $datalength = strlen($data);
 
        // parse the given URL
        $url = parse_url($url);
 
        /*if ($url['scheme'] != 'http') { 
                die('Error: Only HTTP request are supported !');
        }*/
        $host = $url['host'];
        $path = $url['path'];
        if (!isset($url['port'])) {
			if ($url['scheme'] == 'http') { $url['port']=80; }
			elseif ($url['scheme'] == 'https') { $url['port']=443; $host="ssl://".$host;}
		}
		$url['query']=isset($url['query'])?$url['query']:'';
 
        // extract host and path:
        

        // open a socket connection on port 80 - timeout: 30 sec
        $fp = fsockopen($host, $url['port'], $errno, $errstr, 30);
 
        if ($fp){
                // send the request headers:
                if($method == "POST") {
                        fputs($fp, "POST $path HTTP/1.1\r\n");
                } else if($method=="DELETE") {
                        fputs($fp, "DELETE $path HTTP/1.1\r\n");
                }else {
                        fputs($fp, "GET $path?$data HTTP/1.1\r\n");
                }
                fputs($fp, "Host: $host\r\n");
                
                fputs($fp, "X-Forwarded-For: $ip\r\n");
                fputs($fp, "Accept-Charset: ISO-8859-1,utf-8;q=0.7,*;q=0.7\r\n"); 
                
                $requestHeaders = apache_request_headers();
                while ((list($header, $value) = each($requestHeaders))) {
                        if($header == "Content-Length") {
                                fputs($fp, "Content-Length: $datalength\r\n");
                        } else if($header !== "Connection" && $header !== "Host" && $header !== "Content-length") {
                                fputs($fp, "$header: $value\r\n");
                        }
                }
                fputs($fp, "Connection: close\r\n\r\n");
                fputs($fp, $data);
 
                $result = ''; 
                while(!feof($fp)) {
                        // receive the results of the request
                        $result .= fgets($fp, 128);
                }
        }
        else {
				
                return array(
                        'status' => 'err', 
                        'error' => "$errstr ($errno)"
                );
        }
 
        // close the socket connection:
        fclose($fp);
 
        // split the result header from the content
    
        $result = explode("\r\n\r\n", $result, 2);
 
        $header = isset($result[0]) ? $result[0] : '';
        $content = isset($result[1]) ? $result[1] : '';
 
        // return as structured array:
        return array(
                'status' => 'ok',
                'header' => $header,
                'content' => $content
        );
}
function deleteAction($url,$postbody){
	
	$requestHeaders = apache_request_headers();
	$ch = curl_init($url);
	curl_setopt($ch, CURLOPT_HTTPHEADER,array('Content-Type: application/x-www-form-urlencoded'));
	curl_setopt($ch, CURLOPT_POSTFIELDS, $postbody);
	curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
	curl_setopt($ch, CURLOPT_COOKIE, $requestHeaders['Cookie']);
	curl_setopt($ch,CURLOPT_HTTPHEADER,apache_request_headers());
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	//curl_setopt($ch, CURLOPT_POST, 1);
	curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "DELETE");
	$response = curl_exec($ch);
	curl_close($ch);
	return array(
                'status' => 'ok',
                'header' => NULL,
                'content' => $response
        );
}

?>

