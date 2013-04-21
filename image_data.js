this.createImageDataDraw = function (canvas, GridSize, CharSize) {
  canvas.width = GridSize.width * CharSize
  canvas.height = GridSize.height * CharSize
  var context = canvas.getContext('2d')

  var backslash = mazeImages.backward
  var forwslash = mazeImages.forward

  function draw (slash, x, y) {
    context.putImageData(
      slash === 'forward' ? forwslash : backslash
    , x * CharSize, y * CharSize
    )
  }

  draw.canvas = canvas
  return draw
}
