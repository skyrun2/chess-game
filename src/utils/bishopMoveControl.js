

import pieceSet from "./pieceSet";



function bishopMoveControl(set,terms) { 
    let availableMoves = {};
    let currTile = '';
    let direction = ['topRight','bottomRight','bottomLeft','topLeft'];
    let startTile = terms.startTile;
    let tiles = terms.tiles;
    let x = terms.x;
    let y = terms.y;
    
    
    
    
    let oppSet= set == 'white' ? 'black': 'white';

    const side = {
        topRight: terms.topRight,
        bottomRight: terms.bottomRight,
        bottomLeft: terms.bottomLeft,
        topLeft : terms.topLeft,
    }

    
    
    direction.forEach(dir => {        
        for (let i = 1; i <= side[dir]; i++) {
            if( dir == 'topRight') currTile = String.fromCharCode(x+i)+(y+i);
            else if (dir == 'bottomRight') currTile = String.fromCharCode(x+i)+(y-i);
            else if (dir == 'bottomLeft') currTile = String.fromCharCode(x-i)+(y-i);
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
export default bishopMoveControl;