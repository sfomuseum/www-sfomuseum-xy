window.addEventListener("load", function load(event){

    var wrapper = document.getElementById("image-wrapper");
    var coords = document.getElementById('coords');
    
    // START OF file-attachment stuff
    // https://github.com/github/file-attachment-element

    document.addEventListener('file-attachment-accepted', function(event) {

	wrapper.style.display = "none";
	
	wrapper.innerHTML = "";
	coords.innerHTML = "";
	
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
	    	    
	    var im = document.createElement("img");
	    im.setAttribute("id", "target");
	    im.src = reader.result;

	    im.onclick = function(e){

		var el = e.target;
		
		var b = el.getBoundingClientRect()

		var bx = b.x - (b.x * 2)
		var by = b.y - (b.y * 2)	 
		
		var x = bx + e.x - el.offsetLeft;
		var y = by + e.y - el.offsetTop;

		// TBD: https://github.com/github/clipboard-copy-element

		coords.innerText = x + "," + y;        
	    };
	    
	    wrapper.appendChild(im);
	    wrapper.style.display = "block";

	}, false);

	console.log("read ", file);
	reader.readAsDataURL(file);
    })

    // END OF file-attachment stuff
});
