var name="Tom";
(function(){
	console.log(name);
	if(typeof name==="undefined"){
		var name="sam";
		console.log("goodbye "+name);
	}else{
		console.log("hello"+name);
	}
})();
