import piece from "./piece";
// import pieceIs from "./pieceIs";
import pieceSet from "./pieceSet";

function kingTile(payload,bs,s) {
    let newPosition = payload.newPosition;
    let pieceToMove = payload.pieceToMove;
    let p = piece(pieceToMove);
    let set = pieceSet(pieceToMove);
    let blackKing = bs.blackKingPosition;
    let whiteKing = bs.whiteKingPosition;
    if (p == 'king') {
        if (set == 'white' && s == 'w') {
            console.log('white');
            
            return newPosition
        }
        if (set == 'black' && s == 'b') {
            console.log('black');
            
            return newPosition
        }
    }
    if (s == 'w') return whiteKing;
    if (s == 'b') return blackKing;
    
}

export default kingTile;