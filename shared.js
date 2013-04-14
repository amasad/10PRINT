/* jshint asi:true, strict:false */
var GridSize = {width: 40, height: 25}
var CharSize = 8
var looper = function (canvas, draw) {
  var context = canvas.getContext('2d')
  function loop (x, y) {
    draw(
      Math.floor(Math.random() * 2) ? 'forward' : 'backward', x, y
    )
    x++
    if (x > 39) {
      x = 0
      y++
    }
    if (y > 24) {
      var data = context.getImageData(0, 16, 320, 23 * 8)
      canvas.width = canvas.width
      context.putImageData(data, 0, 0)
      y = 23
    }
    setTimeout(loop.bind(null, x, y), 3)
  }
  loop(0, 0)
}
