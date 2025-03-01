

import countForMoves from "./countForMoves";
import piece from "./piece";
import setMoves from "./setMoves";

function handleAllMoves(bs,ts) {
    const currentTiles = ts.currentTiles;
    const allMoves = bs.allMoves
    const isCheck = bs.isCheck;
    const isDoubleCheck = bs.isDoubleCheck;
    const isPieceToMove = bs.isPieceToMove;
    const currentPosition = bs.currentPosition;
    let payload = {};
    // console.log({isPieceToMove});
    
    let moves = {}
    
    for (const tile in currentTiles) {        
        moves[tile] = {path:setMoves(tile,bs,ts),piece:currentTiles[tile]};
    }
    payload.allMoves = moves;
    payload.tiles = currentTiles;
    let cfm = countForMoves(payload)
    
    

    
    return {moves,cfm};    

    
}

export default handleAllMoves;