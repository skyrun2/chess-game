import pieceSet from "./pieceSet";

function countForMoves(payload) {
    let allMoves = payload.allMoves;
    let tiles =payload.tiles;
    
    
    
    
    
    
    let cFM = {}
    let count = 0
    let updatedCount = 0;
    let newTile = {};
    let blackSet = false;
    let whiteSet = false;
    let updatedTile = {};
    
    
    
    for (const tilePiece in allMoves) {
        if (pieceSet[tilePiece] == 'white') whiteSet = true;
        if (pieceSet[tilePiece] == 'black') blackSet = true;
        for (const tile in allMoves[tilePiece].path) {            
            if (!cFM[tile]) {                
                cFM[tile] = { count:1,pieces:{[tilePiece]:tiles[tilePiece]}};   
            }
            else if (cFM[tile]) {  
                updatedCount = cFM[tile].count + 1;
                newTile = {[tilePiece]:tiles[tilePiece]};
                updatedTile = {...cFM[tile].pieces,...newTile}
                cFM[tile] = { count:updatedCount,pieces:updatedTile}                
            }           
        }   
        
        
        count += Object.keys(allMoves[tilePiece].path).length;
        
    }
    return {countForMoves:cFM,count,blackSet,whiteSet};
}

export default countForMoves