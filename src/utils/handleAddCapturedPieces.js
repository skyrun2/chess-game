import kingTile from "./kingTile";
import pieceIs from "./pieceIs";
import pieceSet from "./pieceSet";

function handleAddCapturedPieces(bs) {
    const boardState = bs;
    const capturedPieces = bs.capturedPieces;
    const currentTiles = bs.currentTiles;
    const payload= {}
    
    payload.whiteKingPosition = kingTile(payload,boardState,'w');
    payload.blackKingPosition = kingTile(payload,boardState,'b');
    payload.piece = pieceIs(currentTiles[payload.newPosition]);
 
    if (pieceSet(currentTiles[payload.newPosition]) == 'white'){
        payload.set = 'white';
        if (capturedPieces.whiteSet[pieceIs(currentTiles[payload.newPosition])]) {
            
            payload.whiteSet = Number(capturedPieces.whiteSet[pieceIs(currentTiles[payload.newPosition])])+1;
        }
        else payload.whiteSet = 1;
    }
    else if (pieceSet(currentTiles[payload.newPosition]) == 'black'){
        payload.set = 'black';
        if (capturedPieces.blackSet[pieceIs(currentTiles[payload.newPosition])]) {
            payload.blackSet = capturedPieces.blackSet[pieceIs(currentTiles[payload.newPosition])]+1;
        }
        else payload.blackSet = 1


    }
    return payload;
}

export default handleAddCapturedPieces;

