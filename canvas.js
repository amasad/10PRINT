/* jshint asi:true, strict:false */

var GridSize = {x: 25, y: 12}
var BoxSize = {x: 10, y: 10}

var canvas = document.getElementById("canvas")
canvas.style.backgroundColor = 'black'
canvas.width = 100
canvas.height = 100
var context = canvas.getContext('2d')

function drawBox (opts) {
  var x = opts.back ? opts.atX : opts.atX + BoxSize.x
  , y = opts.atY
  context.moveTo(x, y)
  context.lineTo(
    opts.back ? x + BoxSize.x : x - BoxSize.x
  , y + BoxSize.y
  )
  
  context.strokeStyle = "blue"
  context.stroke()
}


(function draw () {
  canvas.width = canvas.width
  for (var x = 0; x < GridSize.x; x++) {
    for (var y = 0; y < GridSize.y; y++) {
      drawBox({
        atX: (x * BoxSize.x)
      , atY: (y * BoxSize.y)
      , back: Math.floor(Math.random() * 2) ? false : true 
      })
    }
  }
  setTimeout(draw, 500)
})()
