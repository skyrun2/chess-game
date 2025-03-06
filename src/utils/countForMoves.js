import pieceSet from "./pieceSet";

function countForMoves(payload) {
    let allMoves = payload.allMoves;
    let tiles =payload.tiles;
    
    
    
    
    
    
    
    
    let cFM = {};

    let totalCount = 0;
    let updatedCount = 0;
    let newTile = {};
    
    let updatedTile = {};
    


     
    for (const tilePiece in allMoves) {
        
        
        
        for (const tile in allMoves[tilePiece].path) {            
            
            
            
            if (!cFM[tile]) {       
                if (tiles) { 
                    cFM[tile] = { count:1,pieces:{[tilePiece]:tiles[tilePiece]},blackSet:false,whiteSet:false}; 
                    if(pieceSet(tiles[tilePiece]) == "black") cFM[tile].blackSet = true ;
                    if(pieceSet(tiles[tilePiece]) == "white") cFM[tile].whiteSet = true ;  
                }         
            }
            else if (cFM[tile]) {               
                let blackSet = cFM[tile].blackSet;
                let whiteSet = cFM[tile].whiteSet;
                updatedCount = cFM[tile].count + 1;
                newTile = {[tilePiece]:tiles[tilePiece]};
                updatedTile = {...cFM[tile].pieces,...newTile}
                if(pieceSet(tiles[tilePiece]) == "black") blackSet = true ;
                if(pieceSet(tiles[tilePiece]) == "white") whiteSet = true ;             
                cFM[tile] = { count:updatedCount,pieces:updatedTile,blackSet,whiteSet}     
            }      
            
        }   
        totalCount += updatedCount;
        
    }    
    return {cFM,count:totalCount};

}

export default countForMoves