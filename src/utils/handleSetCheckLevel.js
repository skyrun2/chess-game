import pieceSet from "./pieceSet";

  

function handleSetCheckLevel(bs,ts,cc,allMoves) {
    const payload = {};
    
    const tiles = ts.tiles;
    
    let LocalCheckPieces = cc.checkPieces
    
    
    
    if (LocalCheckPieces) {                
        let checkingSet = pieceSet(tiles[(Object.keys(LocalCheckPieces)[0])]);
        if (Object.keys(LocalCheckPieces).length == 2) payload.isDoubleCheck = true;
        if (Object.keys(LocalCheckPieces).length == 1) payload.isCheck = true;
        payload.checkPieces = LocalCheckPieces;
        payload.checkingSet = checkingSet;
        payload.countForMoves = cc.countForMoves;
        payload.totalCount = cc.totalCount;
        payload.allMoves = cc.newMoves;
        payload.checkMate = cc.checkMate;
        payload.allMoves = cc.allMoves;
        payload.set = cc.set
        
        
        
                
    }
    else{
        payload.countForMoves = cc.countForMoves;
        payload.totalCount = cc.totalCount;
        payload.allMoves = allMoves;
        payload.set = cc.set ;
        
        
    }
    
    
    return payload
}

export default handleSetCheckLevel;