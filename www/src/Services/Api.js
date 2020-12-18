export default class Api {
	constructor(options) {
		this._apiBase = options ? options.endpointUrl || '/' : '/';
	}

	serialize = function (obj) {
		var str = [];
		for (var p in obj)
			if (obj.hasOwnProperty(p)) {
				str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
			}
		return str.join("&");
	}

	ajax = (
		url = '', 
		type = 'GET', 
		data = {}, 
		callback = (() => { }),
		error = (() => { }),
	) => {
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = () => {
			// console.log('AJAX end:', { state: xmlhttp.readyState, code: xmlhttp.status, xmlhttp });
			if (xmlhttp.readyState === 4) {
				if (xmlhttp.status === 200) {
					callback(xmlhttp.responseText, xmlhttp);
					return;
				}
				// console.error(`AJAX error: ${xmlhttp.status} ${xmlhttp.responseText}`);
				error(xmlhttp.status, xmlhttp.statusText, xmlhttp);		
			}
		}
		xmlhttp.open(type, `${window._frontConfig.apiBaseUrl}${url}`, true);
		xmlhttp.send(data);
	}
}