//makes drumkit class to store attributes of the player
class beatMaker{
    constructor(){
    this.pads = document.querySelectorAll('.pad');
    this.kickAudio = document.querySelector('.kick-sound');
    this.snareAudio = document.querySelector('.snare-sound');
    this.pointer = 0;
    this.tempo = 150;
    this.playBeat = document.querySelector('.play');
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
            bar.style.animation =  `playTrack 0.3s alternate ease-in-out 2`;
            //checks pads active
            if (bar.classList.contains("active")){
                if (bar.classList.contains("kick-pad"))
                    this.kickAudio.play();
                if (bar.classList.contains("snare-pad"))
                    this.snareAudio.play()

            }
        });

        this.pointer++;
    }
    startBeatMaker(){
        console.log("pog3");
        const interval = (60/this.tempo) * 1000;
        setInterval(() => {
            this.repeater();
        }, interval);
    }
}

const BeatMaker = new beatMaker();

BeatMaker.pads.forEach(pad => {
  pad.addEventListener('click', BeatMaker.activePad);
  pad.addEventListener('animationend', function() {this.style.animation = ""});
  console.log("pog4");
});
BeatMaker.playBeat.addEventListener('click', function() {
  BeatMaker.startBeatMaker();
  console.log("pog5");
});
