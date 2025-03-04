import pieceSet from "./pieceSet";

function countForMoves(payload) {
    let allMoves = payload.allMoves;
    let tiles =payload.tiles;
    
    
    
    
    
    
    
    
    let cFM = {};
    let count = 0;
    let totalCount = 0;
    let updatedCount = 0;
    let newTile = {};
    
    let updatedTile = {};
    


    
    
    for (const tilePiece in allMoves) {
        
        
        
        for (const tile in allMoves[tilePiece].path) {            
            let blackSet = false;
            let whiteSet = false;
            if(!blackSet) blackSet = pieceSet(allMoves[tilePiece].piece) == "black";
            if(!whiteSet) whiteSet = pieceSet(allMoves[tilePiece].piece) == "white";
            if (!cFM[tile]) {       
                if (tiles) {
                    cFM[tile] = { count:1,pieces:{[tilePiece]:tiles[tilePiece]},blackSet,whiteSet};                       
                }         
            }
            else if (cFM[tile]) {               
                updatedCount = cFM[tile].count + 1;
                newTile = {[tilePiece]:tiles[tilePiece]};
                updatedTile = {...cFM[tile].pieces,...newTile}
                cFM[tile] = { count:updatedCount,pieces:updatedTile,blackSet,whiteSet}                
            }           
        }   
        
        
        
        totalCount += updatedCount;
        
    }
    // console.log(totalCount);
    
    
    return {cFM,count:totalCount};
    // return {1:1}
}

export default countForMoves