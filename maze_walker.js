this.createMazeWalker = function (canvas, GridSize, CharSize) {
  var context = canvas.getContext('2d')
  var xEntries = GridSize.width
  var yEntries = GridSize.height
  var right = {right: null}
  var left = {left: null}
  var up = {up: null}
  var down = {down: null}
  //var image = context.getImageData(0, 0, GridSize.width * CharSize, GridSize.height * CharSize)

  function getChar (x, y) {
    var imageData = context.getImageData(x * CharSize, y * CharSize, CharSize, CharSize)
    return imageData.data[0] === 0 ? 'forward' : 'backward'
  }

  function drawWalker (x, y, ch, dir) {
    var imageData;
    if (ch === 'forward') {
      if (dir === right || dir === down) {
        imageData = mazeImages.walker.forwardUp
      } else {
        imageData = mazeImages.walker.forwardDown
      }
    }
    if (ch === 'backward') {
      if (dir === down || dir === left) {
        imageData = mazeImages.walker.backwardUp
      } else {
        imageData = mazeImages.walker.backwardDown
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
