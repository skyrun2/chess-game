import piece from "./piece";
import pieceSet from "./pieceSet";


function safePath (availableMoves,bs,terms) {
    let badTile = 'o0';
    // let castlingPieces = bs.castlingPieces;
    let checkPieceTile1 = '';
    let checkPieceTile2 = '';
    let checkPiece1 = '';
    let checkPiece2 = '';
    let checkingTileX = 'o';
    let checkingTileY = '0';
    let countForMoves = bs.countForMoves;
    let currentPosition = bs.currentPosition;
    let direction = 'unset';
    let downLeft  = 'o0';
    let downRight = 'o0';
    let downX  = 'o';
    let downY  = '0';
    let isCheck = bs.isCheck;
    let isDoubleCheck = bs.isDoubleCheck;
    let kingPath = {...availableMoves};
    let kingX = terms.x; 
    let kingY = terms.y; 
    // let path = {};
    let set  = terms.set;
    let tiles = terms.tiles;
    let upLeft = 'o0';
    let upRight = 'o0';
    let upX = 'o';
    let upY = '0';
    
    let castlingTileKingSideTile = set == 'white' ?  'g1' : 'g8';
    let castlingTileQueenSideTile = set == 'white' ?  'c1' : 'c8';
    let beforeCastlingTileKingSideTile = set == 'white' ?  'f1' : 'f8';
    let beforeCastlingTileQueenSideTile = set == 'white' ?  'd1' : 'd8';
    
    
    
    // console.log(kingPath);
    // console.log(availableMoves);
    
    
    if (isCheck) {
        if (countForMoves[currentPosition]) {
            checkPieceTile1 = Object.keys(countForMoves[currentPosition].pieces)[0];
            checkPiece1 = piece(tiles[checkPieceTile1]);
            doNotGoHere(checkPiece1,checkPieceTile1);
        }
    }
    else if (isCheck||isDoubleCheck) {
        if (countForMoves[currentPosition]) {
            checkPieceTile1 = Object.keys(countForMoves[currentPosition].pieces)[0];
            checkPieceTile2 = Object.keys(countForMoves[currentPosition].pieces)[1];
            checkPiece1 = piece(tiles[checkPieceTile1]);
            checkPiece2 = piece(tiles[checkPieceTile2]);
            doNotGoHere(checkPiece1,checkPieceTile1);
            doNotGoHere(checkPiece2,checkPieceTile2);
        }
    }
    

    function doNotGoHere(checkPiece,checkingTile) {
        console.log({checkingTile});
        if (checkingTile) {
            checkingTileX = checkingTile[0].charCodeAt(0);
            checkingTileY = Number(checkingTile[1]);
        }
        switch (checkPiece) {
            case 'rook' :
                if(checkingTileY < kingY && checkingTileX == kingX) direction = 'top';
                else if (checkingTileY == kingY && checkingTileX < kingX) direction = 'right';
                else if(checkingTileY > kingY && checkingTileX == kingX) direction = 'bottom';
                else if (checkingTileY == kingY && checkingTileX > kingX) direction = 'left';
                
                if (direction == 'top') badTile = String.fromCharCode(kingX)+(kingY+1);
                else if (direction == 'right') badTile = String.fromCharCode(kingX+1)+kingY;
                else if (direction == 'bottom') badTile = String.fromCharCode(kingX)+(kingY-1);
                else if (direction == 'left') badTile = String.fromCharCode(kingX-1)+kingY;
                delete kingPath[badTile];
                
                break;
                
            case 'bishop' :
                if(checkingTileY < kingY && checkingTileX < kingX) direction = 'topRight';
                else if (checkingTileY > kingY && checkingTileX < kingX) direction = 'bottomRight';
                else if(checkingTileY > kingY && checkingTileX > kingX) direction = 'bottomLeft';
                else if (checkingTileY < kingY && checkingTileX > kingX) direction = 'topLeft';
                
                
                if (direction == 'topRight') badTile = String.fromCharCode(kingX+1)+(kingY+1)
                else if (direction == 'bottomRight') badTile = String.fromCharCode(kingX+1)+(kingY-1)
                else if (direction == 'bottomLeft') badTile = String.fromCharCode(kingX-1)+(kingY-1)
                else if (direction == 'topLeft') badTile = String.fromCharCode(kingX-1)+(kingY+1)
                    
                    
                delete kingPath[badTile];

                break;
                case 'queen': 
                if(checkingTileY < kingY && checkingTileX == kingX) direction = 'top';
                else if(checkingTileY < kingY && checkingTileX < kingX) direction = 'topRight';
                else if (checkingTileY == kingY && checkingTileX < kingX) direction = 'right';
                else if (checkingTileY > kingY && checkingTileX < kingX) direction = 'bottomRight';
                else if(checkingTileY > kingY && checkingTileX == kingX) direction = 'bottom';
                else if(checkingTileY > kingY && checkingTileX > kingX) direction = 'bottomLeft';
                else if (checkingTileY == kingY && checkingTileX > kingX) direction = 'left';
                else if (checkingTileY < kingY && checkingTileX > kingX) direction = 'topLeft';

                if (direction == 'top') badTile = String.fromCharCode(kingX)+(kingY+1);
                else if (direction == 'topRight') badTile = String.fromCharCode(kingX+1)+(kingY+1)
                else if (direction == 'right') badTile = String.fromCharCode(kingX+1)+kingY;
                else if (direction == 'bottomRight') badTile = String.fromCharCode(kingX+1)+(kingY-1)
                else if (direction == 'bottom') badTile = String.fromCharCode(kingX)+(kingY-1);
                else if (direction == 'bottomLeft') badTile = String.fromCharCode(kingX-1)+(kingY-1)
                else if (direction == 'left') badTile = String.fromCharCode(kingX-1)+kingY;
                else if (direction == 'topLeft') badTile = String.fromCharCode(kingX-1)+(kingY+1)

                delete kingPath[badTile];
                    break;

            default:
                break;
        }
    }
    function removeCastlingTile(move) {
        if (move == beforeCastlingTileKingSideTile) {
            delete kingPath[castlingTileKingSideTile];
            
        }
        if (move == beforeCastlingTileQueenSideTile) {
            delete kingPath[castlingTileQueenSideTile];
            
        }
    }
    if (availableMoves) {
        // console.log(countForMoves);
        
        for (const move in availableMoves) {

            if (set == 'white') {
                
                upX = move[0].charCodeAt(0);
                upY = Number(move[1]);
                upLeft = String.fromCharCode(upX-1) + (upY+1);
                upRight =  String.fromCharCode(upX+1) + (upY+1);
                if (piece(tiles[upLeft]) == 'pawn' && pieceSet(tiles[upLeft]) == 'black') {
                    removeCastlingTile(move);
                    
                    delete kingPath[move];
                }
                else if (piece(tiles[upRight]) == 'pawn' && pieceSet(tiles[upRight]) == 'black'){

                    removeCastlingTile(move);
                    delete kingPath[move];                    
                }
            }
            else if( set == 'black'){
                downX = move[0].charCodeAt(0);
                downY = Number(move[1]);
                downLeft = String.fromCharCode(downX-1) + (downY-1);
                downRight =  String.fromCharCode(downX+1 ) + (downY-1);
                if (piece(tiles[downLeft]) == 'pawn' && pieceSet(tiles[downLeft]) == 'white') {
                    removeCastlingTile(move);
                    delete kingPath[move];
                }
                else if (piece(tiles[downRight]) == 'pawn' && pieceSet(tiles[downRight]) == 'white'){
                    removeCastlingTile(move);
                    delete kingPath[move];                    
                }
            }
            
            
            if (countForMoves[move]){
                
                for (const targetingPiece in countForMoves[move].pieces) {
                    if (pieceSet(tiles[targetingPiece]) !== set) {
                        if (piece((tiles[targetingPiece])) !== 'pawn') {
                            removeCastlingTile(move);
                            
                            delete kingPath[move];
                        }
                        
                        // console.log(move);
                        
                        
                        
                        break;
                    }
                    
                }        
            }
        }
    }
    // console.log(kingPath);
    
    return kingPath
    
    
    
    
}
export default safePath;