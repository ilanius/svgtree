"strict";

var [X,Y] = [0,1];
var strokeColor = "black"
function drawLine( a, b, color, width ) {
    return `<line x1="${+a[X].toFixed(2)}" y1="${+a[Y].toFixed(2)}" x2="${b[X].toFixed(2)}" y2="${b[Y].toFixed(2)}" stroke="${color}" stroke-width="${width}"/>\n`;
}
function addVec( a, b, k ) {
    return [a[X]+b[X]*k, a[Y]+b[Y]*k ];
}
function getPoint( a, b, k ) {
    let delta = addVec( b, a, -1 );
    return [ a[X] + delta[X] * k, a[Y] + delta[Y] * k ];
}
function getLength( a, b ) {
    return Math.sqrt( (b[X]-a[X])*(b[X]-a[X]) + (b[Y]-a[Y])*(b[Y]-a[Y]) );
}
function getOrthogonal( a, b ) {  // length == 1
    let delta = addVec( b, a, -1 ); 
    if ( delta[X] == 0 ) return [1,0];
    kx = -delta[Y]/delta[X];  
    let l = Math.sqrt( 1 + kx * kx );
    return [ kx / l, 1/l ];
}
function drawTree( a, b, color, depth ) {
    if ( depth == 0 ) return "";
    let out = drawLine( a, b, color, depth );
    // Calculating points for branches.
    // ap = a' <=> a prime in math notation 
    // bp = b' 
    // ab = a" <=> a bis in math notation
    // bb = b"
    let length = getLength( a, b ); 
    
    // orth i a line that makes a right angle to the line drawn from a to b
    let orth   = getOrthogonal( a, b );  
    // branch one
    let ap    = getPoint( a, b, 0.8 ); // 0 means ap = a, 1 ap=b, 0.8 close to b
    let bp    = getPoint( a, b, 0.2 ); // close to a
    bp[X] = bp[X] + length * 0.4 * orth[X];
    bp[Y] = bp[Y] + length * 0.4 * orth[Y];
    // branch two
    let ab = getPoint( a, b, 0.7 );
    let bb = getPoint( a, b, 0.1 );
    bb[X] = bb[X] - length * 0.3 * orth[X];
    bb[Y] = bb[Y] - length * 0.3 * orth[Y];
    ////////////////////
    out += drawTree( bp, ap, "red",  depth -1 );
    out += drawTree( bb, ab, "blue", depth -1 );
    return out;
}
let a = [ 100, 50 ]; 
let b = [ 100, 250 ];
let tree = drawTree( a, b , "brown", 3 );
console.log( '<svg height="400" width="400">\n' + tree + ' </svg>' );

