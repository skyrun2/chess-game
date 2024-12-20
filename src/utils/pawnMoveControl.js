
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
    let right = '';
    let startTile = terms.startTile;
    let tiles = terms.tiles;
    let x = terms.x;
    let y = terms.y;

    let oppSet = set =='white' ? 'black':'white';
    let p = piece(pieceToMove)
    
    baseline = set == 'white' ? 2 : 7;
    


    if (startTile[1] ==baseline) {
        for (let i = 1; i <= 2; i++) {
            currTile = set == 'black' ?  startTile[0]+((startTile[1]*1)-i) : currTile = startTile[0]+((startTile[1]*1)+i);
            if(!tiles[currTile]){
                availableMoves[currTile] ={'tile':currTile,color:`#1211aa99`,isCapture:'false'};
            }
            else break;
        }
    }
    else{
        currTile = set == 'black' ?  startTile[0]+((startTile[1]*1)-1) : currTile = startTile[0]+((startTile[1]*1)+1);
        
        if (!tiles[currTile] ) {
            availableMoves[currTile] ={'tile':currTile,color:`#1211aa99`,isCapture:'false'};

            
        }

        
    }
    left = set =='black'? String.fromCharCode(x-1)+(y-1) : String.fromCharCode(x-1)+(y+1);
    right = set =='black'? String.fromCharCode(x+1)+(y-1) : String.fromCharCode(x+1)+(y+1);

    tiles[left] && pieceSet(tiles[left])== oppSet ?availableMoves[left] ={'tile':left,color:`red`,isCapture:'true'}:null;
    tiles[right] && pieceSet(tiles[right]) == oppSet ? availableMoves[right] ={'tile':right,color:`red`,isCapture:'true'}:null;
    
    left = String.fromCharCode(x-1)+(y);
    right = String.fromCharCode(x+1)+(y);
    
    
    // console.log(`${bs.isEnPassant} for possible passant`);

    
    
    

    
    if (passant.length) {
        
        if(passant[0].tile == left||passant[0].tile == right){
            console.log(passant[0].tile);
            console.log(left);
            console.log(right);
            
            
            if(passant[0].tile == left){
                left = set =='black'? String.fromCharCode(x-1)+(y-1) : String.fromCharCode(x-1)+(y+1);
                availableMoves[left] ={'tile':left,color:`red`,isCapture:'false'};
            }
            if(passant[0].tile == right){
                right = set =='black'?  String.fromCharCode(x+1)+(y-1) : String.fromCharCode(x+1)+(y+1);
                availableMoves[right] ={'tile':right,color:`red`,isCapture:'false'};

            }                        
        }                                
    }

    if (currentPosition == startTile) {
        console.log(checkPieces);
        
        console.log(isCheck);
        if (isCheck) {
            
            if (set !== checkingSet) {
                
                if (p !== 'king') {
                    if (checkPiecesPath) {
                        for (const path in checkPiecesPath) {
                            if (availableMoves[path]) {
                                pathBlockers[path] =  {'tile':path,color:`#1211aa99`};
                                
                            }
                        }
                        availableMoves = pathBlockers;
                    }
                    else availableMoves = {};
                }
            }
        }
        else if ( isDoubleCheck){
            if (set !== checkingSet) {
                availableMoves = {}
            }
        }
        if (!(isCheck && isDoubleCheck)){
            
            
                
            if (countForMoves[currentPosition]) {
                for (const capturePiece in countForMoves[currentPosition].pieces) {
                    if (pieceSet(tiles[capturePiece]) !== set) {
                        terms.set = set;
                        if (isBlockingCheck(capturePiece,bs,terms,availableMoves)) {
                            availableMoves = {};
                        }                    
                    }
                    
                    
                }
            }
        }
        
        
        
        
    }
    
    return availableMoves;

}

export default pawnMoveControl;