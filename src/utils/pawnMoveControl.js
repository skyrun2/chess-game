


import pieceSet from "./pieceSet";


function pawnMoveControl(set,terms,passant){
    let availableMoves = {};
    let baseline = 0;
    let currTile = '';
    let left = '';
    let right = '';
    let startTile = terms.startTile;
    let tiles = terms.tiles;
    let x = terms.x;
    let y = terms.y;

    let oppSet = set =='white' ? 'black':'white';
    
    baseline = set == 'white' ? 2 : 7;
    


    if (startTile[1] == baseline) {
        for (let i = 1; i <= 2; i++) {
            currTile = set == 'black' ?  startTile[0]+((startTile[1]*1)-i) : currTile = startTile[0]+((startTile[1]*1)+i);
            if(!tiles[currTile]){
                availableMoves[currTile] ={'tile':currTile,color:`#1211aa99`};
            }
            else break;
        }
    }
    else{
        currTile = set == 'black' ?  startTile[0]+((startTile[1]*1)-1) : currTile = startTile[0]+((startTile[1]*1)+1);
        
        if (!tiles[currTile] ) {
            availableMoves[currTile] ={'tile':currTile,color:`#1211aa99`};

            
        }

        
    }
    let underLeft = set =='black'? String.fromCharCode(x-1)+(y-1) : String.fromCharCode(x-1)+(y+1);
    let underRight = set =='black'? String.fromCharCode(x+1)+(y-1) : String.fromCharCode(x+1)+(y+1);
    
    
    if(tiles[underLeft] && pieceSet(tiles[underLeft])== oppSet){
        availableMoves[underLeft] ={'tile':underLeft,color:`red`};;
    } 
    if(tiles[underRight] && pieceSet(tiles[underRight]) == oppSet){
        availableMoves[underRight] ={'tile':underRight,color:`red`};
    } 
    
    
    left = String.fromCharCode(x-1)+(y);
    right = String.fromCharCode(x+1)+(y);    
    
    if (passant.length) {
        
        if(passant[0].tile == left||passant[0].tile == right){
            
            
            
            if(passant[0].tile == left){
                left = set =='black'? String.fromCharCode(x-1)+(y-1) : String.fromCharCode(x-1)+(y+1);
                availableMoves[left] ={'tile':left,color:`red`};
            }
            if(passant[0].tile == right){
                right = set =='black'?  String.fromCharCode(x+1)+(y-1) : String.fromCharCode(x+1)+(y+1);
                availableMoves[right] ={'tile':right,color:`red`};

            }                        
        }                                
    }
    if (tiles.e5) {
        availableMoves.e5 = {'tile':'e5',color:`#1211aa99`};
    }
    if (tiles[underRight]) {
        availableMoves[underRight] = {'tile':underRight,color:`red`}    
    }
    
        
        
    
    
    
    return availableMoves;

}

export default pawnMoveControl;