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
    this.tempo = 200;
    this.playBeat = document.querySelector('.play');
    this.isPlaying = null;
    this.selects = document.querySelectorAll('select');
    }
    activePad(){
        this.classList.toggle("active");
        console.log("pog1")
    }
    repeater(){
        console.log("pog2");
        let step = this.pointer % 8;
        const activeBars = document.querySelectorAll(`.b${step}`);
        //loop the pads
        activeBars.forEach(bar => {
            bar.style.animation =  `playTrack 0.5s alternate ease 2`;
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
        console.log("pog3");
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
        console.log("runnin methord")
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
        }
    }
}

const BeatMaker = new beatMaker();

//event listners

BeatMaker.pads.forEach(pad => {
  pad.addEventListener('click', BeatMaker.activePad);
  pad.addEventListener('animationend', function() {this.style.animation = ""});
  console.log("pog4");
});
BeatMaker.playBeat.addEventListener('click', function() {
  BeatMaker.ppBttnUpdt();
  BeatMaker.startBeatMaker();
  console.log("pog5");
});

BeatMaker.selects.forEach(select => {
    select.addEventListener('change', function(e){
        BeatMaker.changeSound(e);
    });
});
