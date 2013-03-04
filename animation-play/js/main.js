// requestAnim shim layer by Paul Irish
window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function(/* function */ callback, /* DOMElement */ element){
            window.setTimeout(callback, 1000 / 60);
        };
})();


// example code from mr doob : http://mrdoob.com/lab/javascript/requestanimationframe/

var canvas, context, toggle, i = 0;

init();
animate();

function rgbToColor(r,g,b)
{
    return 'rgb(' + r + ',' + g + ',' + b + ')';
}

function init() {

    canvas = document.createElement( 'canvas' );
    canvas.width = 512;
    canvas.height = 512;

    context = canvas.getContext( '2d' );

    document.body.appendChild( canvas );

}

function animate() {
    requestAnimFrame( animate );
    draw();

}

function draw() {
    'use strict';
    var frequency = 0.1;
    var amplitude = 127;
    var center = 128;
    var v = Math.sin(frequency*i) * amplitude + center;
    var red   = Math.floor(Math.sin(frequency*i + 0) * 127 + 128);
    var green = Math.floor(Math.sin(frequency*i + 2) * 127 + 128);
    var blue  = Math.floor(Math.sin(frequency*i + 4) * 127 + 128);


    var time = new Date().getTime() * 0.002;
    var x = Math.sin( time ) * 192 + 256;
    var y = Math.cos( time * 0.9 ) * 192 + 256;
    i++;
    toggle = !toggle;
    console.log(rgbToColor(red, green, blue));

    context.fillStyle = rgbToColor(red, green, blue);
    context.beginPath();
    context.arc( x, y, 10, 0, Math.PI * 2, true );
    context.closePath();
    context.fill();

}