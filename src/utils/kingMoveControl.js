import addCastlingMoves from "./addCastlingMoves";
import pieceSet from "./pieceSet";


function kingMoveControl(set,terms) {
    let availableMoves = {};    
    let currTile = '';
    let eightPointX = terms.eightPointX;
    let tiles = terms.tiles;
    let x = terms.x;
    let y = terms.y;
    
    
    let oppSet = set =='white' ? 'black':'white';
    let direction = ['topLeft','topMid','topRight','rightMid','rightBottom','bottomMid','bottomLeft','leftMid'];

    const side = {
        topLeft : (1<eightPointX &&  8>y) ? true : false,
        topMid : ( 8>y) ? true : false,
        topRight : (8>eightPointX &&  8>y) ? true : false,
        rightMid : (8>eightPointX) ? true : false,
        rightBottom : (8>eightPointX &&  1<y) ? true : false,
        bottomMid : (1<y) ? true : false,
        bottomLeft : (1<eightPointX &&  1<y) ? true : false,
        leftMid : (1<eightPointX ) ? true : false,
        
    }


            
    direction.forEach(dir => {
        
        if (dir == 'topLeft') currTile = String.fromCharCode(x-1)+(y+1);
        if (dir == 'topMid') currTile = String.fromCharCode(x)+(y+1);
        if (dir == 'topRight') currTile = String.fromCharCode(x+1)+(y+1);
        if (dir == 'rightMid') currTile = String.fromCharCode(x+1)+(y);
        if (dir == 'rightBottom') currTile = String.fromCharCode(x+1)+(y-1);;
        if (dir == 'bottomMid') currTile = String.fromCharCode(x)+(y-1);
        if (dir == 'bottomLeft') currTile = String.fromCharCode(x-1)+(y-1);
        if (dir == 'leftMid') currTile = String.fromCharCode(x-1)+(y);
    
        if (side[dir]){
            if(!tiles[currTile]) {
                availableMoves[currTile] ={'tile':currTile,color:`#1211aa99`};
    
            }
            else if (pieceSet(tiles[currTile]) == oppSet) {
                availableMoves[currTile] ={'tile':currTile,color:`red`};
    
            }
        }
        
        
    });
    
    
    terms.cfm ? addCastlingMoves(terms) : null;
    
    return availableMoves;
}

export default kingMoveControl ;
