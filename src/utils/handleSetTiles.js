import isEnPassant from "./isEnPassant";
import piece from "./piece";
import pieceSet from "./pieceSet";

function handleSetTiles(bs) {
    const payload = {};
    const castlingPieces = bs.castlingPieces;;
    const currentPosition = bs.currentPosition;
    const newPosition = bs.newPosition;
    let p =  piece(bs.pieceToMove);
    let set = pieceSet(bs.pieceToMove);
    let castlingKingSide = set == 'white' ? 'g1' : 'g8';
    let castlingQueenSide = set == 'white' ? 'c1' : 'c8';
    let castlingKingSideRook = set == 'white' ? 'h1' : 'h8';
    let castlingQueenSideRook = set == 'white' ? 'a1' : 'a8';
    
    payload.currentPosition = bs.currentPosition;
    payload.newPosition = newPosition;
    payload.pieceToMove = bs.pieceToMove;
    payload.passant = bs.passant;
    payload.isEnPassant = isEnPassant(payload,bs);
    payload.moveCount = bs.moveCount;
    payload.castlingPieces = castlingPieces;
    
    
    

    let castlingCondition = !!(p=='king' && castlingPieces[currentPosition]);
    
    
    if (castlingCondition) {
        
        
        if (castlingKingSide == newPosition) payload.castlingRook = {tile:newPosition,side:'kingSide',rookTile:castlingKingSideRook};
        if (castlingQueenSide == newPosition) payload.castlingRook = {tile:newPosition,side:'queenSide',rookTile:castlingQueenSideRook};
        
        
    }
    
    
    
    
    return payload;
}

export default handleSetTiles;