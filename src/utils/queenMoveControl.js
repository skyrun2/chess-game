

import pieceSet from "./pieceSet";




function queenMoveControl(set,terms) {
    let availableMoves = {};
    let currTile = '';
    let direction = ['top','topRight','right','bottomRight','bottom','bottomLeft','left','topLeft'];
    let eightPointX  = terms.eightPointX
    let startTile = terms.startTile;
    let tiles = terms.tiles;
    let x = terms.x;
    let y = terms.y;
    
    
    
    
    
    
    let oppSet= set == 'white' ? 'black': 'white';
    const side = {
        top :8-y,
        topRight: terms.topRight,
        right : 8-eightPointX,
        bottomRight: terms.bottomRight,
        bottom : y-1,
        bottomLeft: terms.bottomLeft,
        left : eightPointX-1,
        topLeft : terms.topLeft,
    }

    
    
    direction.forEach(dir => {

        
        for (let i = 1; i <= side[dir]; i++) {
            if (dir=='top') currTile = startTile[0]+(y+i);
            else if( dir == 'topRight') currTile = String.fromCharCode(x+i)+(y+i);
            else if (dir == 'right') currTile = String.fromCharCode(x+i)+startTile[1];
            else if (dir == 'bottomRight') currTile = String.fromCharCode(x+i)+(y-i);
            else if (dir == 'bottom') currTile = startTile[0]+(y-i);
            else if (dir == 'bottomLeft') currTile = String.fromCharCode(x-i)+(y-i);
            else if (dir=='left') currTile = String.fromCharCode(x-i)+startTile[1];
            else if( dir == 'topLeft') currTile = String.fromCharCode(x-i)+(y+i);

            if(!tiles[currTile]){
                availableMoves[currTile] = {'tile':currTile,color:`#1211aa99`};
            }
            else {
                if (pieceSet(tiles[startTile])  == set) {
                    if(pieceSet(tiles[currTile]) == oppSet){
                        
                        availableMoves[currTile] = {'tile':currTile,color:`red`};
                        break;
                    }
                    else break;
                }
                else{
                    if(pieceSet(tiles[currTile]) == set){

                        
                        availableMoves[currTile] ={'tile':currTile,color:`red`};
                        break;
                    }
                    else break;
                }
            }
    
        }
    });


    
    return availableMoves;
}
export default queenMoveControl;