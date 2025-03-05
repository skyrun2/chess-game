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
    


    
    let blackSet = false;
    let whiteSet = false;
    
    
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
            // if (tile == "d7") {
            //     console.log({whiteSet: cFM[tile].whiteSet, blackSet: cFM[tile].blackSet ,am:tiles[tilePiece]});
                
            // }     
        }   
        blackSet = false;
        whiteSet = false;
        
        
        totalCount += updatedCount;
        
    }
    // console.log(totalCount);
    
    
    return {cFM,count:totalCount};
    // return {1:1}
}

export default countForMoves