/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * @
 */
var FileManager = function() {
    
}

/**
 * @description Static to make FileManager.prototype.upload to work
 * @static
 */
FileManager.image = null;

/**
 * @description Callback function for file upload
 * @param {object} event Event from input
 */
FileManager.prototype.upload = function(event) {
    var obj = DOMRef.getInstance().refs.imageref;
    FileManager.image = obj[0];
    // Get file from event
    var imagefile = event.target.files[0];
    // Check if file is an image
    //TODO check types
    if (!imagefile.type.match('image.*')) {
        return false;
    }
    
    var fr = new FileReader();

    // Execute when file is uploaded
    fr.onload = (function(file) {
        return function(e) {
            //TODO Fix id
            //var ctx = document.getElementById("image").getContext('2d');
            var ctx = FileManager.image.getContext('2d');
            // Create new image object
            var img = new Image();
            img.onload = function() {
                // Draw image object with canvas
                ctx.drawImage(img, 0, 0);
            }
            // Insert data from uploaded file into image object
            img.title = file.name;
            img.src = e.target.result;;
        };
    })(imagefile);
    // Upload!
    fr.readAsDataURL(imagefile);

    //TODO Fix id
    //setImage(document.getElementById("image"));
}

FileManager.prototype.download = function(event) {
    var url = image.toDataURL();
    return document.location.href = url;
}

/**
 * @return {object} image
 */
FileManager.prototype.getImage = function() {
    return image;
}

/**
 * @param {object} image
 */
FileManager.prototype.setImage = function(image) {
    FileManager.image = image;
}
