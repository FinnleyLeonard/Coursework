//makes drumkit class to store attributes of the player


class beatMaker{
    constructor(){
    this.pads = document.querySelectorAll('.pad'); //gets ID for all pads
    this.kickAudio = document.querySelector('.kick-sound'); //gets the chosen kick sound
    this.snareAudio = document.querySelector('.snare-sound'); // gets chosen snare sound
    this.hihatAudio = document.querySelector('.hihat-sound'); // gets chosen hihat sound
    this.tomAudio = document.querySelector('.tom-sound'); // gets chosen tom sound
    this.currentKick = './sound/kick-808.wav'; // stores current sound to be put into the HTML
    this.currentSnare = './sound/snare-808.wav'; // stores current sound to be put into the HTML
    this.currentHihat = './sound/hihat-808.wav'; // stores current sound to be put into the HTML
    this.currentTom = './sound/tom-808.wav'; // stores current sound to be put into the HTML
    this.pointer = 0; // the current index of the beat loop
    this.playBeat = document.querySelector('.play'); // gets the status of the play button
    this.playSave = document.querySelector('.save'); // gets status of the save button
    this.playData = document.querySelector('.beatGet'); // gets status of the beat menu button
    this.isPlaying = null; //checks if the beat is playing
    this.selects = document.querySelectorAll('select'); // gets all selected/active pads
    this.mute = document.querySelectorAll('.mute'); // checks if its muted
    this.tempo = 160; // tempo in BPM that the beat plays at
    this.tempoSlider = document.querySelector('.tempo-slider'); // gets current value of the tempo slider
    }
    activePad(){
        this.classList.toggle("active"); // toggles the pad to active when clicked on
    }
    repeater(){ // cycles through each colum of the beat maker
        let step = this.pointer % 16; // finds which point it is in the beat
        const activeBars = document.querySelectorAll(`.b${step}`); // gets all active bars in that column by class
        //loop the pads
        activeBars.forEach(bar => {
            bar.style.animation =  `playTrack 0.3s alternate ease 2`; // plays an animation when pad is selected
            //checks pads active
            if (bar.classList.contains("active")){ //plays noise if pad is selected
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
    ppBttnUpdt(){ // updates the contents of the play pause button
        if(!this.isPlaying) {
            this.playBeat.innerText = "Pause";
            this.playBeat.classList.add("active");
        } else {
            this.playBeat.innerText = "Play";
            this.playBeat.classList.remove("active");
        }
    }
    changeSound(e){ // changes the sound after its been selected
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
    muteUpt(e){ //mutes the track if the button has been pressed
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
    changeTempo(e){ // changes the tempo after its been selected
        const tempoText = document.querySelector(".tempo-nr");
        this.tempo = e.target.value;
        tempoText.innerText = e.target.value;
    }
    updateTempo(){ //updates the tempo after its been changed so it plays at the new speed
        clearInterval(this.isPlaying);
        this.isPlaying = null;
        const isPlaying = document.querySelector('.play');
        if(isPlaying.classList.contains('active')){
            this.startBeatMaker();
        }
    }

    async beatNameSweet(){ // creates an input box pop up for the beat name
        const { value: beatSaveName } = await Swal.fire({
            title: 'Input beat name',
            input: 'text',
            inputLabel: 'Your beat name',
            inputPlaceholder: 'Enter your beat name',
            inputValidator: (value) => {
                if (!value) {
                    return 'You need to write something!'
                } else {
                    Swal.fire("Nice!", "Beat name: " + value + "success");
                    Cookies.set("sweetBeatName", `${value}`);
                    this.saveBttn(); //actives info scrapping function
                }
            }
        });
    }


    saveBttn(){ // scrappes all the data from the current beat and makes an array to be sent off later
        const allActiveBars = document.querySelectorAll('.active');
        var kickOrder =0;
        var snareOrder =0;
        var hihatOrder =0;
        var tomOrder =0;
        var beatSaveName = readCookie("sweetBeatName");
        for (var i = 0; i < allActiveBars.length; i++) { // gets all active pads to  make into a number that will be later be converted to a binary number
            console.log(parseInt(allActiveBars[i].innerText) + " " + allActiveBars[i].className.split(/\s+/).slice(1,2)) // the binary number will use 1 and 0s to represent which pad is active
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
        var currentToken = readCookie("token"); // gets user token
        // adds all data to an array
        var saveData = [document.getElementById('ks').getAttribute('src'), kickOrder, document.getElementById('ss').getAttribute('src'), snareOrder, document.getElementById('hs').getAttribute('src'), hihatOrder, document.getElementById('ts').getAttribute('src'), tomOrder, document.querySelector(".tempo-nr").innerText, beatSaveName];
        console.log((String)(saveData))
        Cookies.set("saveData", (String)(saveData)); // sets save data to a cookie


        currentToken = readCookie("token")

        //sends to the java controller to be stored in an SQL database
        postBeatSave(saveData, currentToken);
    }

    async displayUserBeats(){
        var userBeatData;
        var currentToken = readCookie("token");
        var tempPromt;
        var beatDataSet = []
        var retrievedBeatData = [];
        var beatOptions = [];
        var selectionObj = {};
        const currentActiveBars = document.querySelectorAll('.active'); //gets all active bars
        const kickBars = document.querySelectorAll('.kick-pad'); //gets all kick pads
        const snareBars = document.querySelectorAll('.snare-pad'); // gets all snare pads
        const hihatBars = document.querySelectorAll('.hihat-pad'); // gets all hihat pads
        const tomBars = document.querySelectorAll('.tom-pad'); // gets all tom pads

        postBeatGet(currentToken); // sends token to find all beats under the userID

        userBeatData = readCookie("fetchBeatData"); // retrieves cookies with all of the Beat data
        userBeatData = userBeatData.substring(18); // converts all JSON characters to be used to become an array
        userBeatData = userBeatData.replace(/%22/g, "\"");
        userBeatData = userBeatData.replace(/%2C%20/g, "\",\"");
        userBeatData = userBeatData.replace(/%2C%/g, "\",");
        userBeatData = userBeatData.replace(/%2C/g, ",");
        userBeatData = userBeatData.replace(/%2520/g, " ");
        userBeatData = userBeatData.substring(0, userBeatData.length - 2);
        var beatDataSet = JSON.parse("[" + userBeatData + "]"); // converts array back into a json object

        for (let item of beatDataSet) { //gets all beat names
            beatOptions.push(item[9]);
        }

        var beatNumber = await sweetNumber(beatOptions); // get users to select option from a drop down



        for (var i = 0; i < currentActiveBars.length; i++) { // deactivates all pads
            console.log((currentActiveBars[i].innerText) + " " + currentActiveBars[i].className.split(/\s+/).slice(1,2));
            currentActiveBars[i].classList.toggle("active");
            console.log("deactivated")
        }

        console.log(beatNumber);
        var retrievedBeatData = Object.values(beatDataSet[parseInt(beatNumber)]) //gets the beat data of selected beat

        this.kickAudio.src = retrievedBeatData[0]; // retrieves and updates sequencer with new values
        $('#kick-select').val(retrievedBeatData[0]);
        this.snareAudio.src = retrievedBeatData[2];
        $('#snare-select').val(retrievedBeatData[2]);
        this.hihatAudio.src = retrievedBeatData[4];
        $('#hihat-select').val(retrievedBeatData[4]);
        this.tomAudio.src = retrievedBeatData[6];
        $('#tom-select').val(retrievedBeatData[6]);
        this.tempo = parseInt(retrievedBeatData[8]);
        document.querySelector(".tempo-nr").innerText = retrievedBeatData[8];
        $('tslider').val(retrievedBeatData[8]);
        BeatMaker.updateTempo(); // updates tempo

        // conver order number into binary number which then is reversed to get beat pattern in 1s and 0s
        var kickB = dec2bin(parseInt(retrievedBeatData[1]));
        var snareB = dec2bin(parseInt(retrievedBeatData[3]));
        var hihatB = dec2bin(parseInt(retrievedBeatData[5]));
        var tomB = dec2bin(parseInt(retrievedBeatData[7]));
        console.log(parseInt(retrievedBeatData[1]))
        console.log(kickB);
        //goes through the binary number toggling when i = 1
        for (var i = 0; i < kickB.length; i++) {
            if (kickB[i] == "1") {
                kickBars[i].classList.toggle("active");
                console.log("active :)");
            }
        }
        for (var i = 0; i < snareB.length; i++) {
            if (snareB[i] == "1") {
                snareBars[i].classList.toggle("active");
                console.log("active :)");
            }
        }
        for (var i = 0; i < hihatB.length; i++) {
            if (hihatB[i] == "1") {
                hihatBars[i].classList.toggle("active");
                console.log("active :)");
            }
        }
        for (var i = 0; i < tomB.length; i++) {
            if (tomB[i] == "1") {
                tomBars[i].classList.toggle("active");
                console.log("active :)");
            }
        }

    }

}
//makes beatmaker class
const BeatMaker = new beatMaker();

//event listners

BeatMaker.pads.forEach(pad => { // activates pads when clicked on
  pad.addEventListener('click', BeatMaker.activePad);
  pad.addEventListener('animationend', function() {this.style.animation = ""});
});
BeatMaker.playBeat.addEventListener('click', function() { // starts playing the beat when play is pressed
  BeatMaker.ppBttnUpdt();
  BeatMaker.startBeatMaker();
});

BeatMaker.playSave.addEventListener('click', function() { // pops up asking for beat name
    BeatMaker.beatNameSweet();
});

BeatMaker.playData.addEventListener('click', function() { // starts the process of the user selected a presaved beat
  BeatMaker.displayUserBeats();
});

BeatMaker.selects.forEach(select => { //changes sound when the selection changes
    select.addEventListener('change', function(e){
        BeatMaker.changeSound(e);
    });
});

BeatMaker.mute.forEach(select => { //mutes beat/ unmutes beat when the button is pressed
    select.addEventListener('click', function(e){
        BeatMaker.muteUpt(e);
    });
});

BeatMaker.tempoSlider.addEventListener('input', function(e) { // changes tempo as the slider moves
    BeatMaker.changeTempo(e);
});

BeatMaker.tempoSlider.addEventListener('change', function(e) { // changes tempo as the slider stops moving
    BeatMaker.updateTempo(e);
});

function readCookie(name) { //reads cookies
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function postBeatSave(saveData, currentToken) { // sends beat data to java controller
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
           window.open("index.html", "_self");
           console.log("done");       //open index.html in same tab
       }
   });
}
function postBeatGet(currentToken) { // gets beats from database
   console.log("Invoked postBeatGet() ");

   var url = "/beat/get";
   fetch(url, {
       method: "GET",
   }).then(response => {
       return response.json();                //now return that promise to JSON
   }).then(response => {
       if (response.hasOwnProperty("Error")) {
           alert(JSON.stringify(response));        // if it does, convert JSON object to string and alert
       } else {
            Cookies.set("fetchBeatData", response);
       }
   });
}

function dec2bin(dec){ // convers to binary the reverses it
    return (dec >>> 0).toString(2).split("").reverse().join("");
}



let sweetNumber = async (selectionObj) => { // opens a menu to select saved beat
  var options = {};
  for (let i = 0; i < selectionObj.length; i++) {
      options[i] = selectionObj[i];
  }
  const { value: beatSelected } = await Swal.fire({
    title: 'Select the beat you want',
    input: 'select',
    inputOptions: options,
    inputPlaceholder: 'Select a beat',
    showCancelButton: true,
  });
  return beatSelected;
}
