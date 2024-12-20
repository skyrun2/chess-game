import isBlockingCheck from "./isBlockingCheck";
import piece from "./piece";
import pieceSet from "./pieceSet";


function rookMoveControl(set,terms,bs) {
    let availableMoves = {};
    let checkPieces = bs.checkPieces;
    let checkPiecesPath = bs.checkPiecesPath;
    let checkingSet = bs.checkingSet;
    let countForMoves = bs.countForMoves;
    let currentPosition = bs.currentPosition;
    let currTile = '';
    let direction = ['top','right','bottom','left']
    let eightPointX = terms.eightPointX;
    let isCheck = bs.isCheck;
    let isDoubleCheck = bs.isDoubleCheck;
    let pathBlockers = {};
    let pieceToMove = bs.pieceToMove;
    let startTile = terms.startTile;
    let tiles = terms.tiles;
    let x = terms.x;
    let y = terms.y;

    let oppSet= set == 'white' ? 'black': 'white';
    let p = piece(pieceToMove)
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
                // console.log(currTile);
                
            }
            else {
                if (pieceSet(tiles[startTile])  == set) {
                    if(pieceSet(tiles[currTile]) == oppSet){
                        availableMoves[currTile] ={'tile':currTile,color:`red`};
                        // possibleMoveTiles[currTile] = currTile;
                        break;
                    }
                    else break;
                }
                else{
                    if(pieceSet(tiles[currTile]) == set){
                        availableMoves[currTile] ={'tile':currTile,color:`red`};
                        // possibleMoveTiles[currTile] = currTile;
                        break;
                    }
                    else break;
                }
            }
        }
    });

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
                            
                            availableMoves = isBlockingCheck(capturePiece,bs,terms,availableMoves);
                            
                            // availableMoves = {};
                        }                    
                    }
                    
                    
                }
            }
        }
        
        
        
        
    }
    // console.log(availableMoves);
    
    return availableMoves;
}
export default rookMoveControl;