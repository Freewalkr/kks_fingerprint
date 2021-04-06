var fpromise, statsPromise;
function initFingerprintJS() {
    fpromise = FingerprintJS.load()
    .then(fp => {return new Promise ((resolve, reject) => resolve(fp.get()));})
}

function sendToServer (data, url) {
	const request = new XMLHttpRequest();	
	let params = data;
	responsePromise = new Promise ((resolve, reject) => {
		request.open("POST", url, true);
		request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		request.addEventListener("readystatechange", () => {
			if(request.readyState === 4 && request.status === 200) {       
				resolve(request.responseText);
			}
		});
		
		params = JSON.stringify(params);
		request.send(params);
	});
	return responsePromise;
}

function checkNickName() {
	let id = document.forms.nickname.textfield.value.trim();
	Promise.all([sendToServer({'id':id},"./check.php"),fpromise]).then(values => {
		[response, fp] = values;
		response = JSON.parse(response);
		console.log(response);


		let fingerprint = {};
		fingerprint.visit = fp;	
		fingerprint.id = id;
		console.log(window.navigator.userAgent);
		fingerprint.visit.components.userAgent = {}
		fingerprint.visit.components.userAgent.value = window.navigator.userAgent.match(/.*?\((.*?)\).*/)[1];
		console.log(fingerprint.visit.components);
		let date = new Date();
		fingerprint.visit.time = date.toLocaleString('default', {year:'numeric', month:'short', day:'numeric', hour:'numeric', minute:'numeric', second:'numeric'});

		let visits = response.visits || [];
		visits.push(fingerprint.visit);
		visits = Array.from(visits.entries()).reverse();

		let table = '<div class="allvisits-wrapper"><h2>Сводная таблица визитов</h2><details><div class="scrollbox"><table class="allvisits"><tr class="entry"><td>Визиты</td>';
		let params = new Set();
		for (let [i,visit] of visits) 
			for (let param_name in visit.components)
				params.add(param_name);
		console.log(params);
		params = Array.from(params);
		console.log(params);
		for (param_name of params)
			table += '<td>'+ param_name +'</td>';
		table += '</tr>';
		for (let [i,visit] of visits) {
			table += '<tr class="entry"><td>Визит '+ i +'</td>';
			for (param_name of params) {
				let param_value = visit.components[param_name] && JSON.stringify(visit.components[param_name].value);
				table += '<td>' + param_value + '</td>';
			}
			table += '</tr>'
		}
		table += '</table></div></details></div>';
		visits_container.innerHTML += table;


		for (let [i,visit] of visits) {
			let msg = '<div class="visit"><h2>Визит '+ i +' (' + visit.time + ')</h2><details><table class=""><tbody>';
			for (let parameter in visit.components) {
				let param_value = JSON.stringify(visit.components[parameter].value);
				msg += 	'<tr class="entry"><td><input type="checkbox"></td> <td class="entry_name">' 
								+ parameter 
								+ '</td><td class="entry_value"><div>' 
								+ param_value
								+ '</div></td></tr>';

			}
			msg += '</tbody></table></details></div>';
			visits_container.innerHTML += msg;
		}


		hello_screen.classList.add("invis");
		info_screen.classList.remove("invis");

		sendToServer(fingerprint, './add.php');

		
	});
	return false;
}

