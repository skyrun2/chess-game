

import piece from "./piece";
import setMoves from "./setMoves";

function handleAllMoves(bs,ts) {
    const tiles = ts.tiles;
    const allMoves = bs.allMoves
    
    
    
    let moves = {}
    


    
    for (const tile in tiles) {
        // console.log({[tile]:allMoves[tile]});
        
        
        
        if (!allMoves[tile]){    
            
            
            moves[tile] = {path:setMoves(tile,bs,ts),piece:tiles[tile]};
        }
        else if ( allMoves[tile].piece != tiles[tile]){
            
            moves[tile] = {path:setMoves(tile,bs,ts),piece:tiles[tile]};
            
        }
        else if ( allMoves[tile].piece == tiles[tile]){
            
            moves[tile] = {path:setMoves(tile,bs,ts),piece:tiles[tile]};
            
        }
    }
    
    
    return moves;    

    
}

export default handleAllMoves;