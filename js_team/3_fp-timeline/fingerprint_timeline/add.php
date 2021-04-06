<?php
require_once __DIR__ . '/vendor/autoload.php';

$client = new MongoDB\Client("mongodb://localhost:27017");
$visitor_db = $client -> fingerprint_plus -> visitors;

$input = json_decode(file_get_contents("php://input"), true);
$id = $input['id'];
$input = $input['visit'];

$response = array();

if ($visitor_db -> count(array('id' => $id)) > 0) {
	$visitor_db -> updateOne(array('id' => $id), array('$push' => array('visits' => $input)));
}
else {
	$entry = array();
	$entry['id'] = $id;
	$entry['visits'] = array($input);
	$visitor_db -> insertOne($entry);
}

// send response
echo json_encode($response);
?>
