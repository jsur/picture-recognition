var canvas = document.querySelector('#canvas');
var ctx = canvas.getContext('2d');
canvas.width = window.screen.width;
canvas.height = window.screen.height * 0.7;
ctx.lineWidth = 5;

var isDrawing = false;
var lastX = 0;
var lastY = 0;
var direction = true;

var trace = [];
var tracePairX = [];
var tracePairY = [];
var timestamp = [];

function draw(e) {

  if (!isDrawing) return;
  ctx.strokeStyle="#000000";

  tracePairX.push(e.clientX);
  tracePairY.push(e.clientY);
  timestamp.push(e.timeStamp);

  ctx.beginPath();
  //start from
  ctx.moveTo(lastX, lastY);
  //go to
  ctx.lineTo(e.offsetX, e.offsetY); //offsets come from the mouse event object
  ctx.stroke();
  lastX = e.offsetX;
  lastY = e.offsetY;
}

canvas.addEventListener('mousedown', function(e) {
  isDrawing = true;
  lastX = e.offsetX;
  lastY = e.offsetY;
});


canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', function() {
  isDrawing = false;

  var tracePairXY = [];

  tracePairXY.push(tracePairX);
  tracePairXY.push(tracePairY);
  tracePairXY.push(timestamp);
  trace.push(tracePairXY);
  postDrawing();

  //clear arrays after each mouseup
  tracePairX = [];
  tracePairY = [];
  timestamp = [];
  tracePairXY = [];

});
canvas.addEventListener('mouseout', function() { isDrawing = false; });

var cleanButton = document.querySelector('.clear');
cleanButton.addEventListener('click', clearCanvas);


function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  trace = [];
}
