
import path from "path";
import isBlockingCheck from "./isBlockingCheck";
import piece from "./piece";
import pieceSet from "./pieceSet";
import blockCheckPath from "./blockCheckPath";



function queenMoveControl(set,terms,bs) {
    let availableMoves = {};
    // let checkPieces = bs.checkPieces;
    let checkPiecesPath = bs.checkPiecesPath;
    let checkingSet = bs.checkingSet;
    let countForMoves = bs.countForMoves;
    let currentPosition = bs.currentPosition;
    let currTile = '';
    let direction = ['top','topRight','right','bottomRight','bottom','bottomLeft','left','topLeft'];
    let eightPointX  = terms.eightPointX
    let isCheck = bs.isCheck;
    let isDoubleCheck = bs.isDoubleCheck;
    let pathBlockers = {};
    let pieceToMove = bs.pieceToMove;
    let startTile = terms.startTile;
    let tiles = terms.tiles;
    let x = terms.x;
    let y = terms.y;
    let pieceToMoveSet = pieceSet(pieceToMove);
    
    
    
    
    let oppSet= set == 'white' ? 'black': 'white';
    let p = piece(pieceToMove);
    let payload = {};
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


    payload = {
        isCheck :isCheck,
        set : set,
        checkingSet:checkingSet,
        checkPiecesPath:checkPiecesPath,
        availableMoves:availableMoves,
        isDoubleCheck:isDoubleCheck,
    }
    if (isCheck||isDoubleCheck) {
        availableMoves =  blockCheckPath(payload);
        
    }
    
    if (!(isCheck && isDoubleCheck)){
                    
            
            
        if (countForMoves[currentPosition]) {
            for (const capturePiece in countForMoves[currentPosition].pieces) {
                if (pieceSet(tiles[capturePiece]) !== pieceToMoveSet) {
                    terms.set = pieceToMoveSet;
                    if (isBlockingCheck(capturePiece,bs,terms,availableMoves)) {
                        
                        availableMoves = isBlockingCheck(capturePiece,bs,terms,availableMoves);
                        
                        // availableMoves = {};
                    }                    
                }
                
                
            }
        }
    }
    
        
    
    
    return availableMoves;
}
export default queenMoveControl;