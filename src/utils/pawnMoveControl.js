
import blockCheckPath from "./blockCheckPath";
import isBlockingCheck from "./isBlockingCheck";
import piece from "./piece";
import pieceSet from "./pieceSet";


function pawnMoveControl(set,terms,passant,bs){
    let availableMoves = {};
    let baseline = 0;
    let checkPieces = bs.checkPieces;
    let checkPiecesPath = bs.checkPiecesPath;
    let checkingSet = bs.checkingSet;
    let countForMoves = bs.countForMoves
    let currentPosition = bs.currentPosition;
    let currTile = '';
    let isCheck = bs.isCheck;
    let isDoubleCheck = bs.isDoubleCheck;
    let left = '';
    let pathBlockers = {};
    let pieceToMove = bs.pieceToMove;
    let pieceToMoveSet = pieceSet(pieceToMove);
    let right = '';
    let startTile = terms.startTile;
    let tiles = terms.tiles;
    let x = terms.x;
    let y = terms.y;

    let oppSet = set =='white' ? 'black':'white';
    let direction = set == 'white' ? ['top','topRight','topLeft'] : ['bottom','bottomRight','bottomLeft'];
    let p = piece(pieceToMove);
    let payload = {};
    
    baseline = set == 'white' ? 2 : 7;
    
    const side = {
        topRight: terms.topRight,
        bottomRight: terms.bottomRight,
        bottomLeft: terms.bottomLeft,
        topLeft : terms.topLeft,
    }

    direction.forEach(dir => {
        
        if (set == 'white') {
            switch (dir) {                
                case 'top':{                    
                    if (y == baseline) {
                        let t1 = String.fromCharCode(x)+(y+1);
                        let t2 = String.fromCharCode(x)+(y+2);
                        if(!tiles[t1]) availableMoves[t1] = {'tile':t1,color:`#1211aa99`};
                        if(!tiles[t2]) availableMoves[t2] = {'tile':t2,color:`#1211aa99`};

                        
                    }
                    else if ( y > baseline ){
                        let t1 = String.fromCharCode(x)+(y+1);
                        if(!tiles[t1]) availableMoves[t1] = {'tile':t1,color:`#1211aa99`};
                    }
                    break;
                }
                case 'topRight':{
                    currTile = String.fromCharCode(x+1)+(y+1);
                    
                    if (tiles[currTile]) {                                                
                        if (pieceSet(tiles[currTile]) == oppSet) {
                            availableMoves[currTile] = {tile:currTile,color:'red'};                            
                        }   
                    }
                    break;
                }
                case 'topLeft':{
                    currTile = String.fromCharCode(x-1)+(y+1);
                    // console.log({startTile,currTile});
                    
                    if (tiles[currTile]) {                        
                        if (pieceSet(tiles[currTile]) == oppSet) {
                            availableMoves[currTile] = {tile:currTile,color:'red'};
                        }   
                    }
                    break;
                }
                default:
                    break;
            }
        }
        else if ( set == 'black'){
            switch (dir) {                
                case 'bottom':{                    
                    if (y == baseline) {
                        let b1 = String.fromCharCode(x)+(y-1);
                        let b2 = String.fromCharCode(x)+(y-2);
                        if(!tiles[b1]) availableMoves[b1] = {'tile':b1,color:`#1211aa99`};
                        if(!tiles[b2]) availableMoves[b2] = {'tile':b2,color:`#1211aa99`};

                        
                    }
                    else if ( y < baseline ){
                        let t1 = String.fromCharCode(x)+(y-1);
                        if(!tiles[t1]) availableMoves[t1] = {'tile':t1,color:`#1211aa99`};
                    }
                    break;
                }
                case 'bottomRight':{
                    currTile = String.fromCharCode(x+1)+(y-1);
                    
                    if (tiles[currTile]) {                                                
                        if (pieceSet(tiles[currTile]) == oppSet) {
                            availableMoves[currTile] = {tile:currTile,color:'red'};                            
                        }   
                    }
                    break;
                }
                case 'bottomLeft':{
                    currTile = String.fromCharCode(x-1)+(y-1);
                    // console.log({startTile,currTile});
                    
                    if (tiles[currTile]) {                        
                        if (pieceSet(tiles[currTile]) == oppSet) {
                            availableMoves[currTile] = {tile:currTile,color:'red'};
                        }   
                    }
                    break;
                }
                default:
                    break;
            }
        }
    })   


    return availableMoves;

}

export default pawnMoveControl;