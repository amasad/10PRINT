/* jshint asi:true, strict:false */

var GridSize = {x: 40, y: 25}
var BoxSize = {x: 8, y: 8}

var canvas = document.getElementById("canvas")
canvas.width = 320
canvas.height = 200
var context = canvas.getContext('2d')

var i = 0;
function drawBox (opts) {
  var x = opts.back ? opts.atX : opts.atX + BoxSize.x
  var y = opts.atY

  context.moveTo(x, y)
  context.lineTo(
    opts.back ? x + BoxSize.x : x - BoxSize.x
  , y + BoxSize.y
  )
  context.shadowColor="black";
  context.lineWidth = 2;
  context.strokeStyle = "#786CDA"
  context.stroke()
}


(function draw () {
  canvas.width = canvas.width
  for (var y = 0; y < GridSize.y; y++) {
    for (var x = 0; x < GridSize.x; x++) {
      drawBox({
        atX: (x * BoxSize.x)
      , atY: (y * BoxSize.y)
      , back: Math.floor(Math.random() * 2) ? false : true 
      })
    }
  }
  //setTimeout(draw, 500)
})()
