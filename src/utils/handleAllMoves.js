

import countForMoves from "./countForMoves";
import setMoves from "./setMoves";

function handleAllMoves(bs) {
    const currentTiles = bs.currentTiles;
    
    let payload = {};
    
    let moves = {}
    
    for (const tile in currentTiles) { 
               
        moves[tile] = {path:setMoves(tile,bs),piece:currentTiles[tile]};
    }
    payload.allMoves = moves;
    payload.tiles = currentTiles;
    let cfm = countForMoves(payload)
    
    
    return {moves,cfm};    

    
}

export default handleAllMoves;