
import pieceSet from "./pieceSet";


function rookMoveControl(set,terms) {
    let availableMoves = {};
    let currTile = '';
    let direction = ['top','right','bottom','left']
    let eightPointX = terms.eightPointX;
    let startTile = terms.startTile;
    let tiles = terms.tiles;
    let x = terms.x;
    let y = terms.y;

    let oppSet= set == 'white' ? 'black': 'white';
    const side = {
        top :8-y,
        right : 8-eightPointX,
        bottom : y-1,
        left : eightPointX-1,
    }

    
    
    
    direction.forEach(dir => {
            
        for (let i = 1; i <= side[dir]; i++){  
            
            
            if (dir=='top') currTile = startTile[0]+(y+i);
            else if (dir=='left') currTile = String.fromCharCode(x-i)+startTile[1];
            else if (dir == 'bottom') currTile = startTile[0]+(y-i);
            else if (dir == 'right') currTile = String.fromCharCode(x+i)+startTile[1];
            
            if (!tiles[currTile]) {
                availableMoves[currTile] ={'tile':currTile,color:`#1211aa99`};
                
            }
            else {
                if (pieceSet(tiles[startTile])  == set) {
                    if(pieceSet(tiles[currTile]) == oppSet){
                        availableMoves[currTile] ={'tile':currTile,color:`red`};
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
export default rookMoveControl;