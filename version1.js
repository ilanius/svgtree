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
function rotateAndScale( vec0, angle, scale ) {
    let c = scale * Math.cos( angle * Math.PI / 180 );
    let s = scale * Math.sin( angle * Math.PI / 180 );
    let m = [ c, -s, s, c ];
    let vec1 = [0, 0 ];
    for ( var i in m ) {
        vec1[ Math.trunc( i/2 ) ] += +(m[i]*vec0[ i % 2 ]).toFixed(4);
    }
    return vec1;
}
function getBranch( a, b, angle, offset, scale ) {
    let delta = addVec( b, a, -1 );
    let b1 = rotateAndScale( delta, angle, scale );
    let a1 = getPoint( a, b, offset );
    b1 = addVec( b1, a1, 1);
    return [a1, b1 ];
}
function drawTree( a, b, color, depth ) {
    if ( depth == 0 ) return "";
    let out = drawLine( a, b, color, depth );    
    let [a1, b1] = getBranch( a,b,  +35, 0.2, 0.7 );
    out += drawTree( a1, b1, "red",   depth-1 );
    let [a2, b2] = getBranch( a,b,  -35, 0.3, 0.6 );
    out += drawTree( a2, b2, "blue",  depth-1 );
    // let [a3, b3] = getBranch( a,b,    35, 0.5, 0.3 );
    // out += drawTree( a3, b3, "green", depth-1 );
    return out;
}
let a = [ 100, 250 ];
let b = [ 100, 50 ]; 
/* ************************************ */
/* Möjliga förbättringar:
/*  stoppa in vinklar i anrop
/* till exempel drawtree( a,b, vinkel1, vinkel1, färger, djup );
/* look up table för matris beräkning
/* skapa index.htm med träd
/* skapa en skugg med träd på olika avstånd
/* ************************************* */
let tree = drawTree( a, b , "brown", 4 );  
console.log( '<svg height="400" width="400">\n' + tree + ' </svg>' );
