// Create a synth

const synth = new Tone.PolySynth(Tone.Synth).toDestination();
// Get piano table & setup var that will contain html
let pianoHTML = "";
const pianoDiv = document.getElementById("piano");
// Gets current time so notes play immediately when you press a key
let now = Tone.now();
// Default octave/note length
let octave = 3; // changes pitch
let length = 50; // lower = longer

// Array containing objects
// Maps each key on computer keyboard to piano note
let keyNotes = [
  { key: "a", note: "", ids: [65], octaveOffset: 0, position: -1 },
  { key: "b", note: "", ids: [66], octaveOffset: 0, position: -1 },
  { key: "c", note: "", ids: [67], octaveOffset: 0, position: -1 },
  { key: "d", note: "", ids: [68], octaveOffset: 0, position: -1 },
  { key: "e", note: "E", ids: [69], octaveOffset: 0, position: 54 },
  { key: "f", note: "", ids: [70], octaveOffset: 0, position: -1 },
  { key: "g", note: "", ids: [71], octaveOffset: 0, position: -1 },
  { key: "h", note: "", ids: [72], octaveOffset: 0, position: -1 },
  { key: "i", note: "C", ids: [73], octaveOffset: 1, position: 62 },
  { key: "j", note: "", ids: [74], octaveOffset: 0, position: -1 },
  { key: "k", note: "", ids: [75], octaveOffset: 0, position: -1 },
  { key: "l", note: "", ids: [76], octaveOffset: 0, position: -1 },
  { key: "m", note: "", ids: [77], octaveOffset: 0, position: -1 },
  { key: "n", note: "", ids: [78], octaveOffset: 0, position: -1 },
  { key: "o", note: "D", ids: [79], octaveOffset: 1, position: 64 },
  { key: "p", note: "E", ids: [80], octaveOffset: 1, position: -1 },
  { key: "q", note: "C", ids: [81], octaveOffset: 0, position: 50 },
  { key: "r", note: "F", ids: [82], octaveOffset: 0, position: 55 },
  { key: "s", note: "", ids: [83], octaveOffset: 0, position: -1 },
  { key: "t", note: "G", ids: [84], octaveOffset: 0, position: 57 },
  { key: "u", note: "B", ids: [85], octaveOffset: 0, position: 61 },
  { key: "v", note: "", ids: [86], octaveOffset: 0, position: -1 },
  { key: "w", note: "D", ids: [87], octaveOffset: 0, position: 52 },
  { key: "x", note: "", ids: [88], octaveOffset: 0, position: -1 },
  { key: "y", note: "A", ids: [89], octaveOffset: 0, position: 59 },
  { key: "z", note: "", ids: [90], octaveOffset: 0, position: -1 },
  { key: "1", note: "", ids: [49], octaveOffset: 0, position: -1 },
  { key: "2", note: "Db", ids: [50], octaveOffset: 0, position: 51 },
  { key: "3", note: "Eb", ids: [51], octaveOffset: 0, position: 53 },
  { key: "4", note: "", ids: [52], octaveOffset: 0, position: -1 },
  { key: "5", note: "Gb", ids: [53], octaveOffset: 0, position: 56 },
  { key: "6", note: "Ab", ids: [54], octaveOffset: 0, position: 58 },
  { key: "7", note: "Bb", ids: [55], octaveOffset: 0, position: 60 },
  { key: "8", note: "", ids: [56], octaveOffset: 0, position: -1 },
  { key: "9", note: "Db", ids: [57], octaveOffset: 1, position: 63 },
  { key: "0", note: "Eb", ids: [48], octaveOffset: 1, position: 65 },
];

// Initialise piano pianoDiv
pianoHTML += "<div class='pianoinner'>";
let keysWithPositions = keyNotes.filter((a) => a.position !== -1); // filters out no pos
keysWithPositions.sort((a, b) => a.position - b.position); // puts in order
for (let key of keysWithPositions) {
  // puts keys in boxes
  pianoHTML += `<div id='k${key.key}'>`;
  pianoHTML += `<div class='note'>${key.note}</div><div class='key'>(${key.key})</div>`;
  pianoHTML += "</div>";
}
pianoHTML += "</div>";

// Add pianoDiv to page
pianoDiv.innerHTML = pianoHTML;

// Function to play note
let playNote = (note, length) => {
  now = Tone.now();
  synth.triggerAttackRelease(note, length, now);
  return;
};

// Event listener for keydown to play note
document.addEventListener("keydown", async (e) => {
  let currentNote = keyNotes.find((a) => a.ids.includes(e.keyCode));
  if (currentNote !== undefined && currentNote.note !== "") {
    playNote(
      currentNote.note + (octave + currentNote.octaveOffset),
      `${length}n`
    );
    let currentTableItem = document.getElementById(`k${currentNote.key}`);
    currentTableItem.classList.add("pressed");
    setTimeout(() => {
      currentTableItem.classList.remove("pressed");
    }, 400);
  }
});
