<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="shortcut icon" href="/favicon.ico">
    <title>Evercookies</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">
	<link rel="stylesheet" href="style.css">	
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
	
	<script>
    var ec = new evercookie({baseurl:'.'}); 

	async function init () {

		set_cookie_button.style.display = "none";
		evercookie_loading.style.display = "block";
		loading_label.innerHTML = "Проверяем наличие вечнокуки...";
		
		// wait till cookie is taken
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
		let table_body = document.querySelector("#ec_result_table tbody");
		if (best_candidate != undefined && best_candidate != null)
			for (var item in all_candidates)
				table_body.innerHTML += '<tr><th scope="row">'+item+'</th><td>'+all_candidates[item]+'</td></tr>';
		
		ec_result_table.style.display = "table";
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
</head>
<body>
    <div class="introduction">
        <div class="article">
			<h1>Evercookies</h1>
			<p class='text-descr'>Cookies — распространенная технология, позволяющая веб-сайту «запомнить» своего пользователя,
			   сохранить его настройки локально на стороне клиента и, например, не спрашивать каждый раз его логин и пароль.
			   Возникает вопрос: если обычным образом удалить кукисы в браузере, сможет ли он узнать вас при возвращении? </p>
			<p class='text-descr'>Ответ на этот вопрос: да, сможет. Samy Mamkar разработал систему, которая позволяет хранить куки в 8 местах, автоматически восстанавливая друг друга,
				в случае удаления одного (нескольких) куки. Функционал разработанной библиотеки позволяет даже добиться того, чтобы куки, поставленное в одном браузере, действовало и в другом.
			  Удалить это куки необычайно тяжело!  Чуть ниже вы можете увидеть таблицу с примером.
			</p>
		</div>
		<p>
			<button class="btn btn-primary" id="set_cookie_button" onclick="init();">Поставить вечнокуку</button>
		</p>
		<div id="evercookie_loading">
			<div class="lds-dual-ring"></div>
			<div id="loading_label"></div>
		</div>
		
		<table class="table thead-light table-striped table-bordered custom" id="ec_result_table">
			<thead>
			  <tr>
				<th scope="col">Storage mechanism</th>
				<th scope="col">value</th>
			  </tr>
			</thead>
			<tbody >
			  
			</tbody>
		</table>

        <div class="article">
			<p class='text-descr'>Чуть ниже вы сможете найти анализ производительности доступа к evercookie со стороны браузера</p>
		</div>
        <button class="btn btn-primary show-tables">Посмотреть таблицы с измерениями</button>
    </div>
    
    <div class="measured none">
        <h2 class='table-header'>Таблица замеров производительности в Chrome</h2>
        <table class="table thead-light table-striped table-bordered center">
            <thead>
              <tr>
                <th scope="col">Измерение</th>
                <th scope="col">Normal</th>
                <th scope="col">Fast3G</th>
                <th scope="col">Fast3G + 6x Slowdown</th>
                <th scope="col">Slow3G</th>
                <th scope="col">Slow3G + 6x Slowdown</th>
              </tr>
            </thead>
            <tbody >
              <tr>
                <th scope="row">1</th>
                <td>3.6</td>
                <td>3.7</td>
                <td>4.7</td>
                <td>3.6</td>
                <td>4.58</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>3.71</td>
                <td>3.62</td>
                <td>4.6</td>
                <td>3.66</td>
                <td>4.7</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>3.44</td>
                <td>3.23</td>
                <td>4.54</td>
                <td>3.7</td>
                <td>4.63</td>
              </tr>
              <tr>
                <th scope="row">4</th>
                <td>3.21</td>
                <td>3.47</td>
                <td>4.53</td>
                <td>3.55</td>
                <td>4.43</td>
              </tr>
              <tr>
                <th scope="row">5</th>
                <td>3.45</td>
                <td>3.58</td>
                <td>4.51</td>
                <td>3.49</td>
                <td>4.21</td>
              </tr>
            </tbody>
          </table>

          <h2 class='table-header'>Таблица замеров производительности в Opera</h2>
          <table class="table thead-light table-striped table-bordered center">
              <thead>
                <tr>
                  <th scope="col">Измерение</th>
                  <th scope="col">Normal</th>
                  <th scope="col">Fast3G</th>
                  <th scope="col">Fast3G + 6x Slowdown</th>
                  <th scope="col">Slow3G</th>
                  <th scope="col">Slow3G + 6x Slowdown</th>
                </tr>
              </thead>
              <tbody >
                <tr>
                  <th scope="row">1</th>
                  <td>3.54</td>
                  <td>3.55</td>
                  <td>4.45</td>
                  <td>3.65</td>
                  <td>4.56</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>3.61</td>
                  <td>3.63</td>
                  <td>4.54</td>
                  <td>3.68</td>
                  <td>4.53</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>3.48</td>
                  <td>3.78</td>
                  <td>4.56</td>
                  <td>3.72</td>
                  <td>4.56</td>
                </tr>
                <tr>
                  <th scope="row">4</th>
                  <td>3.65</td>
                  <td>3.43</td>
                  <td>4.52</td>
                  <td>3.73</td>
                  <td>4.58</td>
                </tr>
                <tr>
                  <th scope="row">5</th>
                  <td>3.5</td>
                  <td>3.52</td>
                  <td>4.59</td>
                  <td>3.61</td>
                  <td>4.66</td>
                </tr>
              </tbody>
            </table>

            <h2 class='table-header'>Таблица замеров производительности в Firefox</h2>
            <table class="table thead-light table-striped table-bordered custom">
                <thead>
                  <tr>
                    <th scope="col">Измерение</th>
                    <th scope="col">Normal</th>
                  </tr>
                </thead>
                <tbody >
                  <tr>
                    <th scope="row">1</th>
                    <td>3.6</td>     
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>3.73</td>        
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>3.65</td> 
                  </tr>
                  <tr>
                    <th scope="row">4</th>
                    <td>3.71</td>   
                  </tr>
                  <tr>
                    <th scope="row">5</th>
                    <td>3.72</td>
                  </tr>
                </tbody>
              </table>
              <button class="btn btn-primary hide-tables">Скрыть таблицы</button>
          
    </div>


    <ul class="nav nav-tabs justify-content-center">
        <li class="nav-item">
          <a class="nav-link active" data-toggle="tab" href="#first">Google</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" data-toggle="tab" href="#second">Opera</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" data-toggle="tab" href="#third">Firefox</a>
        </li>
    </ul>
    <div class="tab-content">
        <div class="tab-pane fade show active" id="first">
            <h3 class="tab-header">Доступ к Evercookies в Google</h3>
            <canvas id="google"></canvas>
        </div>
        <div class="tab-pane fade" id="second">
            <h3 class="tab-header">Доступ к Evercookies в Opera</h3>
            <canvas id="opera"></canvas>
        </div>
        <div class="tab-pane fade" id="third">
            <h3 class="tab-header">Доступ к Evercookies в Firefox</h3>
            <p class ="firefox-descr">К сожалению, провести серию замеров, аналогичных таковым в Chrome <br>
                и Opera не представляется возможным в силу различия движков браузеров. Поэтому мы ограничимся <br>
                только нормальным режимом работы</p>
            <canvas id="firefox"></canvas>
        </div>
    </div>
    <div class="sum-up">
        <h3 class="tab-header">Средняя производительность в лучшем и худшем исходах</h3>
        <canvas id="gistagram"></canvas>
    </div>
</body>
<script src = "grap_representation.js"></script>
</html>