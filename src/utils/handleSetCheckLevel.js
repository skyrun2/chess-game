import pieceSet from "./pieceSet";

  

function handleSetCheckLevel(bs,ts,cc) {
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
    }
    else{
        payload.countForMoves = cc.countForMoves;
        payload.totalCount = cc.totalCount;
        
    }
    return payload
}

export default handleSetCheckLevel;