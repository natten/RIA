/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


var PicApp = function() {   
    this.filemanager = new FileManager();
    this.actions = new Actions();
    this.actions.setFileManager(this.filemanager);
}

PicApp.prototype.doAction = function(action) {
    this.actions.doAction(action);
}

PicApp.prototype.getFileManager = function() {
    return this.filemanager;
}

