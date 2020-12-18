//makes drumkit class to store attributes of the player


class beatMaker{
    constructor(){
    this.pads = document.querySelectorAll('.pad');
    this.kickAudio = document.querySelector('.kick-sound');
    this.snareAudio = document.querySelector('.snare-sound');
    this.hihatAudio = document.querySelector('.hihat-sound');
    this.tomAudio = document.querySelector('.tom-sound');
    this.currentKick = './sound/kick-808.wav';
    this.currentSnare = './sound/snare-808.wav';
    this.currentHihat = './sound/hihat-808.wav';
    this.currentTom = './sound/tom-808.wav';
    this.pointer = 0;
    this.tempo = 160;
    this.playBeat = document.querySelector('.play');
    this.playSave = document.querySelector('.save');
    this.playData = document.querySelector('.beatGet');
    this.isPlaying = null;
    this.selects = document.querySelectorAll('select');
    this.mute = document.querySelectorAll('.mute');
    this.tempoSlider = document.querySelector('.tempo-slider');
    }
    activePad(){
        this.classList.toggle("active");
    }
    repeater(){
        let step = this.pointer % 16;
        const activeBars = document.querySelectorAll(`.b${step}`);
        //loop the pads
        activeBars.forEach(bar => {
            bar.style.animation =  `playTrack 0.3s alternate ease 2`;
            //checks pads active
            if (bar.classList.contains("active")){
                if (bar.classList.contains("kick-pad")){
                    this.kickAudio.currentTime = 0;
                    this.kickAudio.play();}

                if (bar.classList.contains("snare-pad")){
                    this.snareAudio.currentTime = 0;
                    this.snareAudio.play();}
                if (bar.classList.contains("hihat-pad")){
                    this.hihatAudio.currentTime = 0;
                    this.hihatAudio.play();}
                if (bar.classList.contains("tom-pad")){
                    this.tomAudio.currentTime = 0;
                    this.tomAudio.play();}
            }
        });

        this.pointer++;
    }
    startBeatMaker(){

        const interval = (60/this.tempo) * 1000;
        //playing check
        if(!this.isPlaying){
        this.isPlaying = setInterval(() => {
            this.repeater();
        }, interval);
        } else {
        //remove interval
        clearInterval(this.isPlaying);
        this.isPlaying = null;
        }
    }
    ppBttnUpdt(){
        if(!this.isPlaying) {
            this.playBeat.innerText = "Pause";
            this.playBeat.classList.add("active");
        } else {
            this.playBeat.innerText = "Play";
            this.playBeat.classList.remove("active");
        }
    }
    changeSound(e){
        const soundName = e.target.name;
        const soundValue = e.target.value;
        switch(soundName){
            case "kick-select":
                this.kickAudio.src = soundValue;
                break;
            case "snare-select":
                this.snareAudio.src = soundValue;
                break;
            case "hihat-select":
                this.hihatAudio.src = soundValue;
                break;
            case "tom-select":
                this.tomAudio.src = soundValue;
                break;
        }
    }
    muteUpt(e){
        const muteIndex = e.target.getAttribute('data-track');
        e.target.classList.toggle("active");
        if(e.target.classList.contains("active")){
            switch(muteIndex){
                case "0":
                    this.kickAudio.volume = 0;
                    break;
                case "1":
                    this.snareAudio.volume = 0;
                    break;

                case "2":
                     this.hihatAudio.volume = 0;
                     break;
                case "3":
                     this.tomAudio.volume = 0;
                     break;
            }
        } else {
            switch(muteIndex){
                case "0":
                    this.kickAudio.volume = 1;
                    break;
                case "1":
                    this.snareAudio.volume = 1;
                    break;

                case "2":
                     this.hihatAudio.volume = 1;
                     break;
                case "3":
                     this.tomAudio.volume = 1;
                     break;
            }
        }

    }
    changeTempo(e){
        const tempoText = document.querySelector(".tempo-nr");
        this.tempo = e.target.value;
        tempoText.innerText = e.target.value;
    }
    updateTempo(){
        clearInterval(this.isPlaying);
        this.isPlaying = null;
        const isPlaying = document.querySelector('.play');
        if(isPlaying.classList.contains('active')){
            this.startBeatMaker();
        }
    }
    saveBttn(){
        const allActiveBars = document.querySelectorAll('.active');
        var kickOrder =0;
        var snareOrder =0;
        var hihatOrder =0;
        var tomOrder =0;
        var beatName = prompt("Please Beat Name:", "Untitled");
         if (beatName== null || beatName == "") {
            return null;
          }
        for (var i = 0; i < allActiveBars.length; i++) {
            console.log(parseInt(allActiveBars[i].innerText) + " " + allActiveBars[i].className.split(/\s+/).slice(1,2))
            if (allActiveBars[i].className.split(/\s+/).slice(1,2) == "kick-pad"){
                kickOrder += 2 ** parseInt(allActiveBars[i].innerText);
            } else if (allActiveBars[i].className.split(/\s+/).slice(1,2) == "snare-pad"){
                snareOrder += 2 ** parseInt(allActiveBars[i].innerText);
            } else if (allActiveBars[i].className.split(/\s+/).slice(1,2) == "hihat-pad"){
                hihatOrder += 2 ** parseInt(allActiveBars[i].innerText);
            } else if (allActiveBars[i].className.split(/\s+/).slice(1,2) == "tom-pad"){
                tomOrder += 2 ** parseInt(allActiveBars[i].innerText);
            }

        }
        console.log(kickOrder + ' ' + snareOrder + ' ' + hihatOrder + ' ' + tomOrder);
        var currentToken = readCookie("token");
        var saveData = [this.currentKick, kickOrder, this.currentSnare, snareOrder,this.currentHihat, hihatOrder, this.currentTom, tomOrder, this.tempo, beatName];
        console.log((String)(saveData))
        Cookies.set("saveData", (String)(saveData));


        currentToken = readCookie("token")


        postBeatSave(saveData, currentToken);
    }

