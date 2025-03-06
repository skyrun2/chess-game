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
    payload.checkThreats = checkChecker.checkThreats;
    payload.isCheckMate = true;
    payload.winningCondition = 'checkmate';
    payload.winningSet = 'white';

    // let noMoves = true;
    // for (const moves in payload.allMoves) {
    //     if (pieceSet(payload.allMoves[moves].piece) == pieceSet(payload.allMoves[payload.targetKing].piece)) {
    //         if (Object.keys(payload.allMoves[moves].path).length) {
    //             noMoves = false;
    //         }  
    //     }
    // }
    // if (noMoves){
    //     payload.CheckMate = true;        
    // }
    console.log({...payload});
    
    
    return payload
}

export default handleSetCheckLevel;