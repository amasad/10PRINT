(function () {
  /* jshint asi:true, strict:false */
  var GridSize = {width: 40, height: 25}
  var CharSize = 8

  var canvas = document.getElementById("canvas-image-data")
  canvas.width = 320
  canvas.height = 200
  var context = canvas.getContext('2d')

  var forward  = [ [0, 0, 0, 0, 0, 0, 1, 1]
               , [0, 0, 0, 0, 0, 1, 1, 1]
               , [0, 0, 0, 0, 1, 1, 1, 0]
               , [0, 0, 0, 1, 1, 1, 0, 0]
               , [0, 0, 1, 1, 1, 0, 0, 0]
               , [0, 1, 1, 1, 0, 0, 0, 0]
               , [1, 1, 1, 0, 0, 0, 0, 0]
               , [1, 1, 0, 0, 0, 0, 0, 0] ]

  var backward = [ [1, 1, 0, 0, 0, 0, 0, 0]
               , [1, 1, 1, 0, 0, 0, 0, 0]
               , [0, 1, 1, 1, 0, 0, 0, 0]
               , [0, 0, 1, 1, 1, 0, 0, 0]
               , [0, 0, 0, 1, 1, 1, 0, 0]
               , [0, 0, 0, 0, 1, 1, 1, 0]
               , [0, 0, 0, 0, 0, 1, 1, 1]
               , [0, 0, 0, 0, 0, 0, 1, 1] ]

  function generateImageData (opts) {
    var matrix = opts.backslash ? backward : forward
    var imageData = context.createImageData(CharSize, CharSize)
    var dptr = 0
    for (var y = 0; y < matrix.length; y++) {
      var arr = matrix[y]
      for (var x = 0; x < arr.length; x++) {
        if (arr[x]) {
          imageData.data[dptr + 0] = 124 // r
          imageData.data[dptr + 1] = 112 // g
          imageData.data[dptr + 2] = 218 // b
          imageData.data[dptr + 3] = 255 // a
        }
        dptr += 4;
      }
    }
    return imageData
  }

  var backslash = generateImageData({backslash: true})
  var forwslash = generateImageData({backslash: false})

  function draw (data, x, y) {
    context.putImageData(data, x * CharSize, y * CharSize)
  }

  function loop (x, y) {
    draw(
      Math.floor(Math.random() * 2) ? backslash : forwslash, x, y
    );
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
    setTimeout(loop.bind(null, x, y), 10)
  }

  loop(0, 0)

})()