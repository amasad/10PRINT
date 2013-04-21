this.createMazeWalker = function (canvas, GridSize, CharSize) {
  var context = canvas.getContext('2d')
  var xEntries = GridSize.width
  var yEntries = GridSize.height
  var right = {right: null}
  var left = {left: null}
  var up = {up: null}
  var down = {down: null}
  var image = context.getImageData(0, 0, GridSize.width * CharSize, GridSize.height * CharSize)

  function generateImageData (matrix) {
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
        dptr += 4
      }
    }
    return imageData
  }

  var forwardUp = generateImageData([ [0, 0, 1, 0, 0, 0, 1, 1]
                                    , [0, 1, 1, 1, 0, 1, 1, 1]
                                    , [0, 0, 1, 0, 1, 1, 1, 0]
                                    , [0, 0, 0, 1, 1, 1, 0, 0]
                                    , [0, 0, 1, 1, 1, 0, 0, 0]
                                    , [0, 1, 1, 1, 0, 0, 0, 0]
                                    , [1, 1, 1, 0, 0, 0, 0, 0]
                                    , [1, 1, 0, 0, 0, 0, 0, 0] ])

  var forwardDown = generateImageData([ [0, 0, 0, 0, 0, 0, 1, 1]
                                      , [0, 0, 0, 0, 0, 1, 1, 1]
                                      , [0, 0, 0, 0, 1, 1, 1, 0]
                                      , [0, 0, 0, 1, 1, 1, 0, 0]
                                      , [0, 0, 1, 1, 1, 0, 1, 0]
                                      , [0, 1, 1, 1, 0, 1, 1, 1]
                                      , [1, 1, 1, 0, 0, 0, 1, 0]
                                      , [1, 1, 0, 0, 0, 0, 0, 0] ])

  var backwardUp = generateImageData([ [1, 1, 0, 0, 0, 1, 0, 0]
                                     , [1, 1, 1, 0, 1, 1, 1, 0]
                                     , [0, 1, 1, 1, 0, 1, 0, 0]
                                     , [0, 0, 1, 1, 1, 0, 0, 0]
                                     , [0, 0, 0, 1, 1, 1, 0, 0]
                                     , [0, 0, 0, 0, 1, 1, 1, 0]
                                     , [0, 0, 0, 0, 0, 1, 1, 1]
                                     , [0, 0, 0, 0, 0, 0, 1, 1] ])

  var backwardDown = generateImageData([ [1, 1, 0, 0, 0, 0, 0, 0]
                                       , [1, 1, 1, 0, 0, 0, 0, 0]
                                       , [0, 1, 1, 1, 0, 0, 0, 0]
                                       , [0, 0, 1, 1, 1, 0, 0, 0]
                                       , [0, 1, 0, 1, 1, 1, 0, 0]
                                       , [1, 1, 1, 0, 1, 1, 1, 0]
                                       , [0, 1, 0, 0, 0, 1, 1, 1]
                                       , [0, 0, 0, 0, 0, 0, 1, 1] ])

  function getChar (x, y) {
    var imageData = context.getImageData(x * CharSize, y * CharSize, CharSize, CharSize)
    return imageData.data[0] === 0 ? 'forward' : 'backward'
  }

  function drawWalker (x, y, ch, dir) {
    var imageData;
    if (ch === 'forward') {
      if (dir === right || dir === down) {
        imageData = forwardUp
      } else {
        imageData = forwardDown
      }
    }
    if (ch === 'backward') {
      if (dir === down || dir === left) {
        imageData = backwardUp
      } else {
        imageData = backwardDown
      }
    }
    //canvas.width = canvas.width
    context.putImageData(imageData, x * CharSize, y * CharSize)
  }

  function walk (x, y, dir) {
    switch (dir) {
      case right:
        x++
        break
      case left:
        x--
        break
      case up:
        y--
        break
      case down:
        y++
        break
      default:
        throw new Error('invalid dir')
    }

    if (!(x > -1 && x < GridSize.width && y > -1 && y < GridSize.height)) return;
    var ch = getChar(x, y);

    drawWalker(x, y, ch, dir)
    if (ch === 'forward') {
      switch (dir) {
        case right:
          dir = up
          break
        case down:
          dir = left
          break
        case up:
          dir = right
          break
        case left:
          dir = down
          break
        default:
          throw new Error('invalid prev dir')
      }
    } else if (ch === 'backward') {
      switch (dir) {
        case right:
          dir = down
          break
        case down:
          dir = right
          break
        case up:
          dir = left
          break
        case left:
          dir = up
          break
        default:
          throw new Error('invalid prev dir')
      }
    }
    setTimeout(walk.bind(null, x, y, dir), 500);
  }

  return function () {
    if (xEntries) {
      walk(--xEntries, -1, down);
    } else {
      walk(-1, --yEntries, right);
    }
  }
};
