import isEnPassant from "./isEnPassant";

function handleSetTiles(bs) {
    const payload = {};
    payload.currentPosition = bs.currentPosition;
    payload.newPosition = bs.newPosition;
    payload.pieceToMove = bs.pieceToMove;
    payload.passant = bs.passant;
    payload.isEnPassant = isEnPassant(payload,bs);
    payload.castlingPieces = bs.castlingPieces;
    payload.castlingRook = bs.castlingRook;
    payload.moveCount = bs.moveCount;
    return payload;
}

export default handleSetTiles;