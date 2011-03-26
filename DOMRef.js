/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * @description Singleton utility for message to user.
 * @constructor
 */
var DOMRef = function() {
    var Refs = function () {
        this.imageref = "#image";
    };
    this.refs = new Refs();
    this.setup();
}

DOMRef.instance = null;

/**
 * @static
 */
DOMRef.getInstance = function () {
    if(DOMRef.instance == null) {
        DOMRef.instance = new DOMRef();
    }
    return DOMRef.instance;
}

DOMRef.prototype.setup = function() {
    for(var key in this.refs) {
        this.refs[key] = $(this.refs[key]);
    }
}

