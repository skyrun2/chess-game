import enPassantOpen from "./enPassantOpen";
import isEnPassant from "./isEnPassant";
import legalMoves from "./legalMoves";
import pieceSet from "./pieceSet";
import removeCastlingPiece from "./removeCastlingPiece";
import setMoves from "./setMoves";
import setNotation from "./setNotation";

function handleSetNotations(bs) {
    const payload = {};
    const whiteKing = bs.whiteKingPosition;
    const blackKing = bs.blackKingPosition;
    const pieceToMove = bs.pieceToMove;
    const currentPosition = bs.currentPosition;
    const newPosition = bs.id;
    const copyBs  = bs
    
    
    // console.log({co});  
    
    const set = pieceSet(pieceToMove);
    const targetKing = set == 'white' ? whiteKing : blackKing;
    const oppTargetKing = set == 'white' ? blackKing : whiteKing;
    const kingPosition = set == 'white' ? 'whiteKingPosition' : 'blackKingPosition';
    const oppKingPosition = set == 'white' ? 'blackKingPosition' : 'whiteKingPosition';

    
    payload.castlingPiece = removeCastlingPiece(payload,bs);
    payload.currentPosition = currentPosition;
    payload.newPosition = bs.id;
    payload.passant = enPassantOpen(bs);
    payload.isEnPassant = !!isEnPassant(bs);
    
    
    
    if (currentPosition == targetKing) {
        payload[kingPosition] = newPosition;
    }
    payload[oppKingPosition] = oppTargetKing;
    copyBs.currentPosition = newPosition;
    
    
    
    payload.possibleMoves = setMoves(newPosition,bs);
    payload.moveNotation =  setNotation(payload,bs);
    console.log({payload,np:payload.newPosition});
    
    return payload;
}
export default handleSetNotations;