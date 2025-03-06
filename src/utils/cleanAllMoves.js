import blockCheckPath from "./blockCheckPath";
import blockCheckThreatPath from "./blockCheckThreatPath";
import countForMoves from "./countForMoves";
import isCheckThreat from "./isCheckThreat";
import pieceSet from "./pieceSet";
import safePath from "./safePath";

function cleanAllMoves(bs) {
    const blackKingPosition = bs.blackKingPosition;
    const isCheck = bs.isCheck;
    const isDoubleCheck = bs.isDoubleCheck;
    const notCheck = bs.notCheck;
    const allMoves = bs.allMoves;
    const cfm = bs.cfm;
    const targetKing = bs.targetKing;
    const newPosition = bs.newPosition;
    const checkPiecePath = bs.checkPiecePath;
    const currentTiles = bs.currentTiles;
    const whiteKingPosition = bs.whiteKingPosition;
    const targetKingSet = pieceSet(currentTiles[targetKing]);
    let targetKingSetPieces = {}
    const oppSet = targetKingSet == "white" ? "black" : "white";
    let oppSetPieces = {};
    let movesPieceSet = "";
    let newAllMoves = {...allMoves};
    let payload = {};
    


    for (const moves in allMoves) {
        movesPieceSet = pieceSet(allMoves[moves].piece);        
        if (movesPieceSet == targetKingSet) {
            targetKingSetPieces[moves] = allMoves[moves];
        }
        if (movesPieceSet == oppSet) {
            oppSetPieces[moves] = allMoves[moves];
        }
    }
    
    
    let checkThreats = {};
    let blockingPath = {};
    let blocker ="";
    let blockerPaths = {};
    let threatPath = {};
    
    checkThreats = {...isCheckThreat(bs)};

    
    for (const threat in checkThreats) {
        blocker = checkThreats[threat].blocker;
        blockerPaths = allMoves[blocker].path;
        threatPath = checkThreats[threat].path;
        blockingPath = {...blockCheckThreatPath(blocker,blockerPaths,threatPath)};
        newAllMoves[blocker] = {path:blockingPath,piece:currentTiles[blocker]};
    }


    
    if (isCheck||isDoubleCheck) {
        let newPath = {}    
        
        for (const piece in targetKingSetPieces) {            
            newPath[piece] = {path:{...blockCheckPath(bs,targetKingSetPieces[piece])},piece: targetKingSetPieces[piece].piece};
        }
        targetKingSetPieces = {...newPath}
        newAllMoves = {...allMoves,...targetKingSetPieces};
        // console.log({aw:safePath(allMoves[blackKingPosition],cfm)});
        
        
        
    }
    // else if (notCheck){
        
    // }

    newAllMoves[whiteKingPosition].path = {...safePath("white",allMoves[whiteKingPosition].path,cfm,checkThreats)};
    newAllMoves[blackKingPosition].path = {...safePath("black",allMoves[blackKingPosition].path,cfm,checkThreats)};
    
    payload.allMoves = newAllMoves;
    payload.tiles = currentTiles;
    // console.log({nem:newAllMoves});
    
    let newCfm = countForMoves(payload);
    
    return {moves:newAllMoves,cfm:newCfm,checkThreats};



}
export default cleanAllMoves;