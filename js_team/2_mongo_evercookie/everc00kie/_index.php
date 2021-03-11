<html>
<head>
	<meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">
    <title>EverCookies Test</title>   
    <!--<script src="cookie.js"></script>
	<link rel="shortcut icon" href="favicon.ico">-->
	<script type="text/javascript" src="swfobject-2.2.min.js"></script>
	<script type="text/javascript" src="evercookie.js"></script>
	<link rel="stylesheet" href="grap_representation.css">
    <script src="Chart.min.js"></script>
	<?php 
	require_once __DIR__ . '/../vendor/autoload.php';

	ini_set('display_errors', '1');
	ini_set('display_startup_errors', '1');
	error_reporting(E_ALL);
	
	// for simplicity of work with Mongo cursors
	$driverOptions= [
		'typeMap' => [
			'root' => 'array', 
			'document' => 'array', 
			'array' => 'array'
		]
	];
	
	$client = new MongoDB\Client("mongodb://localhost:27017",[],$driverOptions);
	$vis_db = $client -> evercookie -> visitors;
	
	// getting largest cid in BD as cid for new user
	$cid = $vis_db -> find([],array("_id" => 0, 'sort' => ['cid' => -1], 'limit' => 1)) -> toArray()[0]["cid"] + 1;
	echo "<script>var cid = " . $cid . ";</script>";
	?>
</head>
<body>
	<script>
    var ec = new evercookie({baseurl:'.'}); 

	async function init () {
		// wait till cookie is taken
		evercookie_loading.style.display = "block";
		loading_label.innerHTML = "Проверяем наличие вечнокуки...";
		var cookie_pr = new Promise ((resolve,reject) => ec.get("cid", (a,b) => getCookie(a,b,resolve))); 
		let cookie = await cookie_pr;
		
		// if it's new user
		if (cookie == undefined || cookie.best == undefined) {
			loading_label.innerHTML = "Вечнокуки нет &ndash; ставим и проверяем...";
			ec.set("cid", cid.toString()); 
			cookie_pr = new Promise ((resolve,reject) => ec.get("cid", (a,b) => getCookie(a,b,resolve))); 
		}
		
		// if new cookie is set, wait for it's data to be taken
		// (if not, promise is already resolved)
		cookie = await cookie_pr;
		evercookie_loading.style.display = "none";
		
		// pack data for server and send it
		cid = parseInt(cookie.best, 10);
		let data = {"cid":cid}
		data.cookie = cookie.all;
		sendToServer(data);
	}

    function getCookie(best_candidate, all_candidates, resolve) {
		console.log(best_candidate);
		if (best_candidate != undefined && best_candidate != null)
			for (var item in all_candidates)
				document.body.innerHTML += "Storage mechanism " + item +
					" returned: " + all_candidates[item] + "<br>";

		resolve({"best":best_candidate, "all":all_candidates});
    }
    
	function sendToServer (data) {
		const request = new XMLHttpRequest();	
		const url = "ajax.php";
		let params = data;
		statsPromise = new Promise ((resolve, reject) => {
			request.open("POST", url, true);
			request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			request.addEventListener("readystatechange", () => {
				if(request.readyState === 4 && request.status === 200) {       
					console.log(request.responseText);
					resolve(request.responseText);
				}
			});
			console.log(params);
			params = JSON.stringify(params);
			request.send(params);
		});
	}
    </script>
</body>
</html>