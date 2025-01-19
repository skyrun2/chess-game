
import isBlockingCheck from "./isBlockingCheck";
import piece from "./piece";
import pieceSet from "./pieceSet";



function bishopMoveControl(set,terms,bs) {
    let availableMoves = {};
    // let checkPieces = bs.checkPieces;
    let checkPiecesPath = bs.checkPiecesPath;
    let checkingSet = bs.checkingSet;
    let countForMoves = bs.countForMoves;
    let currentPosition = bs.currentPosition;
    let currTile = '';
    let direction = ['topRight','bottomRight','bottomLeft','topLeft'];
    let isCheck = bs.isCheck;
    let isDoubleCheck = bs.isDoubleCheck;
    let pathBlockers = {};
    let pieceToMove = bs.pieceToMove;
    let pieceToMoveSet = pieceSet(pieceToMove);
    let startTile = terms.startTile;
    let tiles = terms.tiles;
    let x = terms.x;
    let y = terms.y;
    
    
    
    
    let oppSet= set == 'white' ? 'black': 'white';
    let p = piece(pieceToMove);
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



    if (isCheck) {
        if (set !== checkingSet) {            
            if (checkPiecesPath) {                
                for (const path in checkPiecesPath.path) {                    
                    if (availableMoves[path]) {                        
                        pathBlockers[path] =  {'tile':path,color:`#1211aa99`};
                        
                    }
                }
                availableMoves = pathBlockers;

                
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
    
        
    
    
    return availableMoves;
}
export default bishopMoveControl;