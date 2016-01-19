<?php

// Put your device token here (without spaces):
//$deviceToken = '5ec87c6acdec933ee14616c41bd3ca3c9b8187da1ac8eb2be90976cd0731f28b';
//
//
//
//echo $deviceToken.'<br>';
//
//        $passphrase = 'java@123';
//        
//        $paramload=array('aps'=>array('alert' =>'hello alert' ,'sound' => 'default'));
//        $paramload=json_encode($paramload);
//
//        //$apnsHost='gateway.push.apple.com';
//        $apnsHost='gateway.sandbox.push.apple.com';
//        $apnsPort=2195;
//        $apnsCert='ios_pricegenie.pem';
//        //$apnsCert='application/helpers/ck.pem';
//        $streamContext=stream_context_create();
//        stream_context_set_option($streamContext, 'ssl', 'local_cert', $apnsCert);
//        stream_context_set_option($streamContext, 'ssl', 'passphrase', $passphrase);
//        $apns=stream_socket_client('ssl://'.$apnsHost.':'.$apnsPort, $error, $errorString, 2, STREAM_CLIENT_CONNECT, $streamContext);
//        echo $apns;
//        if (!$apns) {
//             print "Failed to connect $error $errorString";
//            // exit;
//        }
//        else {
//            print "Notification send\n";            
//        }
//        //var_dump($apns);
//        $apnsMessage=chr(0).chr(0).chr(32).pack('H*' , str_replace(' ', '', $param[$deviceToken])).chr(0).chr(strlen($paramload)).$paramload;
//        //var_dump($apnsMessage);
//        fwrite($apns, $apnsMessage);


// Put your device token here (without spaces):
$deviceToken = '5ec87c6acdec933ee14616c41bd3ca3c9b8187da1ac8eb2be90976cd0731f28b';
echo $deviceToken.'<br>';
// Put your private key's passphrase here:
$passphrase = 'java@123';

// Put your alert message here:
$message = 'My first push notification!';

////////////////////////////////////////////////////////////////////////////////

$ctx = stream_context_create();
stream_context_set_option($ctx, 'ssl', 'local_cert', 'ios_pricegenie.pem');
stream_context_set_option($ctx, 'ssl', 'passphrase', $passphrase);

// Open a connection to the APNS server
$fp = stream_socket_client(
	'ssl://gateway.sandbox.push.apple.com:2195', $err,
	$errstr, 60, STREAM_CLIENT_CONNECT|STREAM_CLIENT_PERSISTENT, $ctx);
echo $fp.'<br>';
if (!$fp)
	exit("Failed to connect: $err $errstr" . PHP_EOL);

echo 'Connected to APNS' . PHP_EOL;

// Create the payload body
$body['aps'] = array(
	'alert' => $message,
	'sound' => 'default'
	);

// Encode the payload as JSON
$payload = json_encode($body);
echo $payload.'<br>';
// Build the binary notification
$msg = chr(0) . pack('n', 32) . pack('H*', $deviceToken) . pack('n', strlen($payload)) . $payload;

// Send it to the server
$result = fwrite($fp, $msg, strlen($msg));
echo $result.'<br>';
if (!$result)
	echo 'Message not delivered' . PHP_EOL;
else
	echo 'Message successfully delivered' . PHP_EOL;

// Close the connection to the server
fclose($fp);

?>