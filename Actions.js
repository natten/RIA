/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


var Actions = function() {
    this.sip = null;
    this.filemanager = null;
}

Actions.prototype.doAction = function(action) {
    if(this.filemanager != null) {
        switch(action) {
            case "blur":
                this.sip = new Blur();
                break;
            case "sharpen":
                this.sip = new Sharpen();
                break;
            case "glow":
                this.sip = new Glow();
                break;
            case "clear":
                SimpleImageProcess.clear();
                break;
        }

        this.sip.setImage(this.filemanager.getImage());
        return this.sip.process();
    }
    return false;
}

Actions.prototype.getAvailableActions = function() {
    var availableactions = [4];
    availableactions[0] = "blur";
    availableactions[1] = "sharpen";
    availableactions[2] = "glow";
    availableactions[3] = "clear";
    return availableactions;
}

Actions.prototype.setFileManager = function(filemanager) {
    this.filemanager = filemanager;
}