    displayUserBeats(){
        var userBeatData = [];
        var currentToken = readCookie("token");
        postBeatGet(currentToken);
        console.log(readCookie("saveData"));
    }
}

const BeatMaker = new beatMaker();

//event listners

BeatMaker.pads.forEach(pad => {
  pad.addEventListener('click', BeatMaker.activePad);
  pad.addEventListener('animationend', function() {this.style.animation = ""});
});
BeatMaker.playBeat.addEventListener('click', function() {
  BeatMaker.ppBttnUpdt();
  BeatMaker.startBeatMaker();
});

BeatMaker.playSave.addEventListener('click', function() {
  BeatMaker.saveBttn();
});

BeatMaker.playData.addEventListener('click', function() {
  BeatMaker.displayUserBeats();
});

BeatMaker.selects.forEach(select => {
    select.addEventListener('change', function(e){
        BeatMaker.changeSound(e);
    });
});

BeatMaker.mute.forEach(select => {
    select.addEventListener('click', function(e){
        BeatMaker.muteUpt(e);
    });
});

BeatMaker.tempoSlider.addEventListener('input', function(e) {
    BeatMaker.changeTempo(e);
});

BeatMaker.tempoSlider.addEventListener('change', function(e) {
    BeatMaker.updateTempo(e);
});

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function postBeatSave(saveData, currentToken) {
   console.log("Invoked postBeatSave() ");

   var url = "/beat/save";

   fetch(url, {
       method: "POST",
       body: saveData, currentToken,
   }).then(response => {
       return response.json();                 //now return that promise to JSON
   }).then(response => {
       if (response.hasOwnProperty("Error")) {
           alert(JSON.stringify(response));        // if it does, convert JSON object to string and alert
       } else {
           console.log("done");       //open index.html in same tab
       }
   });
}
function postBeatGet(currentToken) {
   console.log("Invoked postBeatGet() ");

   var url = "/beat/get";
   fetch(url, {
       method: "GET",
   }).then(response => {
       return response.json;                //now return that promise to JSON
   }).then(response => {
       if (response.hasOwnProperty("Error")) {
           alert(JSON.stringify(response));        // if it does, convert JSON object to string and alert
       } else {
            Cookies.set("fetchBeatData", response);
            console.log(JSON.stringify(response.json));
       }
   });
}





