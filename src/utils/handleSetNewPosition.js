
import enPassantOpen from "./enPassantOpen";
import piece from "./piece";

import pieceSet from "./pieceSet";

import removeCastlingPiece from "./removeCastlingPiece";


function handleSetNewPosition(bs,ts) {
    const payload= {}
    const whiteKing = bs.whiteKingPosition;
    const blackKing = bs.blackKingPosition;
    const pieceToMove = bs.pieceToMove;
    const currentPosition = bs.currentPosition;
    const newPosition = bs.id;
    const tiles = ts.tiles;
    
    
    const set = pieceSet(pieceToMove);
    const p = piece(pieceToMove);
    const targetKing = set == 'white' ? whiteKing : blackKing;
    const oppTargetKing = set == 'white' ? blackKing : whiteKing;
    const kingPosition = set == 'white' ? 'whiteKingPosition' : 'blackKingPosition';
    const oppKingPosition = set == 'white' ? 'blackKingPosition' : 'whiteKingPosition';
    
    
    payload.currentPosition = currentPosition;
    payload.newPosition = bs.id;
    payload.isPieceToMove = false ;          
    payload.pieceToMove = pieceToMove;
    payload.isCapture = !!tiles[newPosition];
    payload.passant = enPassantOpen(payload,bs.passant);
    payload.isEnPassant = !!enPassantOpen(payload,bs.passant);
    payload.castlingPiece = removeCastlingPiece(payload,bs);
    payload.set = set;
    payload.blackKingPosition = blackKing;
    payload.whiteKingPosition = whiteKing;
    
    
    if (p == 'king') {
        if (set == 'white') payload.whiteKingPosition = bs.id;
        else if (set == 'black') payload.blackKingPosition = bs.id;
    }
    
    if (currentPosition == targetKing) {
        payload[kingPosition] = newPosition;
    }
    payload[oppKingPosition] = oppTargetKing;
    
    


    
    return payload;
}

export default handleSetNewPosition;

