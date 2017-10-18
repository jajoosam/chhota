
(function(global, local) {

	// global represents the window object

	// helper functions
	const hide = function(id) {
		local.getElementById(id).style.display = "none";
	}

	const show = function(id) {
		local.getElementById(id).style.display = "block";
	}

	const setAttr = function(id, attr, value) {
		local.getElementById(id).setAttribute(attr, value);
	}

	// logic 
	if (global.location.hash.slice(1).substr(0,6) == "create") {

		// hide certain elements
		hide("implementation");
		hide("usage");

		let link = location.hash.slice(1).substr(7);
		const shortenUrl = function() {
			const request = gapi.client.urlshortener.url.insert({
			    resource: {
			      longUrl: link
			    }
			});
		
			request.execute(function(response) {
			    var shortUrl = response.id;
			    console.log(shortUrl.substr(15));
			    getById("url").innerHTML = `#$${shortUrl.substr(15)}`;
			    setAttr("link", "href", `http://${global.location.hostname}/#$${shortUrl.substr(15)}`);
			    setAttr("link", "target", "_blank");
			    setAttr("qrlink", "target", "_blank");
			    setAttr("statslink", "target", "_blank");
			  	setAttr("statslink", "href", `http://${global.location.hostname}/#$/info/${shortUrl.substr(15)}`);
			  	setAttr("qrlink", "href", `http://${global.location.hostname}/#$${shortUrl.substr(15)}.qr`);
			});
		}

		const googleApiLoaded = function() {
			gapi.client.setApiKey("AIzaSyCPYjwoXEGBFjH7Ew79zLQr7zdABL_Meww");
			gapi.client.load("urlshortener", "v1", shortenUrl);
			// show("card");
		};

		global.googleApiLoaded = googleApiLoaded;

		//create script element and and append to document
		const script = local.createElement("script");
		script.setAttribute("src", 'https://apis.google.com/js/client.js?onload=googleApiLoaded');
		local.body.appendChild(script);

	} else if(global.location.hash.slice(1).substr(0,1) == "$"){
		let link = global.location.hash.slice(1).substr(1);
		global.location = "https://goo.gl/" + link;

	} else {
		hide("card");
}

})(window, document)
