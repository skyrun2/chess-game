import piece from "./piece";
import pieceSet from "./pieceSet";



function castlingPiece(payload,bs) {
    let pieceToMove = payload.pieceToMove;
    let newPosition  = payload.newPosition;
    let currentPosition  = payload.currentPosition;
    let castlingPieces = bs.castlingPieces;
    let p = piece(pieceToMove);
    let set = pieceSet(pieceToMove);
    let castlingTileKingSide = set =='white' ? 'g1' : 'g8';
    let castlingTileQueenSide = set =='white' ? 'c1' : 'c8';
    let kingsRook = set == 'white' ? 'h1' : 'h8';
    let queensRook = set == 'white' ? 'a1' : 'a8';
    
    if (p == 'king') {
        if (castlingPieces[currentPosition]) {
            if (newPosition == castlingTileKingSide) {
                return kingsRook;
            }
            if (newPosition == castlingTileQueenSide) {
                return queensRook;
            }
        }
        return null
    }
    return null;

}

export default castlingPiece;