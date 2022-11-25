import { Move } from "cubing/alg";
import { connectSmartPuzzle, debugKeyboardConnect } from "cubing/bluetooth";

// TODO: this currently cuts off an instance of the same if it's already playing.
function playAudioElem(selector: string): void {
  const audioElem = document.querySelector(selector) as HTMLAudioElement;
  audioElem.currentTime = 0;
  audioElem.play();
}

const soundMap = {
  piano: {
    U: { "1": "#Piano-mf-C4", "-1": "#Piano-mf-C5" },
    L: { "1": "#Piano-mf-F4", "-1": "#Piano-mf-F5" },
    F: { "1": "#Piano-mf-E4", "-1": "#Piano-mf-E5" },
    R: { "1": "#Piano-mf-G4", "-1": "#Piano-mf-G5" },
    B: { "1": "#Piano-mf-D4", "-1": "#Piano-mf-D5" },
    D: { "1": "#Piano-mf-B4", "-1": "#Piano-mf-B5" },
  },
  clicks: {
    U: { "1": "#audio156", "-1": "#audio156" },
    L: { "1": "#audio135", "-1": "#audio135" },
    F: { "1": "#audio157", "-1": "#audio157" },
    R: { "1": "#audio164", "-1": "#audio164" },
    D: { "1": "#audio181", "-1": "#audio181" },
  },
};
const fallbackSounds = { "1": "#audio164", "-1": "#audio164" };

const soundbankSelect = document.querySelector(
  "#soundbank",
) as HTMLSelectElement;

(document.body.querySelector("#connect") as HTMLButtonElement).addEventListener(
  "click",
  async function () {
    console.log("Connecting...");
    const connectFn =
      (document.querySelector("#input-device") as HTMLSelectElement).value ===
      "smart-cube"
        ? connectSmartPuzzle
        : debugKeyboardConnect;
    const puzzle = await connectFn();
    console.log("Connected!", { puzzle });
    puzzle.addAlgLeafListener((algLeafEvent) => {
      const soundBank = soundbankSelect.value;
      const move = algLeafEvent.latestAlgLeaf.as(Move);
      if (!move) {
        return;
      }
      const audioSelector = (soundMap[soundBank][move.family] ??
        fallbackSounds)[move.amount];
      playAudioElem(audioSelector);
    });
  },
);
