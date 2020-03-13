
// TODO: this currently cuts off an instance of the same if it's already playing.
function playAudioElem(selector, backwards) {
  const audioElem = document.querySelector(selector);
  audioElem.currentTime = 0;
  audioElem.play();
}

const soundMap = {
  "piano": {
    "U": { "1": "#Piano-mf-C4", "-1": "#Piano-mf-C5" },
    "L": { "1": "#Piano-mf-F4", "-1": "#Piano-mf-F5" },
    "F": { "1": "#Piano-mf-E4", "-1": "#Piano-mf-E5" },
    "R": { "1": "#Piano-mf-G4", "-1": "#Piano-mf-G5" },
    "B": { "1": "#Piano-mf-D4", "-1": "#Piano-mf-D5" },
    "D": { "1": "#Piano-mf-B4", "-1": "#Piano-mf-B5" },
  },
  "clicks": {
    "U": { "1": "#audio156", "-1": "#audio156" },
    "L": { "1": "#audio135", "-1": "#audio135" },
    "F": { "1": "#audio157", "-1": "#audio157" },
    "R": { "1": "#audio164", "-1": "#audio164" },
    "D": { "1": "#audio181", "-1": "#audio181" },
  }
};
const fallbackSounds = { "1": "#audio164", "-1": "#audio164" };

function onMoveEvent(moveEvent) {
  const soundBank = document.querySelector("#soundbank").value;
  const audioSelector = (soundMap[soundBank][moveEvent.latestMove.family] ?? fallbackSounds)[moveEvent.latestMove.amount];
  playAudioElem(audioSelector);
}

window.addEventListener("load", () => {
  document.body.querySelector("#connect").addEventListener("click", async function () {
    console.log("Connecting...");
    const connectFn = document.querySelector("#input-device").value === "smart-cube" ? cubing.bluetooth.connect : cubing.bluetooth.debugKeyboardConnect;
    const puzzle = await connectFn();
    console.log("Connected!", { puzzle });
    puzzle.addMoveListener(onMoveEvent);
  });
});
