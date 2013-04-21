this.createMazeWalker = function (canvas, GridSize, CharSize) {
  var context = canvas.getContext('2d')
  var right = {right: null}
  var left = {left: null}
  var up = {up: null}
  var down = {down: null}

  function createWalker (cb, startX, startY) {
    var winningTrail = function () { /* noop */ }
    var done = function (won) { 
      if (won) winningTrail()
      cb() 
    }
    var resetWalker = function () { /* noop */ }

    function putWalker (image, walkerPos) {
      var pixelite = new Pixelite(image).clone()
      pixelite.select(walkerPos).rgba(0, 128, 255, 255)
      return pixelite
    }

    function getChar (x, y) {
      var imageData = context.getImageData(x * CharSize, y * CharSize, CharSize, CharSize)
      return imageData.data[0] === 0 ? 'forward' : 'backward'
    }

    function drawWalker (x, y, ch, dir) {
      var selector;
      if (ch === 'forward') {
        if (dir === right || dir === down) {
          selector = walkerSelectors.forwardUp
        } else {
          selector = walkerSelectors.forwardDown
        }
      } else if (ch === 'backward') {
        if (dir === down || dir === left) {
          selector = walkerSelectors.backwardUp
        } else {
          selector = walkerSelectors.backwardDown
        }
      }
      var currImage = context.getImageData(x * CharSize, y * CharSize, CharSize, CharSize)
      resetWalker = function () {
        context.putImageData(currImage, x * CharSize, y * CharSize)
      }
      var pixelite = putWalker(currImage, selector)
      done = function (won) {
        pixelite.select(selector).rgba(255, 0, 0, 255)
        context.putImageData(pixelite.imageData, x * CharSize, y * CharSize)
        if (won) winningTrail()
        cb()
      }
      winningTrail = (function () {
        var _fn = winningTrail
        return function () {
          pixelite.select(selector).rgba(0, 255, 0, 255)
          context.putImageData(pixelite.imageData, x * CharSize, y * CharSize)
          _fn()
        }
      })()
      context.putImageData(pixelite.imageData, x * CharSize, y * CharSize)
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

      if (!(x > -1 && x < GridSize.width && y > -1 && y < GridSize.height)) {
        return done(
          startX === -1 && x >= GridSize.width || startY === -1 && y >= GridSize.height
        )
      }
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
      setTimeout(walk.bind(null, x, y, dir), 0);
    }
  }

  return function (x, y, cb) {
    createWalker(cb, x, y)(x, y, x === -1 ? right : down)
  }

};
