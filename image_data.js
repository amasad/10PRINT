this.createImageDataDraw = function (canvas, GridSize, CharSize) {
  canvas.width = GridSize.width * CharSize
  canvas.height = GridSize.height * CharSize
  var context = canvas.getContext('2d')

  function draw (slash, x, y) {
    context.putImageData(
      slash === 'forward' ? mazeImages.forward : mazeImages.backward
    , x * CharSize, y * CharSize
    )
  }

  draw.canvas = canvas
  return draw
}
