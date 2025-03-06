
import pieceSet from "./pieceSet";
import checkPiecePathSetter from "./checkPiecePathSetter";
import cleanAllMoves from "./cleanAllMoves";


function checkChecker (bs) {
    let blackKingPosition = bs.blackKingPosition;
    let whiteKingPosition = bs.whiteKingPosition;
    let pieceToMove = bs.pieceToMove;
    let countForMoves = bs.cfm;
    let allMoves = bs.allMoves;    
    let set = pieceSet(pieceToMove);
    let targetKing = set == 'white' ? blackKingPosition : whiteKingPosition;
    let checkPieces = {}    
    let isCheck = false;
    let isDoubleCheck = false;
    let notCheck = false;
    let checkPiecePath = {};
    let copyBs = {...bs};
    
    if (countForMoves) {        
        if (countForMoves.cFM[targetKing]) {
            checkPieces = countForMoves.cFM[targetKing].pieces;
            if(countForMoves.cFM[targetKing].count == 1) {                
                for(const piece in checkPieces)  {                     
                    checkPiecePath = checkPiecePathSetter(allMoves[piece],piece,targetKing);
                }
                isCheck = true;
            }
            if(countForMoves.cFM[targetKing].count == 2) isDoubleCheck = true;

        }
        else notCheck = true;
    }
    copyBs.notCheck = notCheck;
    copyBs.isCheck = isCheck;
    copyBs.isDoubleCheck = isDoubleCheck;
    copyBs.checkPiecePath = checkPiecePath;
    copyBs.checkPieces = checkPieces;
    copyBs.targetKing = targetKing;

    let cleanMoves = cleanAllMoves(copyBs);
    
    
    
    return{
        notCheck,
        isCheck,
        isDoubleCheck,
        checkPieces,
        checkPiecePath,
        targetKing,
        allMoves:cleanMoves.moves ,
        cfm:cleanMoves.cfm,
        checkThreats:cleanMoves.checkThreats,
    }
    
    
    
    
    
    
}
export default checkChecker;