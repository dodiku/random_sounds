var Tone = require("tone");
//create a synth and connect it to the master output (your speakers)
var synth = new Tone.Synth().toMaster();

//play a middle 'C' for the duration of an 8th note
synth.triggerAttackRelease("C4", "8n");

// SYNTH


// NOTES DICTIONARY
function noteObject() {
  this.color = '7D82B8';
  this.frequency = 'c3';
  this.amplitude = 1;
  this.duration = 1520;
  this.loops = 0;
  this.connected_notes = [['7D82B8', this.duration,20,20,0.9],['7D82B8', this.duration,20,20,0.9]];
}
