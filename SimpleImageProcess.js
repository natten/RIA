/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


/**
 * "Abstract" base class
 */

var SimpleImageProcess = function() {
    this.image = null;
}

/**
 */
SimpleImageProcess.prototype.process = function() {

}

 /**
  *
  */
SimpleImageProcess.prototype.setImage = function(image) {
    image = image;
}

/**
 *
 */
SimpleImageProcess.prototype.getImage = function() {
    return image;
}

/**
 * Callback to update image properly.
 */
SimpleImageProcess.prototype.updateImage = function(newimage) {
    image = newimage;
}

/**
 * @description Undo all changes
 */
SimpleImageProcess.clear = function() {
    Pixastic.revert(image);
}

/**
 * Blur image
 * @extends SimpleImageProcess
 */
var Blur = function() {

}

Blur.prototype = new SimpleImageProcess;
Blur.prototype.process = function() {
    var ret = Pixastic.process(image, "blur", null, SimpleImageProcess.prototype.updateImage);
    if(ret == false)
        return false;
    else
        return true;
}


/**
 * Glow
 * @extends SimpleImageProcess
 */
var Glow = function() {
    this.amount = 0.2;
    this.radius = 6;
}

Glow.prototype = new SimpleImageProcess;
Glow.prototype.process = function() {
    var ret = Pixastic.process(image, "glow", {amount:this.amount,radius:this.radius}, SimpleImageProcess.prototype.updateImage);
    if(ret == false)
        return false;
    else
        return true;
}


/**
 * Sharpens image
 * @extends SimpleImageProcess
 */
var Sharpen = function() {
    this.amount = 0.2;
}

Sharpen.prototype = new SimpleImageProcess;
Sharpen.prototype.process = function() {
    var ret = Pixastic.process(image, "sharpen", {amount:this.amount}, SimpleImageProcess.prototype.updateImage);
    if(ret == false)
        return false;
    else
        return true;
}