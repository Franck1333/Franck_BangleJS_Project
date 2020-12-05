/*
____                    _        _
|  _ \                  | |      (_)
| |_) | __ _ _ __   __ _| | ___   _ ___
|  _ < / _` | '_ \ / _` | |/ _ \ | / __|
| |_) | (_| | | | | (_| | |  __/_| \__ \
|____/ \__,_|_| |_|\__, |_|\___(_) |___/
                   __/ |       _/ |
                  |___/       |__/

Hello! This is the Bangle.js emulator. It's a special
version of espruino.com/ide that runs a version of
the Espruino JavaScript interpreter in your browser.

Want a real Bangle.js? Check out https://shop.espruino.com/banglejs

Want to try some applications? Head to https://banglejs.com/apps/
and click on any applications that have the emulator icon next to them.

For information on getting started, check out:

* https://www.espruino.com/Bangle.js#-a-name-lcd-a-lcd-screen
* https://banglejs.com/reference

To run the app below, just click the upload button to the left
of this editor window!
*/

// Draw a rotating cube wireframe...
// X and Y rotation
var rx = 0, ry = 0;

// draw a cube
function draw() {
  var rcx=Math.cos(rx),
      rsx=Math.sin(rx),
      rcy=Math.cos(ry),
      rsy=Math.sin(ry);
  // Project 3D coordinates into 2D
  function p(x,y,z) {
    var t;
    t = x*rcy + z*rsy;
    z = z*rcy - x*rsy;
    x=t;
    t = y*rcx + z*rsx;
    z = z*rcx - y*rsx;
    y=t;
    z += 4;
    return [g.getWidth() * (0.5 + x/z), g.getHeight() * (0.5 + y/z)];
  }

  var a;
  // draw a series of lines to make up our cube
  a = p(-1,-1,-1); g.moveTo(a[0],a[1]);
  a = p(1,-1,-1); g.lineTo(a[0],a[1]);
  a = p(1,1,-1); g.lineTo(a[0],a[1]);
  a = p(-1,1,-1); g.lineTo(a[0],a[1]);
  a = p(-1,-1,-1); g.lineTo(a[0],a[1]);
  a = p(-1,-1,1); g.moveTo(a[0],a[1]);
  a = p(1,-1,1); g.lineTo(a[0],a[1]);
  a = p(1,1,1); g.lineTo(a[0],a[1]);
  a = p(-1,1,1); g.lineTo(a[0],a[1]);
  a = p(-1,-1,1); g.lineTo(a[0],a[1]);
  a = p(-1,-1,-1); g.moveTo(a[0],a[1]);
  a = p(-1,-1,1); g.lineTo(a[0],a[1]);
  a = p(1,-1,-1); g.moveTo(a[0],a[1]);
  a = p(1,-1,1); g.lineTo(a[0],a[1]);
  a = p(1,1,-1); g.moveTo(a[0],a[1]);
  a = p(1,1,1); g.lineTo(a[0],a[1]);
  a = p(-1,1,-1); g.moveTo(a[0],a[1]);
  a = p(-1,1,1); g.lineTo(a[0],a[1]);
}

// rotate and redraw the cube
function step() {
  // rotate
  rx += 0.1;
  ry += 0.11;
  // draw
  g.clear();
  g.setColor(0xFFFF);
  draw();
}

g.clear();
setInterval(step,50);
