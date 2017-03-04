console.log('this is the place with the sounds 🎧');
var synthOne = new Tone.Synth({
	oscillator : {
  	type : "fmsine", //sine, pwm, fmsine, triangle, sawtooth, square<numbers>, square5, triangle3, sine4, sine2, sawtooth14, fatsquare3, fatsawtooth (which has different properties to it), custom!
    modulationType: "sawtooth",
    harmonicity: 2.8,
    modulationIndex: 10,
  },
	envelope : {
  	attack : 1,
    decay : 2,
    sustain : 0.1,
    release : 4
  }
}).toMaster();


var synthTwo = new Tone.MonoSynth({
  detune : 10,
	oscillator : {
  	type : "triangle3",
  },
  filter : {
  	Q:6,
    type:"lowpass",
    rolloff:-24,
  },
	envelope : {
  	attack : 1,
    decay : 2,
    sustain : 0.1,
    release : 4
  },
  filterEnvelope:{
    attack:0.06,
    decay:0.2,
    sustain:0.5,
    release:2,
    baseFrequency:200,
    octaves:7,
    exponent:2,
},
}).toMaster();

// The type of the filter. Types: "lowpass", "highpass", "bandpass", "lowshelf", "highshelf", "notch", "allpass", or "peaking".

var synthThree = new Tone.MonoSynth({
  detune : 10,
	oscillator : {
  	type : "fatsquare3",
  },
  filter : {
    type:"peaking",
  },
	envelope : {
  	attack : 1,
    decay : 2,
    sustain : 0.1,
    release : 4
  },
  filterEnvelope:{
    attack:0.06,
    decay:0.2,
    sustain:0.5,
    release:2,
    baseFrequency:200,
    octaves:7,
    exponent:2,
},
}).toMaster();

// check out Tone.MonoSynth. it has a filter :)

/************
Key legend
Q == 81
W == 87
E == 69
http://help.adobe.com/en_US/AS2LCR/Flash_10.0/help.html?content=00000520.html
************/


$(document).keydown(function(keyPressed) {
  var key = keyPressed.keyCode;

  switch (key) {
    // q
    case 81:
      console.log(key);
      synthOne.triggerAttackRelease('C4', 3);
      break;

    // w
    case 87:
      console.log(key);
      synthTwo.triggerAttackRelease('C4', 3);
      break;

    // e
    case 69:
      console.log(key);
      synthThree.triggerAttackRelease('A2', 3);
      break;
  }
});

var colors = ['#FAF2A1', '#759AAB', '#453F78', '#3F2E56', '#401F3E', '#95AFBA', '#E2F89C', '#A63A50', '#2CEAA3'];
$(".key").each(function(){
  $(this).css('background-color', colors[Math.floor(Math.random()*10)]);
});
