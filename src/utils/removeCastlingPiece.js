import piece from "./piece";


function removeCastlingPiece(payload,bs) {
    let pieceToMove = payload.pieceToMove;
    let currentPosition  = payload.currentPosition;
    let castlingPieces = bs.castlingPieces;
    let p = piece(pieceToMove);


    
    if (p == 'king' || p == 'rook') {
        if (castlingPieces[currentPosition]) {
            
            return currentPosition;   
        }
        return null 
    }
    return null;

    
}
export default removeCastlingPiece;