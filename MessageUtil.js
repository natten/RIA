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

}

MessageUtil.prototype.beginLoad = function() {

}

MessageUtil.prototype.endLoad = function() {

}