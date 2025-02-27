

import piece from "./piece";
import setMoves from "./setMoves";

function handleAllMoves(bs,ts) {
    const tiles = ts.currentTiles;
    const allMoves = bs.allMoves
    const isCheck = bs.isCheck;
    const isDoubleCheck = bs.isDoubleCheck;
    const isPieceToMove = bs.isPieceToMove;
    const currentPosition = bs.currentPosition;
    // console.log({isPieceToMove});
    
    let moves = {}
    for (const tile in tiles) {
        moves[tile] = {path:setMoves(tile,bs,ts),piece:tiles[tile]};
    }
    
    
    return moves;    

    
}

export default handleAllMoves;