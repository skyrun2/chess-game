import kingTile from "./kingTile";
import pieceIs from "./pieceIs";
import pieceSet from "./pieceSet";

function handleAddCapturedPieces(bs,ts) {
    const boardState = bs;
    const capturedPieces = bs.capturedPieces;
    const tiles = ts.tiles;
    const payload= {}
    
    payload.whiteKingPosition = kingTile(payload,boardState,'w');
    payload.blackKingPosition = kingTile(payload,boardState,'b');
    payload.piece = pieceIs(tiles[payload.newPosition]);
 
    if (pieceSet(tiles[payload.newPosition]) == 'white'){
        payload.set = 'white';
        if (capturedPieces.whiteSet[pieceIs(tiles[payload.newPosition])]) {
            
            payload.whiteSet = Number(capturedPieces.whiteSet[pieceIs(tiles[payload.newPosition])])+1;
        }
        else payload.whiteSet = 1;
    }
    else if (pieceSet(tiles[payload.newPosition]) == 'black'){
        payload.set = 'black';
        if (capturedPieces.blackSet[pieceIs(tiles[payload.newPosition])]) {
            payload.blackSet = capturedPieces.blackSet[pieceIs(tiles[payload.newPosition])]+1;
        }
        else payload.blackSet = 1


    }
    return payload;
}

export default handleAddCapturedPieces;

