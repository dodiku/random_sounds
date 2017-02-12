console.log('hi');

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
  $("#click").html("click anywhere to stop");
  console.log('playing...');
}

function stop(){
  playState = false;
  $("#click").html("click anywhere to play");
  console.log('stopped!');
}
