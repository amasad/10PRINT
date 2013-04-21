this.createMazeWalker = function (canvas, GridSize, CharSize) {
  var context = canvas.getContext('2d')
  var right = {right: null}
  var left = {left: null}
  var up = {up: null}
  var down = {down: null}

  function createWalker (done) {
    
    var resetWalker = function  () { /* noop */ }

    var putWalker = function (image, walkerPos) {
      var pixelite = new Pixelite(image).clone()
      pixelite.select(walkerPos).rgba(0, 128, 255, 255)
      return pixelite
    }

    function and (data1, data2) {

      var ret = context.createImageData(CharSize, CharSize)
      var arr1 = data1.data
      var arr2 = data2.data
      for (var i = 0; i < arr1.length; i++) {
        ret.data[i] = arr1[i] || arr2[i]
      }
      return ret
    }

    function getChar (x, y) {
      var imageData = context.getImageData(x * CharSize, y * CharSize, CharSize, CharSize)
      return imageData.data[0] === 0 ? 'forward' : 'backward'
    }

    function drawWalker (x, y, ch, dir) {
      var imageData;
      if (ch === 'forward') {
        if (dir === right || dir === down) {
          imageData = walkerSelectors.forwardUp
        } else {
          imageData = walkerSelectors.forwardDown
        }
      }
      if (ch === 'backward') {
        if (dir === down || dir === left) {
          imageData = walkerSelectors.backwardUp
        } else {
          imageData = walkerSelectors.backwardDown
        }
      }
      var currImage = context.getImageData(x * CharSize, y * CharSize, CharSize, CharSize)
      resetWalker = function () {
        context.putImageData(currImage, x * CharSize, y * CharSize)
      }
      // imageData = and(imageData, currImage)
      imageData = putWalker(currImage, imageData)
      //colorWalker(imageData)
      context.putImageData(imageData.imageData, x * CharSize, y * CharSize)
    }

    return function walk (x, y, dir) {
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

      if (!(x > -1 && x < GridSize.width && y > -1 && y < GridSize.height)) return done();
      var ch = getChar(x, y);

      resetWalker()
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
      setTimeout(walk.bind(null, x, y, dir), 100);
    }
  }

  return function (x, y, cb) {
    createWalker(cb)(x, y, x === -1 ? right : down)
  }

};
