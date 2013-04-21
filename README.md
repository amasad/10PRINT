Porting 10 PRINT to JavaScript
------------------------------

## Intro and book

I've recently read a great book about a one-line Commodore 64 Basic program.

    10 PRINT CHR$(205.5 + RND(1)); : GOTO 10

This one liner, which is also the book's title, generates an interesting mazelike output that I have managed to recreate in JavaScript.

  [Screen shot]


The book isn't like any other techinical book I've read. In that it traces back the cultural,
social, economical, technical, and historical influences amongst other things that brought this line of code into existence. And what has made it so interesting and fascinating for many.

> Critical Code Studies (CCS) is the application of critical theory and hermeneutics to the
> interpretation of computer source code, as defined by one of this book’s authors.

__10 PRINT__ was written by 10 authors and came about when one of the authors challanged the Critical
Code Studies working group to apply their methodoligies to the BASIC one-liner. You can buy it on [amazon](http://www.amazon.com/10-PRINT-CHR-205-5-RND/dp/0262018462) or download it from the [site](http://10print.org/).

## Porting to JavaScript

__10 PRINT__ dedicates a full chapter for porting and it includes many ports of the program to other languages.

Amongst the ports discussed was a JavaScript attempt at one. Unfortunatley it was shoehorend in a
section with a Perl port.
  
    while (print int(rand(2)) ? "/" : "\\") {}

The authors state that the problem with the JavaScript port would be a typographical one because of the propotional letterforms in Web fonts, however; this would be a secondary problem because an
an unbound loop on a Webpage would simply crash the browser.

> A port is borne from one platform to another, and the bearer is the programmer, who must gather up the details of the original and find places for them amid the particulars of the destination, attempting to identify and preserve the program’s essential properties.

The one-line property of 10 print isn't essential in JavaScript because all programs can be represented as a one line. What I think is most important to recreate the output.

# Techinical spec

The Commodore 64 video chip is made up of 320 x 200 pixels that are logically formed into a 40 x 25 
controllable [xxx]. Each [xxx] is made up of 8x8 pixels.

# First try

The first thing I thought about was obvoisly the Canvas API. I've never used it before, but it was farily straightforward to come up with something.

```javascript
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
```

This was the main draw function that I wrote. The x or y corresponds to the position in the logical commodore 64 grid. And here is the output:


    [canvas]

It's close to the original, but not quite there. The foreground seems to be a lot wider than the original and this is because of two problems in the way the Canvas API does things:

1- No way to turn off anti-aliasing.
2- The line extends beyond the original commodore 64 8x8 character box.

Here is a comparison of a single forward slash between the commodore 64 pixels and this program's output.

# Next try

I needed to a lower level access to the canvas to be able to confine the lines I'm drawing to 8x8
cells and not have the browser automatically add anti-aliasing. Luckily the Canvas element provides a
pixel manipulation API. To start you have to create an `ImageData` object that you can then manipulate
 as a flat contingues array of pixel descriptors. Each pixel is made up of 4 values:
http://beej.us/blog/data/html5s-canvas-2-pixel/

 1. Red
 2. Green
 3. Blue
 4. Alpha


```javascript
  var imageData = context.createImageData(CharSize, CharSize)
  imageData.width === CharSize
  imageData.height === CharSize
  imageData.data // The pixel array.
```

Because the array is flat and contingues I needed a better way of logically describing my two 
PETSCII characters. So I created a matrix representation for each of the charachters.

```javascript
  // The forward slash. "/".
  var forward  = [ [0, 0, 0, 0, 0, 0, 1, 1]
                 , [0, 0, 0, 0, 0, 1, 1, 1]
                 , [0, 0, 0, 0, 1, 1, 1, 0]
                 , [0, 0, 0, 1, 1, 1, 0, 0]
                 , [0, 0, 1, 1, 1, 0, 0, 0]
                 , [0, 1, 1, 1, 0, 0, 0, 0]
                 , [1, 1, 1, 0, 0, 0, 0, 0]
                 , [1, 1, 0, 0, 0, 0, 0, 0] ]

  // The backward slash. "\".
  var backward = [ [1, 1, 0, 0, 0, 0, 0, 0]
                 , [1, 1, 1, 0, 0, 0, 0, 0]
                 , [0, 1, 1, 1, 0, 0, 0, 0]
                 , [0, 0, 1, 1, 1, 0, 0, 0]
                 , [0, 0, 0, 1, 1, 1, 0, 0]
                 , [0, 0, 0, 0, 1, 1, 1, 0]
                 , [0, 0, 0, 0, 0, 1, 1, 1]
                 , [0, 0, 0, 0, 0, 0, 1, 1] ]
```

# Successful try

# Maze walker

