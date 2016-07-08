
class demoViewer{
    constructor(){
        this.groupInfoWrap = document.getElementById("groupInfoWrap");
        this.activeTest = 2;
    }
    clearWrapper(){
        while (this.groupInfoWrap.hasChildNodes()) {
            this.groupInfoWrap.removeChild(this.groupInfoWrap.firstChild);
        }
    }
    makeInfo1(nr){
        /**
         <div class="row statRow">
             <div class="progress fightProgress">
                 <div class="progress-bar" role="progressbar" aria-valuenow="50"
                     aria-valuemin="0" aria-valuemax="100" style="width:50%; background:blue;">
                     <span class="sr-only">70% Complete</span>
                 </div>
                 <div class="progress-bar" role="progressbar" aria-valuenow="50"
                     aria-valuemin="0" aria-valuemax="100" style="width:50%; background:red;">
                     <span class="sr-only">70% Complete</span>
                 </div>
             </div>
             <div class ="col-xs-6 groupInfo">
                 <div class = title>Hench</div>
                 <div class = statInfo>Str: 100</div>
                 <div class = statInfo>Def:25</div>

             </div>
                 <div class ="col-xs-6 groupInfo">
                 <div class = title>Villager</div>
                 <div class = statInfo>Str: 100</div>
                 <div class = statInfo>Def:25</div>
             </div>
         </div>
         **/
        let returnRow = document.createElement("div");

        let barVal = Math.floor(Math.random() * 101);
        let strHench = Math.floor(Math.random() * 101);
        let strVillager = Math.floor(Math.random() * 101);
        let defHench = Math.floor(Math.random() * 101);
        let defVillager = Math.floor(Math.random() * 101);

        let currentRow = returnRow;
        
        currentRow.className = "row statRow";
        currentRow = currentRow.appendChild(document.createElement("div"));
        currentRow.className = "progress fightProgress";
        currentRow = currentRow.appendChild(document.createElement("div"));
        currentRow.className = "progress-bar";
        currentRow.style = "width:" + barVal + "%; background:lightskyblue;";

        currentRow = returnRow;
        currentRow = currentRow.appendChild(document.createElement("div"));
        currentRow.className = "col-xs-6 groupInfo";
        currentRow = currentRow.appendChild(document.createElement("div"));
        currentRow.className = "titleHenchmen";
        currentRow.innerHTML = "Henchman " + nr;
        currentRow = currentRow.parentNode;
        currentRow = currentRow.appendChild(document.createElement("div"));
        currentRow.className = "statInfoHenchmen";
        currentRow.innerHTML = "Str: " + strHench;
        currentRow = currentRow.parentNode;
        currentRow = currentRow.appendChild(document.createElement("div"));
        currentRow.className = "statInfoHenchmen";
        currentRow.innerHTML = "Def: "+defHench;

        currentRow = returnRow;
        currentRow = currentRow.appendChild(document.createElement("div"));
        currentRow.className = "col-xs-6 groupInfo";
        currentRow = currentRow.appendChild(document.createElement("div"));
        currentRow.className = "titleVillager";
        currentRow.innerHTML = "Villager";
        currentRow = currentRow.parentNode;
        currentRow = currentRow.appendChild(document.createElement("div"));
        currentRow.className = "statInfoVillager";
        currentRow.innerHTML = "Str: " + strVillager;
        currentRow = currentRow.parentNode;
        currentRow = currentRow.appendChild(document.createElement("div"));
        currentRow.className = "statInfoVillager";
        currentRow.innerHTML = "Def: " + defVillager;


        return returnRow;
    }
    test1(){

        this.activeTest = 1;

        this.clearWrapper();

        for(let i=0; i<10;i++){
            this.groupInfoWrap.appendChild(this.makeInfo1(i));
        }
    }
}

class GUI{
    constructor(){
    }
}

class Game{
    constructor(){
        this._GUI = {
            map_page:{
                map:{
                    id:"",
                    background: new Background(),
                    people:new People(),
                    player:new Player(),
                },
                log: log,
                stats: "",
                groups:""
            },
            hemchmen_page:{

            },
            research_page:{

            },
            factory_page:{

            },
            powers_page:{

            },
            slide_page:{}
        };


        this.GUI.map_page.map.background.redraw();
        this.GUI.map_page.map.people.redraw();

        this.log("My henchmen stole candy from a baby");
        this.log("My science project is done");
    }
    tick(){
        console.log("Tick");
        setTimeout(this.tick.bind(this),1000);
    }

    start(){
        this.tick();
    }

    stop(){
        clearTimeout();
    }
    log(text){
        this.GUI.map_page.log.report(text);
    }
    get GUI() {return this._GUI;} set GUI(value){this._GUI = value;}
}
var log = new Log();
function init() {
    game = new Game();
    console.log(game.GUI.map_page.map.player);
    document.addEventListener('keydown', game.GUI.map_page.map.player.movePlayer, true);
    game.start();

}
function resetMap(){
    back = new Background();
    back.redraw();
}

function movePeople(){
    peo.move();
    peo.redraw();
}

demo = new demoViewer();

function startDemo(){
    demo.test1();
}

/*
function switchSize(){
    var contextb= document.getElementById("background").getContext("2d");
    contextb.clearRect(0, 0, contextb.canvas.width, contextb.canvas.height);
    var contextp = document.getElementById("people").getContext("2d");
    contextp.clearRect(0, 0, contextp.canvas.width, contextp.canvas.height);

    small = !small;
    back = new Background();
    peo = new People();
    back.redraw();
    peo.redraw();
}
*/
function closeAllPanels(){
    for(var p in panels){
        document.getElementById(panels[p]).style["display"] = "none";
    }
}
//noinspection JSUnusedLocalSymbols
function changePanel(nr){
    closeAllPanels();
    document.getElementById(panels[nr]).style["display"]="inline";
}

