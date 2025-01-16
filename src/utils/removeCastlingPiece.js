import piece from "./piece";
// import pieceSet from "./pieceSet";

function removeCastlingPiece(payload,bs) {
    let pieceToMove = payload.pieceToMove;
    // let newPosition  = payload.newPosition;
    let currentPosition  = payload.currentPosition;
    let castlingPieces = bs.castlingPieces;
    let p = piece(pieceToMove);
    // let set = pieceSet(pieceToMove);

    
    if (p == 'king' || p == 'rook') {
        console.log(castlingPieces[currentPosition]);
        if (castlingPieces[currentPosition]) {
            
            return currentPosition;   
        }
        return null 
    }
    return null;

    
}
export default removeCastlingPiece;