/* jshint asi:true, strict:false */
var GridSize = {width: 40, height: 25}
var CharSize = 8
var LinesToScroll = 2
var Delay = 10
var looper = function (canvas, draw) {
  var context = canvas.getContext('2d')
  function loop (x, y) {
    draw(
      Math.floor(Math.random() * 2) ? 'forward' : 'backward', x, y
    )
    x++
    if (x > GridSize.width - 1) {
      x = 0
      y++
    }
    if (y > GridSize.height - 1) {
      var data = context.getImageData(
        0
      , CharSize * LinesToScroll
      , GridSize.width * CharSize
      , (GridSize.height - LinesToScroll) * CharSize
      )
      canvas.width = canvas.width
      context.putImageData(data, 0, 0)
      y = GridSize.height - LinesToScroll
    }
    setTimeout(loop.bind(null, x, y), Delay)
  }
  loop(0, 0)
}
