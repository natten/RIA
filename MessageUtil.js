/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * @description Singleton utility for message to user.
 */
var MessageUtil = function() {

}

MessageUtil.instance = null;

/**
 * @static
 */
MessageUtil.getInstance = function () {
    if(MessageUtil.instance == null) {
        MessageUtil.instance = new MessageUtil();
    }
    return MessageUtil.instance;
}

MessageUtil.prototype.messageBox = function(message) {
    var obj = DOMRef.getInstance().refs.msgboxref;
    var element = obj[0];
    element.innerHTML = "<p>" + message + "</p>";
}

MessageUtil.prototype.beginLoad = function() {

}

MessageUtil.prototype.endLoad = function() {

}