

import piece from "./piece";
import setMoves from "./setMoves";

function handleAllMoves(bs,ts) {
    const tiles = ts.tiles;
    const allMoves = bs.allMoves
    const isCheck = bs.isCheck;
    const isDoubleCheck = bs.isDoubleCheck;
    const isPieceToMove = bs.isPieceToMove;
    const currentPosition = bs.currentPosition;
    // console.log({isPieceToMove});
    
    let moves = {}
    // console.log({true:!Object.keys(allMoves).length,lt:Object.keys(allMoves).length});
    
    // if (!Object.keys(allMoves).length) {
    //     for (const tile in tiles) {
    //         if (!allMoves[tile]){    
                
                
    //             moves[tile] = {path:setMoves(tile,bs,ts),piece:tiles[tile]};
    //         }
    //         else if ( allMoves[tile].piece != tiles[tile]){
                
    //             moves[tile] = {path:setMoves(tile,bs,ts),piece:tiles[tile]};
                
    //         }
    //         else if ( allMoves[tile].piece == tiles[tile]){
                
    //             moves[tile] = {path:setMoves(tile,bs,ts),piece:tiles[tile]};
                
    //         }
    //     }
    // }
    
    
        
    // if (isPieceToMove) {
    //     console.log({isCheck,isDoubleCheck});
        
    //     moves[currentPosition] = {path:setMoves(currentPosition,bs,ts),piece:tiles[currentPosition]};
    // }
        

    if (isCheck||isDoubleCheck) {
        
        
        for (const tile in tiles) {
            moves[tile] = {path:setMoves(tile,bs,ts),piece:tiles[tile]};
        }
    }
    else {    

        for (const tile in tiles) {
            // moves[tile] = {path:setMoves(tile,bs,ts),piece:tiles[tile]};
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
    
    
    
    console.log({moves});
    
    
    return moves;    

    
}

export default handleAllMoves;