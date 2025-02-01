

import piece from "./piece";
import setMoves from "./setMoves";

function handleAllMoves(bs,ts) {
    const tiles = ts.tiles;
    const allMoves = bs.allMoves
    const isCheck = bs.isCheck;
    const isDoubleCheck = bs.isDoubleCheck;
    
    
    
    let moves = {}
    

    if (isCheck||isDoubleCheck) {
        
        
        for (const tile in tiles) {
            moves[tile] = {path:setMoves(tile,bs,ts),piece:tiles[tile]};
        }
    }
    else{

        for (const tile in tiles) {
            
            
            
            
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
        
    } 
    
    
    
    
    
    return moves;    

    
}

export default handleAllMoves;