import pieceSet from "./pieceSet";

function isCheckMate(targetKing,bs,tiles) {
    let allMoves = bs.allMoves;
    let countForMoves = bs.countForMoves;
    let checkPieces = bs.checkPieces; 
    let isCheck  = bs.isCheck;
    let isDoubleCheck = bs.isDoubleCheck;


    let trappedKing = false;
    let freeAttackingPieces = true;
    let piecesOutOfReach = true;
    let targetKingSet = pieceSet(tiles[targetKing]);
    
    
    trappedKing = allMoves[targetKing];
    
    
    for (const piece in checkPieces) {
        if (countForMoves[piece]) freeAttackingPieces = false;            
    }    
    for (const move in allMoves) {
        if (pieceSet(allMoves[move].piece)==targetKingSet) {
            if (Object.keys(allMoves[move].path).length) {
                
                
                piecesOutOfReach = false;
                // break
            }
        }
    }
    
    
    
    
    return !!(piecesOutOfReach&&freeAttackingPieces);
    
    

    
}

export default isCheckMate;