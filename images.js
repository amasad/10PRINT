(function () {

  var canvas = document.createElement('canvas')
  var context = canvas.getContext('2d')

  function generate (matrix) {
    var imageData = context.createImageData(8, 8)
    var dptr = 0
    for (var y = 0; y < matrix.length; y++) {
      var arr = matrix[y]
      for (var x = 0; x < arr.length; x++) {
        if (arr[x] === 1) {
          imageData.data[dptr + 0] = 124 // r
          imageData.data[dptr + 1] = 112 // g
          imageData.data[dptr + 2] = 218 // b
          imageData.data[dptr + 3] = 255 // a
        } else if (arr[x] === 2) {
          imageData.data[dptr + 0] = 0   // r
          imageData.data[dptr + 1] = 128 // g
          imageData.data[dptr + 2] = 255 // b
          imageData.data[dptr + 3] = 255 // a
        }
        dptr += 4
      }
    }
    return imageData
  }

  this.mazeImages = {
    forward:        generate([ [0, 0, 0, 0, 0, 0, 1, 1]
                             , [0, 0, 0, 0, 0, 1, 1, 1]
                             , [0, 0, 0, 0, 1, 1, 1, 0]
                             , [0, 0, 0, 1, 1, 1, 0, 0]
                             , [0, 0, 1, 1, 1, 0, 0, 0]
                             , [0, 1, 1, 1, 0, 0, 0, 0]
                             , [1, 1, 1, 0, 0, 0, 0, 0]
                             , [1, 1, 0, 0, 0, 0, 0, 0] ])
 
  , backward:       generate([ [1, 1, 0, 0, 0, 0, 0, 0]
                             , [1, 1, 1, 0, 0, 0, 0, 0]
                             , [0, 1, 1, 1, 0, 0, 0, 0]
                             , [0, 0, 1, 1, 1, 0, 0, 0]
                             , [0, 0, 0, 1, 1, 1, 0, 0]
                             , [0, 0, 0, 0, 1, 1, 1, 0]
                             , [0, 0, 0, 0, 0, 1, 1, 1]
                             , [0, 0, 0, 0, 0, 0, 1, 1] ])
  , walker: {
      forwardUp:    generate([ [0, 0, 2, 0, 0, 0, 1, 1]
                             , [0, 2, 2, 2, 0, 1, 1, 1]
                             , [0, 0, 2, 0, 1, 1, 1, 0]
                             , [0, 0, 0, 1, 1, 1, 0, 0]
                             , [0, 0, 1, 1, 1, 0, 0, 0]
                             , [0, 1, 1, 1, 0, 0, 0, 0]
                             , [1, 1, 1, 0, 0, 0, 0, 0]
                             , [1, 1, 0, 0, 0, 0, 0, 0] ])

    , forwardDown:  generate([ [0, 0, 0, 0, 0, 0, 1, 1]
                             , [0, 0, 0, 0, 0, 1, 1, 1]
                             , [0, 0, 0, 0, 1, 1, 1, 0]
                             , [0, 0, 0, 1, 1, 1, 0, 0]
                             , [0, 0, 1, 1, 1, 0, 2, 0]
                             , [0, 1, 1, 1, 0, 2, 2, 2]
                             , [1, 1, 1, 0, 0, 0, 2, 0]
                             , [1, 1, 0, 0, 0, 0, 0, 0] ])

    , backwardUp:   generate([ [1, 1, 0, 0, 0, 2, 0, 0]
                             , [1, 1, 1, 0, 2, 2, 2, 0]
                             , [0, 1, 1, 1, 0, 2, 0, 0]
                             , [0, 0, 1, 1, 1, 0, 0, 0]
                             , [0, 0, 0, 1, 1, 1, 0, 0]
                             , [0, 0, 0, 0, 1, 1, 1, 0]
                             , [0, 0, 0, 0, 0, 1, 1, 1]
                             , [0, 0, 0, 0, 0, 0, 1, 1] ])

    , backwardDown: generate([ [1, 1, 0, 0, 0, 0, 0, 0]
                             , [1, 1, 1, 0, 0, 0, 0, 0]
                             , [0, 1, 1, 1, 0, 0, 0, 0]
                             , [0, 0, 1, 1, 1, 0, 0, 0]
                             , [0, 2, 0, 1, 1, 1, 0, 0]
                             , [2, 2, 2, 0, 1, 1, 1, 0]
                             , [0, 2, 0, 0, 0, 1, 1, 1]
                             , [0, 0, 0, 0, 0, 0, 1, 1] ])
    }
  }

}).call(this);