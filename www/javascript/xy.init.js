window.addEventListener("load", function load(event){

    console.log("init xy");
    
    // START OF file-attachment stuff
    // https://github.com/github/file-attachment-element

    document.addEventListener('file-attachment-accepted', function(event) {

	console.log("accepted");
	
	var attachments = event.detail.attachments;

	var first = attachments[0];

	var file = first.file

	if (! file.type.startsWith("image/")){
	    alert("Unsupported file type");
	    return false;
	}
	
	var reader = new FileReader();
	
	reader.addEventListener("load", function () {

	    console.log("read complete");
	    
	    var meta = document.getElementById("image-meta");
	    meta.innerText = file.name;
	    
	    var wrapper = document.getElementById("image-wrapper");
	    wrapper.innerHTML = "";
	    
	    var im = document.createElement("img");
	    im.setAttribute("id", "target");
	    im.src = reader.result;

	    im.onclick = function(e){

		console.log("EVENT", e);
		
		var b = this.getBoundingClientRect()
		
		var bx = b.x - (b.x * 2)
		var by = b.y - (b.x * 2)	 
		
		var x = bx + e.x - this.offsetLeft;
		var y = by + e.y - this.offsetTop;

		// TBD: https://github.com/github/clipboard-copy-element

		document.getElementById('coords').innerHTML = x+","+y;        
	    };
	    
	    wrapper.appendChild(im);
	    wrapper.style.display = "block";
	    meta.style.display = "block";

	}, false);

	console.log("read ", file);
	reader.readAsDataURL(file);
      
    })

    // END OF file-attachment stuff

    console.log("OMGWTF");
});
