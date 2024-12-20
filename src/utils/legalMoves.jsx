
import bishopMoveControl from "./bishopMoveControl";
import kingMoveControl from "./kingMoveControl";
import knightMoveControl from "./knightMoveControl";
import pawnMoveControl from "./pawnMoveControl";
import pieceSet from "./pieceSet";
import queenMoveControl from "./queenMoveControl";
import rookMoveControl from "./rookMoveControl";



function legalMoves(boardState,tileState) {
    let availableMoves = {};
    // let direction = [];
    let currPiece = boardState.pieceToMove;
    let startTile = boardState.currentPosition;
    let tiles = tileState.tiles;
    let passant = boardState.passant;
    // let checkPieces = boardState.checkPieces;
    let eightPointX =  Number(startTile[0].charCodeAt()) - 96;
    let y = Number(startTile[1])*1;
    let topRight = Math.min(8-eightPointX,8-y);
    let topLeft = Math.min(eightPointX-1,8-y);
    let bottomLeft = Math.min(eightPointX-1,y-1);
    let bottomRight = Math.min(8-eightPointX,y-1);
    
    
    const terms = {
        x :  Number(startTile[0].charCodeAt()),
        eightPointX :  Number(startTile[0].charCodeAt()) - 96,
        y : Number(startTile[1])*1,
        topRight: topRight,
        bottomRight: bottomRight,
        bottomLeft: bottomLeft,
        topLeft : topLeft,
        startTile : startTile,
        tiles: tiles
    }

    function piece(piece) {
        if(!piece) return null  
        return piece[1]=='_' ?  piece.substring(2):piece;    
    }
    
    
    
    
    
    
    switch (piece(currPiece)) {
        case 'pawn':
            availableMoves = pawnMoveControl(pieceSet(tiles[startTile]),terms,passant,boardState);
            return availableMoves
                


        case 'rook':
    

                availableMoves = rookMoveControl(pieceSet(tiles[startTile]),terms,boardState);
        

            
            return availableMoves;
            
        case 'bishop':
            
            availableMoves = bishopMoveControl(pieceSet(tiles[startTile]),terms,boardState);

            
            
            return availableMoves;

        case 'knight':
            
            availableMoves = knightMoveControl(pieceSet(tiles[startTile]),terms,boardState);
            
            return availableMoves;

        case 'king':
            
                availableMoves = kingMoveControl(pieceSet(tiles[startTile]),terms,boardState);
            
            return availableMoves;
            case 'queen':
                
                availableMoves = queenMoveControl(pieceSet(tiles[startTile]),terms,boardState);
            
            return availableMoves;
            default:
            break;
    }
}


export default legalMoves 