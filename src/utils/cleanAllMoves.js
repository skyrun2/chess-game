import blockCheckPath from "./blockCheckPath";
import pieceSet from "./pieceSet";

function cleanAllMoves(bs,ts) {
    const isCheck = bs.isCheck;
    const isDoubleCheck = bs.isDoubleCheck;
    const notCheck = bs.notCheck;
    const allMoves = bs.allMoves;
    const cfm = bs.cfm;
    const targetKing = bs.targetKing;
    const newPosition = bs.newPosition;
    const checkPiecePath = bs.checkPiecePath;
    const currentTiles = ts.currentTiles;

    const targetKingSet = pieceSet(currentTiles[targetKing]);
    let targetKingSetPieces = {}
    const oppSet = targetKingSet == "white" ? "black" : "white";
    let oppSetPieces = {};
    let movesPieceSet = "";
    let newAllMoves = {...allMoves};
    


    for (const moves in allMoves) {
        movesPieceSet = pieceSet(allMoves[moves].piece);        
        if (movesPieceSet == targetKingSet) {
            targetKingSetPieces[moves] = allMoves[moves];
        }
        if (movesPieceSet == oppSet) {
            oppSetPieces[moves] = allMoves[moves];
        }
    }
    
    
    
    console.log({notCheck});
    
    
    if (isCheck||isDoubleCheck) {
        let newPath = {}    
        
        for (const piece in targetKingSetPieces) {            
            newPath[piece] = {path:{...blockCheckPath(bs,ts,targetKingSetPieces[piece])},piece: targetKingSetPieces[piece].piece};
        }
        targetKingSetPieces = {...newPath}
        newAllMoves = {...allMoves,...targetKingSetPieces}
        console.log({newAllMoves});
        
    }
    else if (notCheck){
        console.log({oppSetPieces});
        
    }




}
export default cleanAllMoves;