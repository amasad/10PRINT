/* jshint asi:true, strict:false */
/* global looper:false */
(function () {
  var GridSize = {x: 40, y: 25}
  var BoxSize = {x: 8, y: 8}

  var canvas = document.getElementById('canvas-lines')
  canvas.width = 320
  canvas.height = 200
  var context = canvas.getContext('2d')

  function draw (slash, x, y) {
    x *= BoxSize.x
    y *= BoxSize.y
    x = (slash === 'forward' ? x + BoxSize.x : x) 
    context.moveTo(x, y)
    context.lineTo(
      slash === 'forward' ? x - BoxSize.x : x + BoxSize.x 
    , y + BoxSize.y
    )
    context.lineWidth = 2
    context.strokeStyle = '#786CDA'
    context.stroke()
  }

  looper(canvas, draw)

})()