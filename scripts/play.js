console.log('welcome to the soundsystem 🎧');
console.log('current limitations:\n- all notes are being played using the same instrument\n- no performance dynamics');


//-----------------------------
// play / stop procedures
//-----------------------------
var playState = false;

$("body").click(function() {
  if (playState === false) {
    play();
  } else {
    stop();
  }
});

function play(){
  playState = true;
  $("#click").html("i told you. it is now flickering really bad</br>click anywhere to stop");
  console.log('playing...');
  Tone.Transport.schedule(function(time){
  	noteArray[0].trigger(time);
  }, 0.1);
  Tone.Transport.schedule(function(time){
  	noteArray[1].trigger(time);
  }, 0.4);

  // Tone.Transport.loopEnd = '1m';
  // Tone.Transport.loop = true;

  Tone.Transport.start('+0.1');
  setTimeout(backColorSignal, 100);
}

function stop(){
  playState = false;
  $("#click").html("it is probably still flicker really bad, but it will stop eventually</br>click anywhere to keep it going");
  console.log('stopping...!');
  console.log(Tone.Transport.seconds);
  Tone.Transport.stop();
  Tone.Transport.cancel(0);
}

//-----------------------------
// creating an array of note objects (noteArray)
//-----------------------------

// array of manually added notes
var noteArray = [];

// note constructor
function noteObject(index, color, frequency, amplitude, duration, loops, connected_notes_arry) {
  this.index = index;
  this.color = color;
  this.frequency = frequency;
  this.amplitude = amplitude;
  this.duration = duration;
  this.loops = loops;
  this.connected_notes = connected_notes_arry;
  this.trigger = function(time, index=this.index, frequency=this.frequency, duration=this.duration, connected=this.connected_notes){
    // console.log('time: ' + time);
    // console.log('index: ' + index);
    console.log('');
    console.log('------------');
    console.log('it is ' + Tone.Transport.seconds);
    console.log('playing: ' + index);
    console.log('frequency: ' + frequency);
    console.log('duration: ' + duration);

  	synthArray[index].triggerAttackRelease(frequency, duration, time);

    if (connected !== null) {
      var nextIndex = connected[0];
      var nextTime = 0.01 + Tone.Transport.seconds + connected[1] + parseFloat((Math.random() * (connected[2] - connected[3]) + connected[3]).toFixed(4));
      console.log('generated: ' + nextIndex);
      console.log('at: ' + nextTime);
      Tone.Transport.schedule(function(time){
        noteArray[nextIndex].trigger(time);
      }, nextTime);
    }
  };
}

// starting notes
// noteArray.push(new noteObject(0, '7D82B8', 'c3', 1, 1.520, 0, ([2,1.520,20,20,0.9],[3,1.520,20,20,0.1]))); // real
noteArray.push(new noteObject(0, '7D82B8', 'c3', 1, 1.520*5, 0, [2,1.520*5,0.020*5,0.020*5,0.9])); // debug
noteArray.push(new noteObject(1, 'B7E3CC', 'e2', 1, 6.880*5, 0, null));

// the rest of the notes
noteArray.push(new noteObject(2, 'C4FFB2', 'b2', 1, 1.680*5, 0, [3,1.520*5,0.40,0.80,1])); // real
// noteArray.push(new noteObject(2, 'C4FFB2', 'b2', 1, 1.680, 0, null)); // debug
noteArray.push(new noteObject(3, 'D6F7A3', 'c#2', 1, 3.640*5, 0, [4,0,0.8,1,1])); // real
// noteArray.push(new noteObject(3, 'D6F7A3', 'c#2', 1, 3.640, 0, null)); // debug
noteArray.push(new noteObject(4, 'ADD66D', 'b2', 1, 0.650*10, 0, [5,0.650*10,0.2,0.2,1])); // real
noteArray.push(new noteObject(5, 'A4FF7B', 'a2', 1, 1.800*5, 0, [6,0,0,0,1])); // real
// noteArray.push(new noteObject(5, 'A4FF7B', 'a3', 1, 1.800, 0, null));
noteArray.push(new noteObject(6, '7BFFD2', 'f#2', 0.2, 1.800*5, 0, [0, 1.800*5, 1, 2, 1]));
// noteArray.push(new noteObject(6, '7BFFD2', 'f#2', 0.2, 1.800*5, 0, null));


//-----------------------------
// creating an array of synth objects (synthArray), based on note objects (noteArray)
//-----------------------------

var synthArray = [];

for (var i=0;i<noteArray.length;i++){
  options = {
    vibratoAmount:1,
    vibratoRate:5,
    harmonicity:2,
    voice0:{
      volume:-10,
      portamento:20,
      oscillator:{
        type:"triangle"
      },
      filterEnvelope:{
        attack:0.01,
        decay:0,
        sustain:0.5,
        release:1,
      },
      envelope:{
        attack:0.1,
        decay:0,
        sustain:0.5,
        release:1,
      },
    },
  voice1:{
    volume:-10,
    portamento:0,
    oscillator:{
      type:"sawtooth"
    },
    filterEnvelope:{
      attack:0.01,
      decay:0,
      sustain:1,
      release:0.5,
    },
    envelope:{
      attack:0.01,
      decay:0,
      sustain:0.5,
      release:1,
    }
  }
  };
  synthArray.push(new Tone.DuoSynth(options).toMaster());
}

//-----------------------------
// low-tech visualization
//-----------------------------
b = new Tone.Meter ("signal");
synthArray[1].connect(b);
// synthArray[2].connect(b);

function backColorSignal(){
  if (b.value === 0){
    setTimeout(backColorBlue, 100);
  } else {
    var color = "rgba(0, 0, 255," + b.value + ")";
    $("html").css("background-color", color);
    setTimeout(backColorSignal, 100);
    // console.log('b.value: ' + b.value + " " + color);
  }
}

function backColorBlue(){
  var color = "rgba(0, 0, 255,1)";
  $("html").css("background-color", color);
  setTimeout(backColorSignal, 100);
}
