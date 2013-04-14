/* jshint asi:true, strict:false */
/* global looper:false, CharSize:true, GridSize:true */
(function () {

  var canvas = document.getElementById('canvas-image-data')
  canvas.width = GridSize.width * CharSize
  canvas.height = GridSize.height * CharSize
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

  function generateImageData (backslash) {
    var matrix = backslash ? backward : forward
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

  var backslash = generateImageData(true)
  var forwslash = generateImageData(false)

  function draw (data, x, y) {
    context.putImageData(data, x * CharSize, y * CharSize)
  }

  looper(canvas, function (slash, x, y) {
    draw(
      slash === 'forward' ? forwslash : backslash, x, y
    )
  });

})()