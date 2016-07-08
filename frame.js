class Frame{
    constructor(id){
        this.element = document.getElementById(id);
    }
}
class Log extends Frame{
    constructor(){
        console.log("Starting log");
        super("bottomPanelL");
        //this.logElement = document.getElementById("bottomPanelL");
        this.element.style.backgroundImage = "url('Resources/Images/LogImg.png')";
    }
    makeMsg(text){
        let returnMsg = document.createElement("div");
        returnMsg.className = "logMsg";
        returnMsg.innerHTML+=text;
        return returnMsg;
    }
    report(text){
        console.log("logging: " + text);
        this.element.appendChild(this.makeMsg(text));
        this.element.appendChild(document.createElement("br"));
        this.element.scrollTop = this.element.scrollHeight;
    }
}
class Center extends Frame{
    constructor(){
        super("midline");
        this.element.style.backgroundImage = "url('Resources/Images/Fold.png')";
    }
}