
import pieceSet from "./pieceSet";

function knightMoveControl(set,terms){
    let availableMoves = {};
    let currTile = '';
    let direction = ['topLeft','topRight','rightTop','rightBottom','bottomRight','bottomLeft','leftBottom','leftTop'];
    let eightPointX = terms.eightPointX;
    let tiles = terms.tiles;
    let x = terms.x;
    let y = terms.y;

    let oppSet = set =='white' ? 'black':'white';    
    const side = {
        topLeft : (1<eightPointX &&  7>y) ? true : false,
        topRight : (8>eightPointX &&  7>y) ? true : false,
        leftTop : (2<eightPointX &&  8>y) ? true : false,
        leftBottom : (2<eightPointX &&  2<=y) ? true : false,
        bottomRight : (8>eightPointX &&  2<y) ? true : false,
        bottomLeft : (1<eightPointX &&  2<y) ? true : false,
        rightBottom : (7>eightPointX &&  1<y) ? true : false,
        rightTop : (7>eightPointX &&  8>y) ? true : false,
    }
    
    
    direction.forEach(dir => {
        if (dir == 'topLeft') currTile = String.fromCharCode(x-1)+(y+2);
        if (dir == 'topRight') currTile = String.fromCharCode(x+1)+(y+2);
        if (dir == 'rightTop') currTile = String.fromCharCode(x+2)+(y+1);
        if (dir == 'rightBottom') currTile = String.fromCharCode(x+2)+(y-1);;
        if (dir == 'bottomRight') currTile = String.fromCharCode(x+1)+(y-2);
        if (dir == 'bottomLeft') currTile = String.fromCharCode(x-1)+(y-2);
        if (dir == 'leftBottom') currTile = String.fromCharCode(x-2)+(y-1);
        if (dir == 'leftTop') currTile = String.fromCharCode(x-2)+(y+1);
            
        

        
        if (side[dir]){
            if(!tiles[currTile]) {
                availableMoves[currTile] ={'tile':currTile,color:`#1211aa99`};
                
            }
            else if (pieceSet(tiles[currTile]) == oppSet) {
                availableMoves[currTile] ={'tile':currTile,color:`red`};
    
            }
        }
    });
    
    
    

    
    return availableMoves;
}
export default knightMoveControl;