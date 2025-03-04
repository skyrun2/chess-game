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
    
    
    
    return payload
}

export default handleSetCheckLevel;