
import enPassantOpen from "./enPassantOpen";
import pieceSet from "./pieceSet";

import removeCastlingPiece from "./removeCastlingPiece";


function handleSetNewPosition(boardState) {
    const payload= {}
    const whiteKing = boardState.whiteKingPosition;
    const blackKing = boardState.blackKingPosition;
    const pieceToMove = boardState.pieceToMove;
    const currentPosition = boardState.currentPosition;
    const newPosition = boardState.id;

    const set = pieceSet(pieceToMove);
    const targetKing = set == 'white' ? whiteKing : blackKing;
    const oppTargetKing = set == 'white' ? blackKing : whiteKing;
    const kingPosition = set == 'white' ? 'whiteKingPosition' : 'blackKingPosition';
    const oppKingPosition = set == 'white' ? 'blackKingPosition' : 'whiteKingPosition';

    payload.currentPosition = currentPosition;
    payload.newPosition = boardState.id;
    payload.isPieceToMove = false ;          
    payload.pieceToMove = pieceToMove;
    payload.isCapture = true;
    payload.passant = enPassantOpen(payload,boardState.passant);
    payload.castlingPiece = removeCastlingPiece(payload,boardState);
    
    if (currentPosition == targetKing) {
        payload[kingPosition] = newPosition;
    }
    payload[oppKingPosition] = oppTargetKing;
    
    
    
    return payload;
}

export default handleSetNewPosition;

