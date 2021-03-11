<?php
require_once __DIR__ . '/../vendor/autoload.php';

$client = new MongoDB\Client("mongodb://localhost:27017");
$visitor_db = $client -> evercookie -> visitors;

$input = json_decode(file_get_contents("php://input"), true);

$response = array();

if ($input != null) {
	$visitor_db -> insertOne($input);	
	// fill response with percents data
	/*$allentries = $visitor_db -> count();
	foreach($input as $attrname => $attr) {
		$filter = array($attrname . '.value' => $attr['value']);
		//var_dump($filter);
		$response[$attrname] = ($visitor_db -> count($filter))/$allentries;*/
	
}
else {
	$response['error'] = 'Empty string';
}

// send response
echo json_encode($response);
?>
