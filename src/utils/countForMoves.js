
function countForMoves(payload) {
    let allMoves = payload.allMoves;
    let tiles =payload.tiles;
    
    
    
    
    
    
    let cFM = {}
    let count = 0
    let updatedCount = 0;
    let newTile = {};
    
    let updatedTile = {};
    
    
    
    for (const tilePiece in allMoves) {
        
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
    return {countForMoves:cFM,count};
}

export default countForMoves