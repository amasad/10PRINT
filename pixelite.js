function Pixel (i, x, y, parent) {
  this.i = i
  this.x = x
  this.y = y
  this.parent = parent
}

['r', 'g', 'b', 'a'].forEach(function (attribute) {
  Pixel.prototype[attribute] = function (v, i) {
    var data = this.parent.imageData.data
    if (v == null) return data[this.i + i]
    data[this.i + i] = v
    return this
  }
})

Pixel.prototype.rgba = function (r, g, b, a) {
  var data = this.parent.imageData.data
  var i = this.i
  if (r == null) {
    return {
      r: data[i + 0]
    , g: data[i + 1]
    , b: data[i + 2]
    , a: data[i + 3]
    }
  }
  data[i + 0] = r
  data[i + 1] = g
  data[i + 2] = b
  data[i + 3] = a
  return this
}

var context = document.createElement('canvas').getContext('2d')
function Pixelite (width, height) {
  if (width && typeof width === 'object') {
    this.imageData = width
  } else {
    this.imageData = context.createImageData(width, height)
  }
}

Pixelite.isinstace = function (pixelite) {
  return pixelite instanceof pixelite;
}

Pixelite.prototype.at = function (x, y) {
  var i = (x * 4) + (y * this.imageData.width * 4)
  return new Pixel(
    i
  , x
  , y
  , this
  )
}

Pixelite.prototype.clone = function () {
  var ret = context.createImageData(this.imageData.width, this.imageData.height)
  var data = this.imageData.data
  for (var i = 0; i < data.length; i++) ret.data[i] = data[i]
  return new Pixelite(ret)
}

function PixeliteCollection (parent, pixels) {
  this.parent = parent
  this.pixels = pixels || []
}

PixeliteCollection.prototype.push = function () {
  return this.pixels.push.apply(this.pixels, arguments)
}

PixeliteCollection.prototype.pop = function () {
  return this.pixels.pop.apply(this.pixels, arguments)
}

PixeliteCollection.prototype.rgba = function () {
  for (var i = 0, pixel; pixel = this.pixels[i]; i++) {
    pixel.rgba.apply(pixel, arguments)
  }
  return this
}

PixeliteCollection.prototype.end = function () {
  return this.parent;
}

Pixelite.prototype.select = function (matrix) {
  var ret = new PixeliteCollection(this)
  for (var y = 0, arr; arr = matrix[y]; y++) {
    for (var x = 0, l = arr.length; x < l; x++) {
      if (arr[x]) ret.push(this.at(x, y))
    }
  }
  return ret
}
