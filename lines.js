this.createLinesDraw = function (canvas, GridSize, CharSize) {
  canvas.width = GridSize.width * CharSize
  canvas.height = GridSize.height * CharSize
  var context = canvas.getContext('2d')

  function draw (slash, x, y) {
    x *= CharSize
    y *= CharSize
    x = (slash === 'forward' ? x + CharSize : x) 
    context.moveTo(x, y)
    context.lineTo(
      slash === 'forward' ? x - CharSize : x + CharSize
    , y + CharSize
    )
    context.lineWidth = 2
    context.strokeStyle = '#786CDA'
    context.stroke()
  }

  draw.canvas = canvas
  return draw
}
