import piece from "./piece";
import pieceSet from "./pieceSet";
import checkPath from "./checkPath";
import handleAllMoves from "./handleAllMoves";
// import cFM from "./countForMoves";
import safePath from "./safePath";
import isCheckMate from "./isCheckMate";
import checkPiecePathSetter from "./checkPiecePathSetter";


function checkChecker (bs,tiles) {
    let blackKingPosition = bs.blackKingPosition;
    let whiteKingPosition = bs.whiteKingPosition;
    let pieceToMove = bs.pieceToMove;
    let currentPosition = bs.currentPosition;
    let newPosition = bs.newPosition;
    let countForMoves = bs.cfm;
    let allMoves = bs.allMoves;    
    let p = piece(pieceToMove);
    let set = pieceSet(pieceToMove);
    let targetKing = set == 'white' ? blackKingPosition : whiteKingPosition;
    let checkPieces = {}
    
    
    // console.log({whiteKingPosition,blackKingPosition});
    
    const terms = {
        tiles: tiles
    }
    // let allMoves = {}
    let count = 0
    let copyBs  = bs;
    let copyTs = {};        
    let updatedCount = 0;
    let newCountForMoves = {};
    let newTile = {};
    let newMoves = {};
    let updatedTile = {};
    let isCheck = false;
    let isDoubleCheck = false;
    let checkMate = false;
    let payload = {};
    

    
    
    
    if (countForMoves) {        
        if (countForMoves.cFM[targetKing]) {
            checkPieces = countForMoves.cFM[targetKing].pieces;
            if(countForMoves.cFM[targetKing].count == 1) {                
                for(const piece in checkPieces)  {                     
                    checkPiecePathSetter(allMoves[piece],piece,targetKing);
                }
                isCheck = true;
            }
            if(countForMoves.cFM[targetKing].count == 2) isDoubleCheck = true;

        }
    }
    return{isCheck,isDoubleCheck,checkPieces}
    
    
    
    
    
    
}
export default checkChecker;