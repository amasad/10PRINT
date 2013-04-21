/* jshint asi:true, strict:false */
var GridSize = {width: 40, height: 25}
var CharSize = 8
var LinesToScroll = 2
var Delay = 10

var rand = function () {
  return Math.floor(Math.random() * 2) ? 'forward' : 'backward'
};

var looper = function (draw) {
  var canvas = draw.canvas;
  var context = canvas.getContext('2d')
  function loop (x, y) {
    draw(
      rand(), x, y
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

looper(
  createImageDataDraw(
    document.getElementById('canvas-image-data'), GridSize, CharSize
  )
)

looper(
  createLinesDraw(
    document.getElementById('canvas-lines'), GridSize, CharSize
  )
)

var draw = createImageDataDraw(
  document.getElementById('canvas-maze-walker'), GridSize, CharSize
)
for (var x = 0; x < GridSize.width; x++) {
  for (var y = 0; y < GridSize.height; y++) {
    draw(rand(), x, y);
  } 
}

var walk = createMazeWalker(
  draw.canvas, GridSize, CharSize
)

;(function loopWalker (x, y) {
  //if (!--fas) return;
  if (y === -1) {
    if (x < 39) {
      walk(x, y, loopWalker.bind(null, ++x, y));
    } else {
      walk(x, y, loopWalker.bind(null, -1, ++y));
    }
  } else {
    if (y < 39) {
      walk(x, y, loopWalker.bind(null, x, ++y));
    }
  }
})(0, -1);
  
