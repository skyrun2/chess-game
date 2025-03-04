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
    
    
    
    
    
    
    if (isCheck||isDoubleCheck) {
        let newPath = {}    
        
        for (const piece in targetKingSetPieces) {            
            newPath[piece] = {path:{...blockCheckPath(bs,targetKingSetPieces[piece])},piece: targetKingSetPieces[piece].piece};
        }
        targetKingSetPieces = {...newPath}
        newAllMoves = {...allMoves,...targetKingSetPieces};
        // console.log({aw:safePath(allMoves[blackKingPosition],cfm)});
        
        newAllMoves[whiteKingPosition].path = {...safePath("white",allMoves[whiteKingPosition].path,cfm)};
        newAllMoves[blackKingPosition].path = {...safePath("black",allMoves[blackKingPosition].path,cfm)};
        payload.newAllMoves = newAllMoves;
        payload.tiles = currentTiles;
        let newCfm = countForMoves(payload);
        return {moves:newAllMoves,cfm:newCfm};
        
    }
    else if (notCheck){
        let checkThreats = {};
        let blocker = "";
        let blockerPaths = {};
        let blockingPath = {};
        let threatPath = {};
        
        checkThreats = {...isCheckThreat(bs)};
        for (const threat in checkThreats) {
            blocker = checkThreats[threat].blocker;
            blockerPaths = allMoves[blocker].path;
            threatPath = checkThreats[threat].path;
            blockingPath = {...blockCheckThreatPath(blocker,blockerPaths,threatPath)};
            newAllMoves[blocker] = {path:blockingPath,piece:currentTiles[blocker]};
        }
        
        // console.log({aw:safePath("black",allMoves[blackKingPosition].path,cfm)});
        
        newAllMoves[whiteKingPosition].path = {...safePath("white",allMoves[whiteKingPosition].path,cfm)};
        newAllMoves[blackKingPosition].path = {...safePath("black",allMoves[blackKingPosition].path,cfm)};
        
        payload.newAllMoves = newAllMoves;
        payload.tiles = currentTiles;
        let newCfm = countForMoves(payload);
        return {moves:newAllMoves,cfm:newCfm};
        
        
        
    }




}
export default cleanAllMoves;