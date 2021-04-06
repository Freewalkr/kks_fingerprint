<?php
require_once __DIR__ . '/vendor/autoload.php';

$client = new MongoDB\Client("mongodb://localhost:27017");
$visitor_db = $client -> fingerprint_plus -> visitors;
$input = json_decode(file_get_contents("php://input"), true);
$id = $input['id'];
$response = array();

//$match = $visitor_db -> count(array('id' => $id));
//if ($match > 0) {
	//$response['inDB'] = true;
	$response['visits'] = $visitor_db -> findOne(array('id' => $id)) -> visits;
//}
//else { 	$response['inDB'] = false; }

// send response
echo json_encode($response);
?>
