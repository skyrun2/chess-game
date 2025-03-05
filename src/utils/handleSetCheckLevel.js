import pieceSet from "./pieceSet";

  

function handleSetCheckLevel(checkChecker) {
    const payload = {};

    payload.isCheck = checkChecker.isCheck;
    payload.isDoubleCheck = checkChecker.isDoubleCheck;
    payload.checkPieces = checkChecker.checkPieces;
    payload.checkPiecePath = checkChecker.checkPiecePath;
    payload.notCheck = checkChecker.notCheck;
    payload.targetKing = checkChecker.targetKing;
    payload.allMoves = checkChecker.allMoves;
    payload.cfm = checkChecker.cfm;
    
    // if (payload.isCheck) {
    //     let checkingPiece = Object.keys(payload.checkPieces)[0];
    //     let noCounter = !payload.cfm.cFM[checkingPiece];
    //    let noWayOut = !Object.keys(payload.allMoves[payload.targetKing].path,noCounter).length;
    //    console.log({noCounter,noWayOut});
       
    //    if (noCounter && noWayOut) {
    //        payload.isCheckMate = true;        
    //    }
        
        
    // }
    // else if ( payload.isDoubleCheck){

    // }
    let noMoves = true;
    for (const moves in payload.allMoves) {
        if (pieceSet(payload.allMoves[moves].piece) == pieceSet(payload.allMoves[payload.targetKing].piece)) {
            if (Object.keys(payload.allMoves[moves].path).length) {
                noMoves = false;
            }  
        }
    }
    if (noMoves){
        payload.CheckMate = true;        
    }
    console.log({...payload});
    
    
    return payload
}

export default handleSetCheckLevel;