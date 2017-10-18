if(location.hash.slice(1).substr(0,6) == "create"){
	document.getElementById("formo").style.display = "none";
	document.getElementById("hido").style.display = "none";
	document.getElementById("footo").style.display = "none";
	document.getElementById("explo").style.display = "none";

	link = location.hash.slice(1).substr(7);
	var shortenUrl = function() {
	  var request = gapi.client.urlshortener.url.insert({
	    resource: {
	      longUrl: link
	    }
	  });
	  request.execute(function(response) {
	    var shortUrl = response.id;
	    console.log(shortUrl.substr(15));
	    document.getElementById("url").innerHTML = "#$" + shortUrl.substr(15);
	    document.getElementById("link").setAttribute("href", "http://" + window.location.hostname + "/#$" + shortUrl.substr(15));
	    document.getElementById("link").setAttribute("target", "_blank");
	    document.getElementById("qrlink").setAttribute("target", "_blank");
	    document.getElementById("statslink").setAttribute("target", "_blank");
	  	document.getElementById("statslink").setAttribute("href", "http://" + window.location.hostname + "/#$/info/" + shortUrl.substr(15));
	  	document.getElementById("qrlink").setAttribute("href", "http://" + window.location.hostname + "/#$" + shortUrl.substr(15) + ".qr");
	  });
	};

	var googleApiLoaded = function() {
	  gapi.client.setApiKey("Put api key here")
	  gapi.client.load("urlshortener", "v1", shortenUrl);
	};

	window.googleApiLoaded = googleApiLoaded;
	$(document.body).append('<script src="https://apis.google.com/js/client.js?onload=googleApiLoaded">&lt;/script>');
}

else if(location.hash.slice(1).substr(0,1) == "$"){
	link = location.hash.slice(1).substr(1);
	window.location = "https://goo.gl/" + link;
}

else{
	document.getElementById("cardo").style.display = "none";
}
