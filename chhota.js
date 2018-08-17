if(location.hash.slice(1).substr(0,1) == "$"){
	link = location.hash.slice(1).substr(1);
	window.location = "https://goo.gl/" + link;
}
